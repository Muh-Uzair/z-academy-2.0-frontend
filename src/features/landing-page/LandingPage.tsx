import { LandingPageHeader } from "@/components/LandingPageHeader";
import { getCurrUser } from "@/services/getCurrUser";
import { QueryClient } from "@tanstack/react-query";
import React from "react";

const LandingPage: React.FC = async () => {
  // VARS
  const queryClient = new QueryClient();

  // FUNCTIONS
  await queryClient.prefetchQuery({
    queryKey: ["currUser"],
    queryFn: getCurrUser,
  });

  // JSX
  return (
    <div>
      <LandingPageHeader />
      <main className="pt-[50px]">
        <section className="p-3">
          <div className="from-primary-extra-light/50 to-primary-extra-light h-[200px] rounded-md bg-gradient-to-b">
            Hero Section
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
