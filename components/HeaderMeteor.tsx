import Meteors from "@/SelfPresent/components/magicui/meteors";
import { Poppins, Roboto_Mono } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

export function HeaderMeteor() {
  return (
    <>
      <div className="relative flex h-screen w-full flex-col justify-center overflow-visible rounded-lg bg-background p-14 md:h-[65vh] md:p-20">
        <Meteors number={6} />
        <h1 className="text-left text-3xl">ATTN: Single Parents</h1>
        <h1
          className={`${poppins.className} z-10 whitespace-pre-wrap bg-gradient-to-r from-neutral-700 to-neutral-950 bg-clip-text text-3xl font-medium text-transparent dark:from-neutral-400 dark:to-neutral-100 md:text-6xl`}
        >
          The Single Parent
          <br />
          AI Assistant and Dashboard
        </h1>
        <h2
          className={`${robotoMono.className} z-10 whitespace-pre-wrap bg-gradient-to-r from-neutral-700 to-neutral-950 bg-clip-text pt-12 text-lg text-transparent dark:from-neutral-400 dark:to-neutral-100 md:text-2xl`}
        >
          Everything at-a-glance
          <br />
          <br />
          AI Law Finder
          <br />
          AI Organized Evidence
          <br />
          AI Organized Evidence AI Text Message Search
          <br />
          AI Tracked Events
          <br />
        </h2>
      </div>
    </>
  );
}
