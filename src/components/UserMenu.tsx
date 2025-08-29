"use client";

import React, { useState } from "react";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLogout } from "@/hooks/useLogout";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  data: {
    data: {
      user: {
        userType: "student" | "instructor";
      };
    };
  };
}

const UserMenu: React.FC<Props> = ({ data }) => {
  // VARS
  const { userType } = data?.data?.user;
  const [openDialog, setOpenDialog] = useState(false);
  const { mutateLogout, statusLogout } = useLogout({ setOpenDialog });

  // FUNCTIONS
  const handleLogoutClick = () => {
    setOpenDialog(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("jwt");
    mutateLogout();
  };

  // JSX
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu className="text-primary-dark h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="m-3 w-56" align="start">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            {userType === "student" && (
              <Link href={"/dashboard/student/home"}>Dashboard</Link>
            )}
            {userType === "instructor" && (
              <Link href={"/dashboard/instructor/home"}>Dashboard</Link>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogoutClick}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Logout confirmation dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out of your account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmLogout}>
              {statusLogout === "pending" && <LoadingSpinner />}
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserMenu;
