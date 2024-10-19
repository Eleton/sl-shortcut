"use client";

import { useEffect, useState } from "react";
import { jungfrugatan, karlaplan, stadion } from "./data";
import Station from "./components/Station";

const Page = () => {
  const [lastRefresh, setLastRefresh] = useState(Date.now());
  const [currentTime, setCurrentTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000 * 15);

    return () => {
      clearInterval(interval);
    };
  });
  return (
    <main className="flex h-screen w-full flex-col bg-amber-50 px-2 py-1 pt-4">
      <div className="flex flex-col gap-6">
        <Station info={jungfrugatan} lastRefresh={lastRefresh} />
        <Station info={karlaplan} lastRefresh={lastRefresh} />
        <Station info={stadion} lastRefresh={lastRefresh} />
      </div>
      <div className="flex grow flex-col items-center justify-center gap-1 pb-2">
        <button
          className="rounded bg-amber-500 px-8 py-2 text-lg font-bold text-amber-50 active:bg-amber-600"
          onClick={() => {
            setLastRefresh(Date.now());
            setCurrentTime(Date.now());
          }}
        >
          Refresh
        </button>
        <div className="text-sm italic">
          Last refresh: {Math.floor((currentTime - lastRefresh) / (1000 * 60))}{" "}
          minutes ago
        </div>
      </div>
    </main>
  );
};

export default Page;
