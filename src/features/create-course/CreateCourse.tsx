"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCourse } from "./useCreateCourse";

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  description: z.string(),
  level: z.enum(["beginner", "intermediate", "advanced"], {
    message:
      "Invalid course level. Choose beginner, intermediate, or advanced.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Price must be a valid non-negative number",
  }),
  thumbnail: z.string().url({ message: "Thumbnail must be a valid URL" }),
});

export type CreateCourseFormValues = z.infer<typeof formSchema>;

interface Props {
  readOnly?: boolean;
  receivedDefaultValues?: CreateCourseFormValues;
}

const CreateCourse: React.FC<Props> = ({ readOnly, receivedDefaultValues }) => {
  // VARS
  const form = useForm<CreateCourseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: readOnly
      ? receivedDefaultValues
      : {
          title: "",
          description: "",
          level: "beginner",
          price: "0",
          thumbnail: "",
        },
  });
  const { mutateCreateCourse, statueCreateCourse } = useCreateCourse();

  // FUNCTIONS
  function onSubmit(values: CreateCourseFormValues) {
    if (readOnly) return; // block submission in readonly mode
    mutateCreateCourse({ formData: values });
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="pt-4">
        <span className="text-xl font-bold">
          {readOnly ? "Your Course Information" : "Create Course"}
        </span>
      </section>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            {readOnly ? "Course Information" : "Enter course information"}
          </CardTitle>
          <CardDescription>
            {readOnly
              ? "These are your course details."
              : "Fill in the details of the course you want to create."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Introduction to React"
                        disabled={readOnly}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your course description here"
                        className="resize-none"
                        disabled={readOnly}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Level */}
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={readOnly}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select course level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (USD)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 100"
                        disabled={readOnly}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Thumbnail */}
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {" "}
                      {readOnly ? "Thumbnail" : "Thumbnail URL"}{" "}
                    </FormLabel>
                    <FormControl>
                      {readOnly ? (
                        <img
                          className="rounded-md"
                          src={receivedDefaultValues?.thumbnail}
                        />
                      ) : (
                        <Input
                          placeholder="https://example.com/thumbnail.jpg"
                          disabled={readOnly}
                          {...field}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!readOnly && (
                <Button
                  type="submit"
                  className="w-full"
                  disabled={statueCreateCourse === "pending"}
                >
                  {statueCreateCourse === "pending" && <LoadingSpinner />}
                  Create
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCourse;
