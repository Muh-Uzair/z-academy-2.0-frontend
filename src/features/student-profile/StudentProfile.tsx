"use client";

import { useGetStudentProfile } from "./useGetStudentProfile";

import React, { useEffect, useState } from "react";
import ErrorScreen from "@/components/ErrorScreen";
import LoadingScreen from "@/components/LoadingScreen";
import PageHeading from "@/components/PageHeading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LogOut, Pen, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLogout } from "@/hooks/useLogout";
import LoadingSpinner from "@/components/LoadingSpinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateStudentProfile } from "./useUpdateStudentProfile";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name must be under 50 characters." }),

  bio: z
    .string()
    .max(200, { message: "Bio must be under 200 characters." })
    .optional(),
});

const StudentProfile: React.FC = () => {
  // VARS
  const { dataStudentProfile, statusStudentProfile } = useGetStudentProfile();
  const studentProfile = dataStudentProfile?.data?.studentProfile;
  const [openLogout, setOpenLogout] = useState(false);
  const { mutateLogout, statusLogout } = useLogout({});
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bio: "",
    },
  });
  const { mutateUpdateStudentProfile, statusUpdateStudentProfile } =
    useUpdateStudentProfile({ setIsEditing });

  // FUNCTIONS

  useEffect(() => {
    if (studentProfile) {
      form.reset({
        name: studentProfile.name || "",
        bio: studentProfile.bio || "",
      });
    }
  }, [studentProfile, form]);
  const handleLogout = () => {
    mutateLogout();
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutateUpdateStudentProfile({ formData: { ...values } });
  }

  // JSX
  if (statusStudentProfile === "error") {
    return <ErrorScreen />;
  }

  if (statusStudentProfile === "pending") {
    return <LoadingScreen />;
  }

  return (
    <div className="flex w-full justify-center pb-[12px]">
      <div className="w-full max-w-[800px]">
        <PageHeading heading="Your Profile" />
        <div className="mb-6 flex justify-end">
          <div className="flex gap-3">
            {/* Logout with confirmation dialog */}
            <Dialog open={openLogout} onOpenChange={setOpenLogout}>
              <DialogTrigger asChild>
                <Button variant={"destructive"}>
                  <LogOut />
                  Logout
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Logout</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to log out of your account?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-2">
                  <Button variant="ghost" onClick={() => setOpenLogout(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleLogout}>
                    {statusLogout === "pending" && <LoadingSpinner />}
                    Yes, Logout
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button
              variant={isEditing ? "outline" : "default"}
              onClick={() => setIsEditing((prev) => !prev)}
            >
              <Pen />
              Edit
            </Button>
          </div>
        </div>
        {isEditing && (
          <Form {...form}>
            <Card className="mx-auto shadow-lg">
              <CardHeader>
                <CardTitle>Update Profile</CardTitle>
                <CardDescription>
                  Change your details and keep your profile up to date.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Passionate about teaching AI & ML"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button className="w-full" type="submit">
                    {statusUpdateStudentProfile === "pending" && (
                      <LoadingSpinner />
                    )}
                    Submit
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Form>
        )}
        {!isEditing && (
          <Card className="mx-auto shadow-md">
            <CardContent className="space-y-6 p-6">
              {/* Avatar + Name */}
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20">
                  {studentProfile.avatar ? (
                    <Avatar className="h-20 w-20">
                      <AvatarImage
                        src={studentProfile.avatar}
                        alt={studentProfile.name}
                      />
                      <AvatarFallback>
                        {studentProfile?.name?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="bg-primary-extra-light/50 border-primary-extra-dark flex h-20 w-20 items-center justify-center rounded-full border">
                      <UserIcon className="text-primary-extra-dark h-10 w-10" />
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">
                    {studentProfile.name}
                  </h2>
                  <p
                    className="tab:max-w-[300px] laptopM:max-w-[400px] max-w-[200px] truncate text-gray-500"
                    title={studentProfile.email}
                  >
                    {studentProfile.email}
                  </p>
                  <Badge>{studentProfile.userType}</Badge>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h3 className="text-lg font-medium">Bio</h3>
                <p className="mt-1 text-gray-600">
                  {studentProfile.bio && studentProfile.bio.trim() !== ""
                    ? studentProfile.bio
                    : "No bio added yet."}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium">Joined</h3>
                  <p className="text-gray-600">
                    {new Date(studentProfile.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
