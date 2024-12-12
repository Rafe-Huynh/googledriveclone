'use client'
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/app/components/ui/input-otp";
import Image from "next/image";
import { Button } from "./ui/button";
import { sendEmailOTP, verifySecret } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";

const OTPModal = ({accountId, email}: {accountId:string, email:string}) => {
  const router = useRouter()
  const [open, setOpen] = useState(true)
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const sessionID = await verifySecret({accountId, password})
      if(sessionID){
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }
  const handleResendOtp = async () => {
    await sendEmailOTP({email})
  }
 return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="h2 text-center ">ENTER OTP</AlertDialogTitle>
          <Image src="/assets/icons/close-dark.svg" alt="close" width={20} height={20} onClick={() => setOpen(false)} className="otp-close-button"/>
          <AlertDialogDescription className="subtitle-2 text-center text-light-100">
            We have sent the OTP to <span className="pl-1 text-brand">{email}
              </span> 
          </AlertDialogDescription>
        </AlertDialogHeader>
        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className="shad-otp">
            <InputOTPSlot index={0} className="shad-otp-slot"/>
            <InputOTPSlot index={1} className="shad-otp-slot"/>
            <InputOTPSlot index={2} className="shad-otp-slot"/>
            <InputOTPSlot index={3} className="shad-otp-slot"/>
            <InputOTPSlot index={4} className="shad-otp-slot"/>
            <InputOTPSlot index={5} className="shad-otp-slot"/>
          </InputOTPGroup>
        </InputOTP>

        <AlertDialogFooter>
          <div className="flex w-full flex-col gap-4">
            <AlertDialogAction onClick={handleSubmit} className="shad-submit-btn h-12" type="button">
              Submit
              { isLoading &&
                <Image src="/assets/icons/loader.svg" alt="loader" width={24} height={24} className="ml-2 animate-spin"/>}
            </AlertDialogAction>
                <div className="subtitle-2 mt-2 text-center text-light-100">
                  Resend OTP code
                  <Button type="button" variant="link" className="pl-1 text-brand" onClick={handleResendOtp}>
                    Resend
                  </Button>
                </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OTPModal;
