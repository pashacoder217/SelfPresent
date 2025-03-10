"use client";

import { CloudDownload, MonitorDown } from "lucide-react";
import Image from "next/image";
import { Roboto_Mono, Poppins } from "next/font/google";
import { LinkPreview } from "../../ui/link-preview";
import { Button } from "@/SelfPresent/components/ui/shadcn/button";

const robotoMono = Roboto_Mono({ subsets: ["latin"], display: "swap" });
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const EvidenceCp = (childs: any) => {
  const downloadFile = async (url: string) => {
    const response = await fetch(url, { mode: "cors" });
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = getFilename(url);
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(downloadUrl);
  };

  const getFilename = (url: string): string => {
    return url.split("/").pop() || "download";
  };

  return (
    <div className="">
      {childs.childs.map((child: any, index: number) => {
        return (
          <div key={index} className="flex items-start justify-between py-2">
            <div>
              <div className="bg-gradient-to-r from-neutral-700 to-neutral-900 bg-clip-text font-semibold text-transparent dark:from-neutral-300 dark:to-neutral-100">
                {child.evidence.description}
              </div>
              <div
                className={`${robotoMono.className} bg-gradient-to-r from-neutral-400 to-neutral-500 bg-clip-text text-xs uppercase tracking-widest text-transparent dark:from-neutral-400/70 dark:to-neutral-300/70`}
              >
                {child.evidence.date}
              </div>
            </div>
            <LinkPreview url={child.evidence.url} className="font-bold">
              <Button className="rounded-full" variant="ghost" size="icon">
                <a
                  href={child.evidence.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    downloadFile(child.evidence.url);
                  }}
                  className="underline"
                >
                  <CloudDownload className="size-5 text-neutral-400 hover:text-neutral-800 dark:text-neutral-300/70 dark:hover:text-neutral-300" />
                </a>
              </Button>
            </LinkPreview>
          </div>
        );
      })}
    </div>
  );
};

export default EvidenceCp;
