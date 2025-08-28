"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useRegister } from "./useRegister";
import LoadingSpinner from "@/components/LoadingSpinner";

const studentFromSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z
      .string()
      .email({ message: "Please enter a valid email address." })
      .regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, {
        message: "Only Gmail addresses are allowed.",
      }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters long.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

// CMP CMP CMP
const Register: React.FC = () => {
  // VARS
  // 1. Define your form.
  const form = useForm<z.infer<typeof studentFromSchema>>({
    resolver: zodResolver(studentFromSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { mutateRegisterStudent, statusRegisterStudent } = useRegister();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof studentFromSchema>) {
    if (statusRegisterStudent === "pending") return;

    const { name, email, password } = values;
    mutateRegisterStudent({ name, email, password });
  }

  // FUNCTIONS

  // JSX
  return (
    <div className="flex h-screen items-center justify-center p-3">
      <Tabs defaultValue="studentRegister" className="w-full max-w-sm">
        <TabsList className="w-full">
          <TabsTrigger value="studentRegister">Register As Student</TabsTrigger>
          <TabsTrigger value="instructorRegister">
            Register As Instructor
          </TabsTrigger>
        </TabsList>
        {/* DIVIDER Student registration */}
        <TabsContent value="studentRegister">
          <Card>
            <CardHeader>
              <CardTitle>Register to create your account</CardTitle>
              <CardDescription>
                Enter your username and password to register
              </CardDescription>
              <CardAction>
                <Button asChild variant="link">
                  <Link href="/login">Login</Link>
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-3"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g, John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g, user@gmail.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <section className="mt-6 flex flex-col gap-2">
                    <Button type="submit" className="w-full">
                      {statusRegisterStudent === "pending" && (
                        <LoadingSpinner />
                      )}
                      Register
                    </Button>
                    <Button variant="outline" className="w-full">
                      Register with Google
                    </Button>
                  </section>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        {/* DIVIDER Instructor registration */}
        <TabsContent value="instructorRegister">
          <Card>
            <CardHeader>
              <CardTitle>Register to create your account</CardTitle>
              <CardDescription>
                Enter your username and password to register
              </CardDescription>
              <CardAction>
                <Button variant="link">Login</Button>
              </CardAction>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Register;
