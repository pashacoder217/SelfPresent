"use client";

import FooterEventsDashboard from "@/SelfPresent/components/dashboard/FooterEventsDashboard";
import DashboardEvents from "@/SelfPresent/components/dashboard/DashboardEvent";
// import Particles from "@/components/magicui/particles";

const EventsPage = () => {
  return (
    <>
      {/* <div className="absolute left-0 right-0 top-0 -z-0 w-full bg-repeat">
        <Particles />
      </div> */}

      <div className="px-5 py-3 h-full">
        <DashboardEvents />
      </div>
      <FooterEventsDashboard />
    </>
  );
};

export default EventsPage;
