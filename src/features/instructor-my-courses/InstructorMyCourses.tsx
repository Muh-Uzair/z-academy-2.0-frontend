import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import Link from "next/link";

const InstructorMyCourses: React.FC = () => {
  // VARS

  // FUNCTIONS

  // JSX
  return (
    <div className="flex flex-col gap-8">
      <section className="pt-4">
        <span className="text-xl font-bold">My Courses</span>
      </section>
      <section className="flex items-center justify-end">
        <Link href={"/dashboard/instructor/my-courses/create"}>
          <Button>
            <Plus />
            Create Course
          </Button>
        </Link>
      </section>
      <section>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default InstructorMyCourses;
