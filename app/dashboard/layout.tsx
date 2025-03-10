// app/dashboard/layout.tsx

import BackgroundParticles from "@/SelfPresent/components/BackgroundParticles";
import NavBar from "@/SelfPresent/components/dashboard/Navbar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import DashboardAssistant from "@/SelfPresent/components/dashboard/DashboardAssistant";
import NavbarAssistant from "@/SelfPresent/components/dashboard/NavbarAssistant";
import QueryProvider from "@/SelfPresent/components/onboarding/QueryProvider";
import NavBarMainDashboard from "@/SelfPresent/components/NavBarMainDashboard";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/signin/email_sigin");
  }
  const { data: sub_data } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", data.user.id)
    .single();
  if (sub_data?.status == "canceled") {
    redirect("/pricing");
  }
  return (
    <>
      <QueryProvider>
        {/* <div className="fixed inset-0 -z-0 h-full w-full opacity-10">
          <BackgroundParticles />
        </div> */}
        <div className="sticky left-0 right-0 top-0 z-40">
          <NavBarMainDashboard />
        </div>

        <main className="flex min-h-screen justify-center bg-gradient-to-r from-neutral-200 via-neutral-50 to-neutral-200 dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-700">
          <div className="pointer-events-none fixed inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-b from-transparent via-neutral-100 to-neutral-300 dark:via-neutral-800 dark:to-neutral-950" />
          <div className="pointer-events-none fixed inset-x-0 top-0 z-10 h-40 bg-gradient-to-t from-transparent via-neutral-100 to-neutral-300 dark:via-neutral-800 dark:to-neutral-950" />

          <div
            id="section-left"
            className="flex flex-col overflow-hidden md:col-span-3"
          >
            <div className="flex justify-center">
              <NavBar />
            </div>
            <div className="h-full">{children}</div>
          </div>
        </main>

        {/* <div className="fixed inset-0 -z-0 h-full w-full opacity-10">
          <BackgroundParticles />
        </div>
        <div className="sticky left-0 right-0 top-0 z-40 md:absolute">
          <NavBarMainDashboard />
        </div>

        <main className="flex min-h-screen justify-center bg-gradient-to-r from-neutral-200 via-neutral-50 to-neutral-200 dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-700 md:grid md:h-screen md:grid-cols-5">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-36 bg-gradient-to-b from-transparent via-neutral-100 to-neutral-300 dark:via-neutral-800 dark:to-neutral-950 md:block" />
          <div className="pointer-events-none fixed inset-x-0 top-0 z-10 h-40 bg-gradient-to-t from-transparent via-neutral-100 to-neutral-300 dark:via-neutral-800 dark:to-neutral-950 md:h-44" />

          <div
            id="section-left"
            className="flex flex-col overflow-hidden md:col-span-3"
          >
            <div className="flex justify-center">
              <NavBar />
            </div>
            <div className="h-full">{children}</div>
          </div>

          <div
            id="section-right"
            className="hidden h-screen overflow-hidden md:col-span-2 md:flex md:flex-col"
          >
            <div className="flex justify-center">
              <NavbarAssistant />
            </div>
            <div className="h-full overflow-y-auto">
              <DashboardAssistant />
            </div>
          </div>
        </main> */}
      </QueryProvider>
    </>
  );
}
