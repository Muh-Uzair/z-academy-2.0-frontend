"use client"; // if using Next.js

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const userType = searchParams.get("userType");

    if (token) {
      localStorage.setItem("jwt", token);
      router.push(`/dashboard/${userType}/home`); // redirect to dashboard
    } else {
      router.push("/login");
    }
  }, [router, searchParams]);

  return <LoadingScreen />;
}
