'use server'

import { createAdminClient } from "@/appwrite"
import { appwriteConfig } from "@/appwrite/config";
import { ID, Models, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import { getUser } from "./user.action";

interface UploadFileProps {
    file: File,
    ownerId: string,
    accountId:string,
    path: string
}
const handleError = (error: unknown, message: string) => {
    console.log(error, message)
    throw error
}
export const uploadFile = async ({file, ownerId, accountId, path}: UploadFileProps) => {
    const { storage, databases} = await createAdminClient()
    try {
        const inputFile = InputFile.fromBuffer(file, file.name)
        const bucketFile = await storage.createFile(appwriteConfig.bucketId, ID.unique(), inputFile)
        const fileDocument = {
            type: getFileType(bucketFile.name).type,
            name: bucketFile.name,
            url: constructFileUrl(bucketFile.$id),
            extension: getFileType(bucketFile.name).extension,
            size: bucketFile.sizeOriginal,
            owner: ownerId,
            accountId,
            users: [],
            bucketFileId: bucketFile.$id
        }
        const newFile = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.filesCollectionId,
            ID.unique(),
            fileDocument
        ).catch(async(error: unknown) => {
            await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id)
            handleError(error, "Failed to create file document")
        })
        revalidatePath(path)
        return parseStringify(newFile)
    } catch (error) {
        handleError(error, "failed to upload file")
    }
}
const createQueries = (currentUser: Models.Document) =>{
    const queries = [
        Query.or([
            Query.equal('owner', [currentUser.$id]),
            Query.contains('users', [currentUser.email])
        ])
    ]

    return queries
}
export const getFile = async () => {
    const {databases} = await createAdminClient()
    try {
        const currentUser = await getUser()
        if(!currentUser) throw new Error("user not found ")
        const queries = createQueries(currentUser)
        const files = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.filesCollectionId,
            queries,
        )
    return parseStringify(files)
    } catch (error) {
        handleError
    }
}