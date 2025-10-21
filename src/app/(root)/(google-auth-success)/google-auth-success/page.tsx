"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";

function GoogleAuthHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const userType = searchParams.get("userType");

    if (token) {
      localStorage.setItem("jwt", token);
      router.push(`/dashboard/${userType}/home`);
    } else {
      router.push("/login");
    }
  }, [router, searchParams]);

  return <LoadingScreen />;
}

// ✅ Wrap your logic component inside a Suspense boundary
export default function Page() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <GoogleAuthHandler />
    </Suspense>
  );
}
