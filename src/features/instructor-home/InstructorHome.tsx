"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BookOpen, Users, DollarSign, PlayCircle } from "lucide-react";

const data = [
  { name: "Mon", students: 10 },
  { name: "Tue", students: 22 },
  { name: "Wed", students: 18 },
  { name: "Thu", students: 27 },
  { name: "Fri", students: 15 },
];

const InstructorHome: React.FC = () => {
  return (
    <main className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Top Stats */}
      <div className="tab:grid-cols-2 laptopS:grid-cols-4 grid gap-4">
        <Card className="rounded-2xl shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Courses</CardTitle>
            <div className="bg-primary/10 text-primary rounded-full p-2">
              <BookOpen className="h-6 w-6" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-primary text-3xl font-bold">12</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Students</CardTitle>
            <div className="bg-primary/10 text-primary rounded-full p-2">
              <Users className="h-6 w-6" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-primary text-3xl font-bold">248</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Revenue</CardTitle>
            <div className="bg-primary/10 text-primary rounded-full p-2">
              <DollarSign className="h-6 w-6" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-primary text-3xl font-bold">$4,520</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Active Classes</CardTitle>
            <div className="bg-primary/10 text-primary rounded-full p-2">
              <PlayCircle className="h-6 w-6" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-primary text-3xl font-bold">3</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart + Recent Enrollments */}
      <div className="laptopS:grid-cols-2 grid gap-6">
        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>Weekly Student Activity</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="students"
                  fill="oklch(76.885% 0.13069 293.571)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>Recent Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span>John Doe</span>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </li>
              <li className="flex items-center justify-between">
                <span>Jane Smith</span>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </li>
              <li className="flex items-center justify-between">
                <span>Ali Raza</span>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Recent Courses Table */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Recent Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="p-2">Course</th>
                  <th className="p-2">Students</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">React Basics</td>
                  <td className="p-2">50</td>
                  <td className="p-2 text-green-600">Active</td>
                  <td className="p-2">
                    <Button size="sm">Manage</Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Node.js Mastery</td>
                  <td className="p-2">35</td>
                  <td className="p-2 text-yellow-600">Draft</td>
                  <td className="p-2">
                    <Button size="sm">Manage</Button>
                  </td>
                </tr>
                <tr>
                  <td className="p-2">UI/UX Fundamentals</td>
                  <td className="p-2">20</td>
                  <td className="p-2 text-red-600">Archived</td>
                  <td className="p-2">
                    <Button size="sm">Manage</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default InstructorHome;
