import OnboardingFormLoop from "@/SelfPresent/components/OnboardingFormLoop";
import Meteors from "@/SelfPresent/components/magicui/meteors";
import NavBarMain from "@/SelfPresent/components/NavBarMain";
import SwitchCustomHorizontal from "@/SelfPresent/components/SwitchCustomHorizontal";
import { Roboto_Mono } from "next/font/google";
import { Poppins } from "next/font/google";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function HomePage() {
  return (
    <div className="">
      <header></header>
      <NavBarMain />
      <Meteors number={6} />

      <main>
        <div className="flex h-screen flex-col items-start pl-8 pt-52 md:pl-24">
          <h1
            className={`${poppins.className} max-w-[95%] bg-gradient-to-r from-neutral-700 to-neutral-900 bg-clip-text pb-4 text-left text-4xl text-transparent dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-300 md:pb-10 md:text-8xl`}
          >
            Co-parent recorder <br />
            Your truth teller
          </h1>
          <h1
            className={`${robotoMono.className} max-w-[85%] bg-gradient-to-r from-neutral-700 to-neutral-900 bg-clip-text text-left text-lg text-transparent dark:from-neutral-600 dark:to-neutral-400 md:text-2xl`}
          >
            Record events, evidence and documents
          </h1>
          <h1
            className={`${robotoMono.className} max-w-[85%] bg-gradient-to-r from-neutral-700 to-neutral-900 bg-clip-text text-left text-lg text-transparent dark:from-neutral-600 dark:to-neutral-400 md:text-2xl`}
          >
            AI generated reports
          </h1>
          {/* <h1
          className={`${poppins.className} max-w-[95%] bg-gradient-to-r from-neutral-700 to-neutral-900 bg-clip-text pb-4 text-left text-xl text-transparent dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-300`}
        >
          Joint the waitlist to get first access to a free trial
        </h1> */}
          <div className="w-full pt-20">
            <OnboardingFormLoop />
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 z-50 flex h-11 items-center justify-end border-t border-neutral-800/10 bg-white/5 px-6 backdrop-blur-md dark:border-neutral-100/10 dark:bg-black/5">
        <SwitchCustomHorizontal />
      </footer>
    </div>
  );
}
