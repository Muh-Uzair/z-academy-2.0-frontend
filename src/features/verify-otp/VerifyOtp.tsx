"use client";

import React, { Suspense } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useVerifyOtp } from "./useVerifyOtp";
import { useVerifyOtpInstructor } from "./useVerifyOtpInstructor";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useSearchParams } from "next/navigation";

// --- Component that actually uses useSearchParams ---
function VerifyOtpInner() {
  const [otp, setOtp] = React.useState("");
  const { mutateVerifyOtp, statusVerifyOtp } = useVerifyOtp();
  const { mutateVerifyOtpInstructor, statusVerifyOtpInstructor } =
    useVerifyOtpInstructor();

  const searchParams = useSearchParams();
  const userType = searchParams.get("userType");

  const handleVerify = () => {
    if (otp.length !== 6) return;

    if (userType === "instructor") {
      mutateVerifyOtpInstructor({ otp: parseInt(otp) });
    } else if (userType === "student") {
      mutateVerifyOtp({ otp: parseInt(otp) });
    }
  };

  return (
    <div className="bg-muted/30 flex h-screen items-center justify-center p-3">
      <Card className="w-full max-w-md rounded-2xl shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">Verify OTP</CardTitle>
          <CardDescription>
            We sent a 6-digit code to your email. Enter it below to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
            className="gap-4"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <Button className="w-full" onClick={handleVerify}>
            {(statusVerifyOtp === "pending" ||
              statusVerifyOtpInstructor === "pending") && <LoadingSpinner />}
            Verify Code
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// --- Export default wrapped in Suspense ---
export default function VerifyOtp() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <VerifyOtpInner />
    </Suspense>
  );
}
