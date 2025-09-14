"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrUser } from "@/services/getCurrUser";
import UserMenu from "./UserMenu";
import ZAcademyLogo from "./ZAcademyLogo";
import { useEffect } from "react";

// CMP CMP CMP
export const LandingPageHeader: React.FC = () => {
  const queryClient = useQueryClient();

  const { data, status } = useQuery({
    queryKey: ["currUser"],
    queryFn: () => getCurrUser(),
  });

  // force refetch on mount
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["currUser"] });
    // ya phir directly refetch
    // queryClient.refetchQueries({ queryKey: ["currUser"] });
  }, [queryClient]);

  return (
    <header className="fixed top-0 right-0 left-0 flex h-[50px] w-full items-center justify-between px-3">
      <div>
        <ZAcademyLogo />
      </div>

      <div className="laptopM:flex hidden">buttons</div>

      <div>
        {status === "error" && (
          <Button className="rounded-full px-6">
            <Link href="/login">Login</Link>
          </Button>
        )}
        {data?.data?.user?.email && status === "success" && (
          <UserMenu data={data} />
        )}
      </div>
    </header>
  );
};
