"use client";

import React from "react";
import { instructorNavBarArr, studentNavBarArr } from "@/utils/constants";
import { INavItem } from "@/types/constant-types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardBottomNav: React.FC = () => {
  // VARS
  const pathname = usePathname();
  const userType = pathname.split("/")[2];
  const navArr: INavItem[] | [] =
    userType === "instructor" ? instructorNavBarArr : studentNavBarArr;

  // FUNCTIONS
  const isActive = (url: string) => {
    return pathname.startsWith(url);
  };

  // JSX
  return (
    <nav className="tab:hidden block">
      <ul className="fixed right-0 bottom-0 left-0 z-10 flex h-[50px] items-center justify-evenly border border-t bg-white p-3">
        {navArr.map((item: INavItem) => {
          const Icon = item.icon;
          const active = isActive(item.url);

          return (
            <li key={item.navLabel}>
              <Link
                className={`flex flex-col items-center text-[12px] ${
                  active ? "text-primary-light/80" : "text-primary-extra-dark"
                }`}
                href={item.url}
              >
                <Icon size={20} />
                {item.navLabel}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default DashboardBottomNav;
