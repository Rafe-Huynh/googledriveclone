"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Models } from "node-appwrite";
import Image from "next/image";
import { actionsDropdownItems } from "@/constants";
import Link from "next/link";
import { constructDownloadUrl } from "@/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const ActionDropdown = ({ file }: { file: Models.Document }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [name, setName] = useState(file.name)
  const [action, setAction] = useState<ActionType | null>(null);
  const [isLoading, setIsloading] = useState(false)
  const closeAllModals = () => {
    setIsModalOpen(false)
    setIsDropdownOpen(false)
    setAction(null)
    setName(file.name)
  }
  const handleAction = () => {

  }
  const renderDialogContent = () => {
    if(!action) return null
    const {value, label} = action
    return (
      <DialogContent className="shad-dialog button">
       
            
          <DialogHeader className="flex flex-col gap-3">
            <DialogTitle className="text-center text-light-100">{label}</DialogTitle>
            {value === 'rename' && (
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            )}
          </DialogHeader>
        {['rename', 'delete', 'share'].includes(value) && (
            <DialogFooter className="flex flex-col gap-3 md:flex-row">
                    <Button onClick={closeAllModals} className="modal-cancel-button">
                        Cancel
                    </Button>
                    <Button onClick={handleAction} className="modal-submit-button">
                        <p className="capitalize">
                            {value}
                        </p>
                        {isLoading && (
                            <Image src="/assets/icons/loader.svg" alt="loading" width={24} height={24} className="animate-spin"/>
                        )}
                    </Button>
                 </DialogFooter>

        )}
      </DialogContent>
    );
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="shad-no-focus">
          <Image
            src="/assets/icons/dots.svg"
            alt="dots"
            width={34}
            height={34}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="max-w-[200px] truncate">
            {file.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((action) => (
            <DropdownMenuItem
              key={action.value}
              className="shad-dropdown-item"
              onClick={() => {
                setAction(action);
                if (
                  ["rename", "share", "delete", "details"].includes(
                    action.value
                  )
                ) {
                  setIsModalOpen(true);
                }
              }}
            >
              {action.value === "download" ? (
                <Link
                  href={constructDownloadUrl(file.bucketFileId)}
                  download={file.name}
                  className="flex items-center"
                >
                  <Image
                    src={action.icon}
                    alt={action.label}
                    width={30}
                    height={30}
                  />
                  {action.label}
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Image
                    src={action.icon}
                    alt={action.label}
                    width={30}
                    height={30}
                  />
                  {action.label}
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {renderDialogContent()}
    </Dialog>
  );
};

export default ActionDropdown;