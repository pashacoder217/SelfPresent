"use client";
import React, { useState, useCallback, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import DashboardEvidence from "@/SelfPresent/components/dashboard/DashboardEvidence";
import MetadataEvidenceForm from "@/SelfPresent/components/uploadingThing/metaDataEvidenceForm";
import UploadingForm from "@/SelfPresent/components/uploadingThing/UploadthingForm";
import { Separator } from "@/SelfPresent/components/ui/separator";
import SwitchCustomHorizontal from "@/SelfPresent/components/SwitchCustomHorizontal";
import SwitchCustomVertical from "@/SelfPresent/components/SwitchCustomVertical";

import { Roboto_Mono, Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

const Page = () => {
  const [isUploading, setIsUploading] = useState(false);
  const supabase = createClient();
  const fetchingDucuments = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data: docData } = await supabase
        .from("evidence")
        .select("*")
        .eq("user_id", user?.id)
        .is("description", null)
        .single();
      if (docData) {
        setIsUploading(true);
      } else {
        setIsUploading(false);
      }
    }
  }, [supabase]);

  useEffect(() => {
    fetchingDucuments();
  }, []);

  return (
    <>
      <div className="h-full pb-2 pt-2">
        <DashboardEvidence />
      </div>

      <div className="flex justify-center">
        <div className="fixed bottom-0 z-20 flex h-[120px] w-full items-center justify-center gap-4 rounded-t-none border-t border-neutral-200/50 bg-white/5 shadow backdrop-blur-lg dark:border-neutral-800/90 dark:bg-black/5 md:bottom-10 md:max-w-md md:rounded-b-xl md:border dark:md:border-2">
          <div className="">
            <div className="absolute bottom-5 left-5 z-30 md:left-10">
              <SwitchCustomVertical />
            </div>
            {!isUploading ? (
              <div className="flex w-full translate-y-5 items-center justify-center">
                <UploadingForm endpoint="evidenceUploader" />
              </div>
            ) : (
              <div className="absolute bottom-4 flex flex-grow flex-col">
                <MetadataEvidenceForm />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-32 bg-gradient-to-b from-transparent via-neutral-100 to-neutral-300 dark:via-neutral-800 dark:to-neutral-950 md:block" /> */}
    </>
  );
};
export default Page;
