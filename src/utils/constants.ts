import { INavItem } from "@/types/constant-types";
import { BookOpen, Home, User, Users } from "lucide-react";

export const instructorNavBarArr: INavItem[] = [
  {
    navLabel: "Home",
    icon: Home,
    url: "/dashboard/instructor/home",
  },
  {
    navLabel: "My Courses",
    icon: BookOpen,
    url: "/dashboard/instructor/my-courses",
  },
  {
    navLabel: "Students",
    icon: Users,
    url: "/dashboard/instructor/students",
  },
  {
    navLabel: "Profile",
    icon: User,
    url: "/dashboard/instructor/profile",
  },
];
