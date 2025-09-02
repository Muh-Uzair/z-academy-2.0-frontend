"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { instructorNavBarArr } from "@/utils/constants";
import { INavItem } from "@/types/constant-types";
import clsx from "clsx";
import { Brain } from "lucide-react";

const DashboardSidebar: React.FC = () => {
  // VARS
  const pathname = usePathname();
  const userType = pathname.split("/")[2];
  const navArr: INavItem[] | [] =
    userType === "instructor" ? instructorNavBarArr : [];

  // FUNCTIONS
  const isActive = (url: string) => {
    // If pathname starts with the item url → active
    return pathname.startsWith(url);
  };

  // JSX
  return (
    <aside className="tab:block laptopM:w-[220px] fixed top-0 bottom-0 left-0 z-10 hidden h-screen w-[90px] bg-white">
      <div className="text-primary-extra-dark flex items-center justify-center p-4 font-bold">
        <Link
          className="bg-primary-extra-light/30 flex gap-3 rounded-md px-3 py-2"
          href={"/"}
        >
          <span>
            <Brain />
          </span>
          <span className="laptopM:block hidden">zAcademy</span>
        </Link>
      </div>
      <ul className="laptopM:items-start flex flex-col items-center py-4">
        {navArr.map((item: INavItem) => {
          const Icon = item.icon;
          const active = isActive(item.url);

          return (
            <li key={item.navLabel} className="w-full">
              <Link
                href={item.url}
                className={clsx(
                  "tab:justify-center laptopM:justify-start flex items-center gap-2 px-4 py-3 transition-colors",
                  active
                    ? "text-primary-light/80"
                    : "text-primary-extra-dark hover:bg-gray-100",
                )}
              >
                <Icon size={22} className="shrink-0" />
                <span className="laptopM:inline hidden text-sm font-medium">
                  {item.navLabel}
                </span>
                <div
                  className={`bg-primary-extra-dark ${active ? "absolute left-0 rounded-tr-md rounded-br-md" : "hidden"} h-[40px] w-[5px]`}
                ></div>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default DashboardSidebar;
