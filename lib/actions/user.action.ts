'use server'

import { createAdminClient } from "@/appwrite"
import { appwriteConfig } from "@/appwrite/config"
import { ID, Query } from "node-appwrite"
import { string } from "zod"
import { parseStringify } from "../utils"

const getUserByEmail = async (email: string) => {
    const {databases} = await createAdminClient()
    const result = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        [Query.equal("email", [email])]
    )
    return result.total > 0 ? result.documents[0] : null
}
const handleError = (error: unknown, message: string) => {
    console.log(error, message)
    throw error
}
const sendEmailOTP = async({email}:{email:string}) =>{
    const {account} = await createAdminClient()
    try {
        const session = await account.createEmailToken(ID.unique(),email)
        return session.userId
    } catch (error) {
        handleError(error, "Failed to send email OTP")
    }
}
export const createAccount = async ({fullName, email}: {fullName: string, email: string}) =>{
    const existingUser = await getUserByEmail(email)
    const accountId = await sendEmailOTP({email})
    if(!accountId) throw new Error("failed to send an OTP")
    if(!existingUser) {
        const {databases} = await createAdminClient()
        await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            ID.unique(),
            {
                fullName,
                email,
                avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fsbcf.fr%2Fen%2Fdefault-avatar%2F&psig=AOvVaw0B3AxHAm24yLztzxqdFUso&ust=1731271609704000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLDU-LuP0IkDFQAAAAAdAAAAABAE',
                accountId,

            }
        )
    }
    return parseStringify({accountId})
}