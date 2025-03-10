"use client";

import { useEffect, useState } from "react";
import Particles from "./magicui/particles";
import { useTheme } from "next-themes";

export default function BackgroundParticles() {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#a9a9a9" : "#737373");
  }, [theme]);
  return (
    <div>
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
    </div>
  );
}
