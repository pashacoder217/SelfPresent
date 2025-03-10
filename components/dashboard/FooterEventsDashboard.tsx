import SwitchCustomHorizontal from "../SwitchCustomHorizontal";
import SwitchCustomVertical from "../SwitchCustomVertical";
// import { Input } from "../ui/shadcn/input";
import Desktop from "./addEventComponent/Desktop";
import Mobile from "./addEventComponent/Mobile";
import Default from "./addEventComponent/Default";

export default function FooterEventsDashboard() {
  return (
    <div className="flex justify-center">
      <footer className="fixed bottom-0 z-20 flex h-[120px] w-full max-w-md items-center justify-center gap-4 rounded-none border-t border-neutral-200/50 bg-white/5 shadow backdrop-blur-lg dark:border-t-2 dark:border-neutral-800/90 dark:bg-black/5 md:bottom-10 md:w-[58%] md:rounded-b-xl md:rounded-t-none md:border dark:md:border-2">
        {/* <Desktop /> */}
        <div className="absolute bottom-5 left-5 z-30 md:left-10">
          <SwitchCustomVertical />
        </div>
        <div className="absolute bottom-5 z-30 flex flex-col items-center justify-center gap-4">
          {/* <Mobile /> */}
          {/* <Input /> */}
          {/* <Default /> */}
          <div className="block md:hidden">
            <Mobile />
          </div>
          <div className="hidden md:block">
            <Default />
          </div>
        </div>
      </footer>
    </div>
  );
}
