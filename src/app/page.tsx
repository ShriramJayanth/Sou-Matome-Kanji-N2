"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [week, setWeek] = useState("");
  const [day, setDay] = useState("");

  const handleStart = () => {
    if (!week || !day) return alert("Please select valid week and day.");
    console.log("Selected Week:", week, "Day:", day);
    const dayPath = day ? `/week/${week}/day/${day}` : `/week/${week}/all`;
    console.log("Navigating to:", dayPath);
    router.push(dayPath);
  };

  const handleWholeBook = () => {
    router.push("/test/all");
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-yellow-50 to-yellow-100 flex flex-col justify-center items-center px-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-yellow-200">
        <h1 className="text-3xl font-bold text-center text-yellow-700 mb-6">
          N2 Sou Matome Kanji
        </h1>

      
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Select Week</label>
          <select
            value={week}
            onChange={(e) => setWeek(e.target.value)}
            className="w-full border border-yellow-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Choose Week</option>
            {[1, 2, 3, 4, 5, 6].map((w) => (
              <option key={w} value={w}>
                Week{w}
              </option>
            ))}
          </select>
        </div>

    
        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">Select Day</label>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full border border-yellow-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Choose Day</option>
            <option value="all">All Days</option>
            {[1, 2, 3, 4, 5, 6, 7].map((d) => (
              <option key={d} value={d}>
                Day{d}
              </option>
            ))}
          </select>
        </div>

  
        <button
          onClick={handleStart}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg shadow-md transition-all"
        >
          Start Test
        </button>

  
        <div className="my-4 text-center text-gray-400">or</div>

    
        <button
          onClick={handleWholeBook}
          className="w-full bg-yellow-700 hover:bg-yellow-800 text-white font-semibold py-2 rounded-lg shadow-md transition-all"
        >
          Whole Book Test
        </button>
      </div>

      <p className="mt-8 text-gray-500 text-sm">
        © 富士山😎
      </p>
    </main>
  );
}
