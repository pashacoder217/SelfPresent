"use client";
import React from "react";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "./ui/glowing-stars";

const casesData = [
  {
    date: "January 20, 2023",
    title: "2 Hour Late Drop-Off",
    description:
      "She dropped the kids off at my place 2 hours later than court ordered, and did not notify me.",
  },
  {
    date: "February 15, 2023",
    title: "Missed School Event",
    description:
      "He did not attend the school's parent-teacher meeting despite prior agreement.",
  },
  {
    date: "March 10, 2023",
    title: "Unapproved Trip",
    description:
      "She took the kids out of state without notifying or getting approval from me.",
  },
  {
    date: "April 5, 2023",
    title: "Missed Child Support Payment",
    description:
      "He missed the scheduled child support payment for the month of April.",
  },
  {
    date: "May 22, 2023",
    title: "Conflict at Pickup",
    description:
      "There was a heated argument during the pickup, which upset the kids.",
  },
];

export function CardGlowingStarsBackground() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-20 antialiased">
      {casesData.map((caseItem, index) => (
        <GlowingStarsBackgroundCard key={index}>
          <GlowingStarsTitle>{caseItem.title}</GlowingStarsTitle>
          <div className="flex items-end justify-between">
            <GlowingStarsDescription>
              {caseItem.description}
            </GlowingStarsDescription>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsla(0,0%,100%,.1)]">
              <Icon />
            </div>
          </div>
          <p className="mt-4">{caseItem.date}</p>
        </GlowingStarsBackgroundCard>
      ))}
    </div>
  );
}

const Icon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="h-4 w-4 stroke-2 text-white"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
      />
    </svg>
  );
};
