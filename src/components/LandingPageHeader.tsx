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

  const userType = data?.data?.user?.userType;

  // force refetch on mount
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["currUser"] });
  }, [queryClient]);

  return (
    <header className="fixed top-0 right-0 left-0 z-10 flex h-[50px] w-full justify-center px-3">
      <div className="bg-primary-extra-light mt-3 flex h-full w-full max-w-[1900px] items-center justify-between rounded-md px-3">
        <div>
          <ZAcademyLogo />
        </div>

        {data?.data?.user?.email && status === "success" && (
          <div className="laptopM:flex hidden gap-6 text-white">
            <span>
              <Link
                href={
                  userType === "instructor"
                    ? "/dashboard/instructor/home"
                    : "/dashboard/student/home"
                }
              >
                Dashboard
              </Link>
            </span>
            <span>
              <Link
                href={
                  userType === "instructor"
                    ? "/dashboard/instructor/my-courses"
                    : "/dashboard/student/courses"
                }
              >
                Courses
              </Link>
            </span>
            <span>
              <Link
                href={
                  userType === "instructor"
                    ? "/dashboard/instructor/profile"
                    : "/dashboard/student/profile"
                }
              >
                Profile
              </Link>
            </span>
          </div>
        )}

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
      </div>
    </header>
  );
};
