"use client";

import React, { useEffect, useState } from "react";
import { useGetInstructorProfile } from "./useGetInstructorProfile";
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
import { useUpdateINstructorProfile } from "./useUpdateInstructorProfile";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name must be under 50 characters." }),

  bio: z
    .string()
    .max(200, { message: "Bio must be under 200 characters." })
    .optional(),

  institute: z
    .string()
    .min(2, { message: "Institute must be at least 2 characters." })
    .max(100, { message: "Institute name too long." }),

  specialization: z
    .string()
    .min(2, { message: "Specialization must be at least 2 characters." })
    .max(100, { message: "Specialization name too long." }),

  experience: z.number(),
});

// CMP CMP CMP
const InstructorProfile: React.FC = () => {
  // VARS
  const { dataInstructorProfile, statusInstructorProfile } =
    useGetInstructorProfile();
  const { mutateLogout, statusLogout } = useLogout({});
  const instructorProfile = dataInstructorProfile?.data?.instructorProfile;
  const [openLogout, setOpenLogout] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bio: "",
      institute: "",
      specialization: "",
      experience: 0,
    },
  });
  const { mutateUpdateInstructorProfile, statusUpdateInstructorProfile } =
    useUpdateINstructorProfile({ setIsEditing });

  // FUNCTIONS
  useEffect(() => {
    if (instructorProfile) {
      form.reset({
        name: instructorProfile.name || "",
        bio: instructorProfile.bio || "",
        institute: instructorProfile.institute || "",
        specialization: instructorProfile.specialization || "",
        experience: instructorProfile.experience || 0,
      });
    }
  }, [instructorProfile, form]);

  const handleLogout = () => {
    mutateLogout();
  };

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutateUpdateInstructorProfile({ formData: { ...values } });
  }

  // JSX JSX JSX
  if (statusInstructorProfile === "error") {
    return <ErrorScreen />;
  }

  if (statusInstructorProfile === "pending") {
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
            <Card className="mx-auto max-w-md shadow-lg">
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
                  <FormField
                    control={form.control}
                    name="institute"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institute</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Stanford University"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="specialization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specialization</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Computer Science"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 5 years" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button className="w-full" type="submit">
                    {statusUpdateInstructorProfile === "pending" && (
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
                  {instructorProfile.avatar ? (
                    <Avatar className="h-20 w-20">
                      <AvatarImage
                        src={instructorProfile.avatar}
                        alt={instructorProfile.name}
                      />
                      <AvatarFallback>
                        {instructorProfile?.name?.[0] || "U"}
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
                    {instructorProfile.name}
                  </h2>
                  <p
                    className="tab:max-w-[300px] laptopM:max-w-[400px] max-w-[200px] truncate text-gray-500"
                    title={instructorProfile.email}
                  >
                    {instructorProfile.email}
                  </p>
                  <Badge>{instructorProfile.userType}</Badge>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h3 className="text-lg font-medium">Bio</h3>
                <p className="mt-1 text-gray-600">
                  {instructorProfile.bio && instructorProfile.bio.trim() !== ""
                    ? instructorProfile.bio
                    : "No bio added yet."}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium">Institute</h3>
                  <p className="text-gray-600">
                    {instructorProfile.institute || "Not provided"}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Specialization</h3>
                  <p className="text-gray-600">
                    {instructorProfile.specialization || "Not provided"}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Experience</h3>
                  <p className="text-gray-600">
                    {instructorProfile.experience
                      ? `${instructorProfile.experience} years`
                      : "Not provided"}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Joined</h3>
                  <p className="text-gray-600">
                    {new Date(instructorProfile.createdAt).toLocaleDateString()}
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

export default InstructorProfile;
