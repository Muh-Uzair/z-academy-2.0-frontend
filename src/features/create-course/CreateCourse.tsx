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
import PageHeading from "@/components/PageHeading";
import Image from "next/image";
import { useUpdateCourse } from "./useUpdateCourse";

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
  editMyCourse?: boolean;
}

const CreateCourse: React.FC<Props> = ({
  readOnly,
  receivedDefaultValues,
  editMyCourse,
}) => {
  // VARS
  const form = useForm<CreateCourseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: readOnly
      ? {
          ...receivedDefaultValues,
          price: String(receivedDefaultValues?.price),
        }
      : {
          title: "",
          description: "",
          level: "beginner",
          price: "0",
          thumbnail: "",
        },
  });
  const { mutateCreateCourse, statueCreateCourse } = useCreateCourse();
  const { mutateUpdateCourse, statusUpdateCourse } = useUpdateCourse();

  // FUNCTIONS
  function onSubmit(values: CreateCourseFormValues) {
    if (readOnly && editMyCourse) {
      mutateUpdateCourse({ formData: { ...values } });
    } else {
      mutateCreateCourse({
        formData: { ...values },
      });
    }
  }

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-[800px] flex-col gap-8 pt-4">
        {!readOnly && (
          <section>
            <PageHeading heading="Create Course" />
          </section>
        )}

        <section>
          <Card className="w-full">
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
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
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
                            disabled={!editMyCourse && readOnly}
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
                            disabled={!editMyCourse && readOnly}
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
                          disabled={!editMyCourse && readOnly}
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
                            type="string"
                            placeholder="e.g. 100"
                            disabled={!editMyCourse && readOnly}
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
                          {!editMyCourse ? "Thumbnail" : "Thumbnail URL"}
                        </FormLabel>
                        <FormControl>
                          {!editMyCourse && readOnly ? (
                            <div className="relative h-[200px] w-full rounded-md bg-stone-100">
                              <Image
                                src={
                                  receivedDefaultValues?.thumbnail ||
                                  "/placeholder.png"
                                }
                                alt="Course Thumbnail"
                                fill
                                className="rounded-md object-cover"
                              />
                            </div>
                          ) : (
                            <Input
                              placeholder="https://example.com/thumbnail.jpg"
                              disabled={!editMyCourse && readOnly}
                              {...field}
                            />
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {!editMyCourse && !readOnly && (
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={statueCreateCourse === "pending"}
                    >
                      {statueCreateCourse === "pending" && <LoadingSpinner />}
                      Create Course
                    </Button>
                  )}

                  {editMyCourse && readOnly && (
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={statueCreateCourse === "pending"}
                    >
                      {statusUpdateCourse === "pending" && <LoadingSpinner />}
                      Edit Course
                    </Button>
                  )}
                </form>
              </Form>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default CreateCourse;
