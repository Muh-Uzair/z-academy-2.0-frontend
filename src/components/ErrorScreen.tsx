"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ErrorScreen: React.FC = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 px-4">
      <div className="flex flex-col items-center space-y-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="h-10 w-10 text-red-600" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Oops! Something went wrong
          </h1>
          <p className="mt-2 text-gray-600">
            We hit a snag while loading this page. Please try again or return
            later.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="default" onClick={handleReload}>
            Reload Page
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorScreen;
