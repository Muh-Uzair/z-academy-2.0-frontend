"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Book, ClipboardCheck, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const StudentHome: React.FC = () => {
  return (
    <main className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Top Stats */}
      <div className="tab:grid-cols-2 laptopS:grid-cols-4 grid gap-4">
        <Card className="rounded-2xl shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Enrolled Courses</CardTitle>
            <div className="bg-primary/10 text-primary rounded-full p-2">
              <Book className="h-6 w-6" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-primary text-3xl font-bold">6</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Completed Courses</CardTitle>
            <div className="bg-primary/10 text-primary rounded-full p-2">
              <GraduationCap className="h-6 w-6" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-primary text-3xl font-bold">3</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Assignments Due</CardTitle>
            <div className="bg-primary/10 text-primary rounded-full p-2">
              <ClipboardCheck className="h-6 w-6" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-primary text-3xl font-bold">2</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Achievements</CardTitle>
            <div className="bg-primary/10 text-primary rounded-full p-2">
              <Award className="h-6 w-6" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-primary text-3xl font-bold">5</p>
          </CardContent>
        </Card>
      </div>

      {/* Course Progress */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span>React Basics</span>
              <span>75%</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>

          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span>UI/UX Fundamentals</span>
              <span>40%</span>
            </div>
            <Progress value={40} className="h-2" />
          </div>

          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span>Node.js Mastery</span>
              <span>90%</span>
            </div>
            <Progress value={90} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Classes */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Upcoming Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-center justify-between">
              <span>React Basics – Monday, 10 AM</span>
              <Button size="sm" variant="outline">
                Join
              </Button>
            </li>
            <li className="flex items-center justify-between">
              <span>Node.js Mastery – Wednesday, 2 PM</span>
              <Button size="sm" variant="outline">
                Join
              </Button>
            </li>
            <li className="flex items-center justify-between">
              <span>UI/UX Fundamentals – Friday, 4 PM</span>
              <Button size="sm" variant="outline">
                Join
              </Button>
            </li>
          </ul>
        </CardContent>
      </Card>
    </main>
  );
};

export default StudentHome;
