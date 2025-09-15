"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { instructorNavBarArr, studentNavBarArr } from "@/utils/constants";
import { INavItem } from "@/types/constant-types";
import clsx from "clsx";
import { GraduationCap } from "lucide-react";

const DashboardSidebar: React.FC = () => {
  // VARS
  const pathname = usePathname();
  const userType = pathname.split("/")[2];
  const navArr: INavItem[] | [] =
    userType === "instructor" ? instructorNavBarArr : studentNavBarArr;

  // FUNCTIONS
  const isActive = (url: string) => {
    // If pathname starts with the item url → active
    return pathname.startsWith(url);
  };

  // JSX
  return (
    <aside className="tab:block laptopM:w-[220px] fixed top-0 bottom-0 left-0 z-10 hidden h-screen w-[90px] bg-white">
      <div className="laptopM:justify-start bg-primary-light/30 flex items-center justify-center border-b px-3 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white shadow-sm">
            <GraduationCap className="text-primary-dark h-6 w-6" />
          </div>
          <span className="laptopM:block text-primary-dark hidden text-xl font-extrabold tracking-wide">
            zAcademy
          </span>
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
                  `tab:justify-center laptopM:justify-start flex items-center gap-2 px-4 py-3 transition-colors`,
                  active
                    ? "text-primary-light/80"
                    : "text-primary-extra-dark hover:bg-gray-100",
                )}
              >
                <Icon size={22} className="shrink-0" />
                <span className={`laptopM:inline hidden text-sm font-medium`}>
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
