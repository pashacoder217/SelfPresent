"use client";
import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";
import { Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SwitchCustomVertical() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Determine if the switch should be "on"
  const isLightTheme = theme === "light";

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 28,
          ease: "linear",
        }}
      >
        <Sun size={14} opacity={0.8} />
      </motion.div>
      <Switch
        onClick={toggleTheme}
        checked={isLightTheme}
        className="dark:data-[state=unchecked]:bg-neutral-300"
      />
    </div>
  );
}
