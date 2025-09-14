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
import Link from "next/link";
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
import LoadingSpinner from "@/components/LoadingSpinner";
import { useLogin } from "./useLogin";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
});

const Login: React.FC = () => {
  // VARS
  const { mutateLogin, statusLogin } = useLogin();

  // FUNCTIONS
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;
    mutateLogin({ email, password });
  }

  // JSX
  return (
    <div className="flex h-screen items-center justify-center p-3">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Enter your credentials to login</CardTitle>
          <CardDescription>
            Enter your email and password to login
          </CardDescription>
          <CardAction>
            <Button asChild variant="link">
              <Link href="/register">Register</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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

              <Button type="submit" className="w-full">
                {statusLogin === "pending" && <LoadingSpinner />}
                Login
              </Button>
            </form>
          </Form>
          <Button
            onClick={() => {
              window.location.href =
                "http://localhost:4000/api/v1/users/google?login=true";
            }}
            variant="outline"
            className="mt-3 w-full"
          >
            Login with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
