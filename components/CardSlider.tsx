// components/CardSlider.tsx

"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Activity,
  Scale,
  GraduationCap,
  Handshake,
  Mic,
  LucideIcon,
  ArrowDown,
} from "lucide-react";
import { Roboto_Mono, Poppins } from "next/font/google";
import { createClient } from "@/utils/supabase/client";
import { Input } from "./ui/shadcn/input";
import { Button } from "./ui/shadcn/button";
import TitleAndType from "./TitleAndType";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

type CardType = {
  id: string;
  type: string;
  color: string;
  fontColor: string;
  icon: LucideIcon;
  title: string;
  upload_date: string;
  file_url: string;
};

const CARD_OFFSET = 10;
const SCALE_FACTOR = 0.06;

const moveToEnd = <T,>(arr: T[], from: number): T[] => {
  const item = arr[from];
  const newArr = arr.filter((_, index) => index !== from);
  newArr.push(item);
  return newArr;
};

const moveToStart = <T,>(arr: T[], from: number): T[] => {
  const item = arr[from];
  const newArr = arr.filter((_, index) => index !== from);
  newArr.unshift(item);
  return newArr;
};

const CardSlider: React.FC<{ fileUrl?: string }> = ({ fileUrl }) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const supabase = createClient();

  const fetchCards = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("user_uploads")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching cards:", error);
      } else {
        const updatedCards: CardType[] = data.map((item: any) => ({
          id: item.id,
          ...item,
          icon: getIconComponent(item.type),
          color: getColorClass(item.type),
          fontColor: getFontColorClass(item.type),
          file_url: item.file_url,
        }));
        setCards(updatedCards);
      }
    }
    setLoading(false);
  };

  const getIconComponent = (type: string): LucideIcon => {
    switch (type) {
      case "medical":
        return Activity;
      case "legal":
        return Scale;
      case "academic":
        return GraduationCap;
      case "agreement":
        return Handshake;
      case "record":
        return Mic;
      default:
        return FileText;
    }
  };

  const getColorClass = (type: string): string => {
    switch (type) {
      case "medical":
        return "bg-neutral-950/30";
      case "legal":
        return "bg-white/30";
      case "academic":
        return "bg-neutral-600/30";
      case "agreement":
        return "bg-neutral-400/30";
      case "record":
        return "bg-neutral-200/30";
      default:
        return "bg-neutral-100/30";
    }
  };

  const getFontColorClass = (type: string): string => {
    switch (type) {
      case "medical":
        return "text-neutral-800";
      case "legal":
        return "text-neutral-700";
      case "academic":
        return "text-neutral-600";
      case "agreement":
        return "text-neutral-500";
      case "record":
        return "text-neutral-400";
      default:
        return "text-neutral-700";
    }
  };

  useEffect(() => {
    fetchCards();
    const subscription = supabase
      .channel("public:user_uploads")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "user_uploads" },
        (payload: any) => {
          fetchCards();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const handleDragEnd = (from: number) => {
    setCards((prevCards) => moveToEnd(prevCards, from));
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      setCards((prevCards) => moveToEnd(prevCards, 0));
    } else if (event.key === "ArrowUp") {
      setCards((prevCards) => moveToStart(prevCards, prevCards.length - 1));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const badgeTextVariants = {
    hidden: { opacity: 0.5 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredCards = cards.filter((card) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      card.title?.toLowerCase().includes(searchLower) ||
      card.upload_date?.toLowerCase().includes(searchLower) ||
      card.type?.toLowerCase().includes(searchLower)
    );
  });

  const checkedCards = cards.filter((card) => {
    return !(card.title && card.type);
  });

  return (
    <div className="mt-6 flex h-full flex-1 flex-col items-center justify-center">
      {loading ? (
        <div className="flex h-[240px] items-center justify-center">
          <p className="text-lg text-neutral-600">Loading...</p>
        </div>
      ) : filteredCards.length > 0 && checkedCards.length == 0 ? (
        <>
          <div className="mb-24 mt-36 flex justify-center">
            <Input
              type="text"
              placeholder="Filter documents..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="mx-10 rounded-lg border-2 border-neutral-100/100 bg-neutral-900/100 px-6"
            />
          </div>
          <ul className="relative flex h-[240px] w-full justify-center">
            {filteredCards.map((card, index) => {
              const canDrag = index === 0;
              const IconComponent = card.icon;

              return (
                <motion.li
                  key={card.id} // Use card.id as the key
                  className={`absolute h-[200px] w-[450px] list-none rounded-lg px-5 pt-4 backdrop-blur-xl ${card.color}`}
                  style={{
                    cursor: canDrag ? "grab" : "auto",
                  }}
                  animate={{
                    top: index * -CARD_OFFSET,
                    scale: 1 - index * SCALE_FACTOR,
                    zIndex: cards.length - index,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  drag={canDrag ? "y" : false}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  onDragEnd={() => handleDragEnd(index)}
                >
                  <div className="mt-0 flex items-center justify-between px-2">
                    <div className="flex items-center">
                      <IconComponent className="h-4 w-4 text-neutral-800 opacity-60" />
                      <motion.span
                        className={`bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text pl-2 text-[0.65rem] font-bold uppercase tracking-widest text-transparent dark:from-neutral-800 dark:to-neutral-950`}
                        initial="hidden"
                        animate={index === 0 ? "visible" : "hidden"}
                        variants={badgeTextVariants}
                      >
                        {card.type}
                      </motion.span>
                    </div>
                    <p
                      className={`text-center text-[0.65rem] ${robotoMono.className} bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text tracking-wide text-transparent dark:from-neutral-800 dark:to-neutral-700`}
                    >
                      {card.upload_date}
                    </p>
                  </div>
                  <div className="mb-2 mt-10 flex pl-2 text-left">
                    <div className="mx-0.5">
                      <span
                        className={`text-left text-sm font-semibold ${robotoMono.className} bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text tracking-tight text-transparent`}
                      >
                        {card.title}
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 flex h-16 w-full items-center rounded-b-md border-t-2 border-neutral-400/5 bg-gradient-to-l from-neutral-200/5 to-neutral-100/5 p-2 px-4">
                    <Button
                      className="flex w-full max-w-[90%] items-center justify-between rounded-lg border border-neutral-950/40 bg-neutral-900 px-2"
                      variant="secondary"
                      onClick={() => console.log(card.file_url)}
                    >
                      <a
                        href={card.file_url}
                        download
                        className="flex w-full items-center justify-start gap-1.5"
                      >
                        <div className="ml-0.5 flex items-center justify-center rounded-full bg-gradient-to-l from-neutral-950 to-neutral-900 p-0.5">
                          <ArrowDown className="h-3 w-3 text-xs text-neutral-300" />
                        </div>
                        <span
                          className={`bg-gradient-to-r from-neutral-300 to-neutral-400 bg-clip-text pl-0.5 text-xs uppercase text-transparent ${poppins.className} tracking-wider transition-all duration-500 hover:tracking-widest hover:ease-in-out`}
                        >
                          Download Evidence
                        </span>
                      </a>
                    </Button>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </>
      ) : checkedCards.length > 0 ? (
        <TitleAndType fileUrl={fileUrl} />
      ) : cards.length == 0 ? (
        <div className="flex h-[240px] items-center justify-center">
          <p className="text-lg text-neutral-600">No files added yet</p>
        </div>
      ) : (
        <div className="mb-24 mt-36 flex justify-center">
          <Input
            type="text"
            placeholder="Filter documents..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="mx-10 rounded-lg border-2 border-neutral-100/100 bg-neutral-900/100 px-6"
          />
        </div>
      )}
    </div>
  );
};

export default CardSlider;
