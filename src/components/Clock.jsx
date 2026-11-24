"use client";
import { useEffect, useState } from "react";

export default function Clock() {
  const [now, setNow] = useState(null);

useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(id);
  }, []);
  
  return <p>{now ? now.toLocaleTimeString("id-ID") : "..."}</p>;
}