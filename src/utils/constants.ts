import { INavItem } from "@/types/constant-types";
import { BookOpen, Home, User, Users, ClipboardList } from "lucide-react";

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

export const studentNavBarArr: INavItem[] = [
  {
    navLabel: "Home",
    icon: Home,
    url: "/dashboard/student/home",
  },
  {
    navLabel: "Courses",
    icon: BookOpen,
    url: "/dashboard/student/courses",
  },
  {
    navLabel: "Enrollments",
    icon: ClipboardList,
    url: "/dashboard/student/enrollments",
  },
  {
    navLabel: "Profile",
    icon: User,
    url: "/dashboard/student/profile",
  },
];
