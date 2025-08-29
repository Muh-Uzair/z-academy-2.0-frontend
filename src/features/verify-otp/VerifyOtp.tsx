"use client";

import React from "react";
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
import LoadingSpinner from "@/components/LoadingSpinner";

const VerifyOtp: React.FC = () => {
  // VARS
  const [otp, setOtp] = React.useState("");
  const { mutateVerifyOtp, statusVerifyOtp } = useVerifyOtp();

  // FUNCTIONS
  const handleVerify = () => {
    if (otp.length !== 6) return;
    mutateVerifyOtp({ otp: parseInt(otp) });
  };

  // JSX
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
            {statusVerifyOtp === "pending" && <LoadingSpinner />}
            Verify Code
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOtp;
