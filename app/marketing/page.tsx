import Pricing from "@/SelfPresent/components/ui/Pricing/Pricing";
import { createClient } from "@/utils/supabase/server";

import { Calendar } from "@/SelfPresent/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/SelfPresent/components/ui/command";
import { cn } from "@/SelfPresent/lib/utils";
import { BentoCard, BentoGrid } from "@/SelfPresent/components/magicui/bento-grid";
import Globe from "@/SelfPresent/components/magicui/globe";
import Marquee from "@/SelfPresent/components/magicui/marquee";
import {
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import LogoIconBlink from "@/SelfPresent/components/LogoIconBlink";
import { Poppins, Roboto_Mono } from "next/font/google";
import {
  ArrowRight,
  ArrowRightIcon,
  CircleArrowRight,
  Plane,
  PlaneTakeoff,
  Zap,
} from "lucide-react";
import TextShimmer from "@/SelfPresent/components/magicui/animated-shiny-text";
import TypingAnimation from "@/SelfPresent/components/magicui/typing-animation";
import SwitchCustomHorizontal from "@/SelfPresent/components/SwitchCustomHorizontal";
import { FlipWords } from "@/SelfPresent/components/ui/flip-words";
import { Button } from "@/SelfPresent/components/ui/shadcn/button";
import { GoogleGeminiEffect } from "@/SelfPresent/components/ui/google-gemini-effect";
import { useScroll, useTransform } from "framer-motion";
import React from "react";
import CustomGeminiHeader from "@/SelfPresent/components/ui/CustomGeminiHeader";
import { HeaderMeteor } from "@/SelfPresent/components/HeaderMeteor";
// import HeaderRetroGrid from '@/components/HeaderRetroGrid';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/SelfPresent/components/ui/tooltip";
import ButtonLogin from "../../components/ButtonLogin";
import BackgroundDotPattern from "@/SelfPresent/components/BackgroundDotPattern";
import { Badge } from "@/SelfPresent/components/ui/shadcn/badge";
import BadgeHoverMarketing from "@/SelfPresent/components/BadgeHoverMarketing";
import { SectionTextReveal } from "@/SelfPresent/components/SectionTextReveal";
import NavBar from "@/SelfPresent/components/NavBarMain";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

const files = [
  {
    name: "divorce_petition.pdf",
    body: "A legal document filed with the court to initiate the process of divorce, including details of the marriage, grounds for divorce, and requested relief.",
  },
  {
    name: "parenting_plan.xlsx",
    body: "A spreadsheet outlining the agreed-upon terms for child custody and visitation, including schedules, decision-making responsibilities, and communication guidelines.",
  },
  {
    name: "property_settlement_agreement.docx",
    body: "A Word document that details the terms of property division between spouses, covering real estate, financial assets, debts, and personal property.",
  },
  {
    name: "child_support_order.pdf",
    body: "A court-issued document that specifies the amount and frequency of child support payments, along with any conditions or modifications.",
  },
  {
    name: "school_records.pdf",
    body: "A document containing the child’s academic records, attendance reports, and other relevant educational information.",
  },
  {
    name: "medical_records.pdf",
    body: "A document that includes the child’s medical history, immunization records, and any other relevant health information.",
  },
  {
    name: "joint_custody_agreement.txt",
    body: "A text file detailing the terms and conditions of joint custody, including physical custody schedules and legal custody arrangements.",
  },
  {
    name: "financial_disclosure_form.xlsx",
    body: "A spreadsheet used to disclose financial information, including income, expenses, assets, and liabilities, as part of the legal process.",
  },
];

const features = [
  {
    Icon: FileTextIcon,
    name: "Save your legal files",
    description:
      "You can chat with your files in the context of the law in your jurisdiction",
    href: "/",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: InputIcon,
    name: "Find any law",
    description: "Get research done for court",
    href: "/",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute right-10 top-10 w-[70%] origin-top translate-x-0 border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:-translate-x-10">
        <div className="flex flex-col p-4">
          <h2 className="text-lg font-semibold">Suggestions</h2>
          <ul className="mt-2 space-y-1">
            <li className="text-sm">parenting_plan.pdf</li>
            <li className="text-sm">property_settlement_agreement.docx</li>
            <li className="text-sm">child_support_order.pdf</li>
            <li className="text-sm">school_records.pdf</li>
            <li className="text-sm">medical_records.pdf</li>
            <li className="text-sm">joint_custody_agreement.txt</li>
            <li className="text-sm">financial_disclosure_form.xlsx</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    Icon: GlobeIcon,
    name: "Multilingual",
    description: "Supports 100+ languages and counting.",
    href: "/",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <Globe className="top-0 h-[600px] w-[600px] transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_30%,#000_100%)] group-hover:scale-105 sm:left-40" />
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description:
      "Coming soon: AI automatically keeps track of your court and other dates",
    className: "col-span-3 lg:col-span-1",
    href: "/",
    cta: "Learn more",
    background: (
      <Calendar
        mode="single"
        selected={new Date(2022, 4, 11, 0, 0, 0)}
        className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
      />
    ),
  },
];

export default async function Marketing() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: subscription, error } = await supabase
    .from("subscriptions")
    .select("*, prices(*, products(*))")
    .in("status", ["trialing", "active"])
    .maybeSingle();

  if (error) {
    console.log(error);
  }

  const { data: products } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { referencedTable: "prices" });

  return (
    <>
      <NavBar />

      <div className="-translate-y-12">
        {/* <HeaderRetroGrid /> */}
        <HeaderMeteor />
        {/* <CustomGeminiHeader /> */}
      </div>

      <div>
        <SectionTextReveal />
      </div>

      <div className="pt-64">
        <BadgeHoverMarketing />
      </div>
      <BackgroundDotPattern />
      <div className="px-6 pt-48">
        <BentoGrid>
          {features.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
          ))}
        </BentoGrid>
      </div>
      <div className="pt-48">
        <Pricing
          user={user}
          products={products ?? []}
          subscription={subscription}
        />
      </div>

      <footer className="sticky bottom-0 z-50 flex h-11 items-center justify-end border-t border-neutral-800/10 bg-white/5 px-6 backdrop-blur-md dark:border-neutral-100/10 dark:bg-black/5">
        <SwitchCustomHorizontal />
      </footer>
    </>
  );
}
