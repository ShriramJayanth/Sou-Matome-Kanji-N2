"use client";

import React, { useEffect, useState } from "react";
import { useRouter,useParams } from "next/navigation";

interface Jukugo {
  kanji: string;
  reading: string;
  meaning: string;
}

export default function QuizPage() {
  const router = useRouter();
  const params = useParams();
  const [jukugos, setJukugos] = useState<Jukugo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [showMeaning, setShowMeaning] = useState(false);

  useEffect(() => {
    const week = params.weekId;
    const day = params.dayId;

    fetch(`/data/week${week}/day${day}.json`)
      .then((res) => res.json())
      .then((data) => {
        const shuffled = data.jukugo.sort(() => Math.random() - 0.5);
        setJukugos(shuffled);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jukugos.length) return;

    const correct = jukugos[currentIndex].reading.trim();
    if (answer.trim() === correct) {
      setFeedback("correct");
      setShowMeaning(true);
    } else {
      setFeedback("wrong");
    }
  };

  const handleNext = () => {
    setAnswer("");
    setFeedback(null);
    setShowMeaning(false);
    setCurrentIndex((prev) => prev + 1);
  };

  if (!jukugos.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-yellow-700 text-xl">
        Loading quiz...
      </div>
    );
  }

  if (currentIndex >= jukugos.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-yellow-100 to-yellow-50 text-yellow-800 text-center p-6">
        <h1 className="text-4xl font-bold mb-4">🎉 All done!</h1>
        <p className="text-lg mb-8">You’ve completed this quiz. Great job!</p>

        <button
          onClick={() => (router.push("/"))}
          className="bg-yellow-500 text-white px-6 py-3 rounded-xl text-lg hover:bg-yellow-600 transition-all shadow-md"
        >
          ⬅️ Return to Home
        </button>
      </div>
    );
  }

  const current = jukugos[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-yellow-100 to-yellow-50 text-center p-6">
      <button
        onClick={() => router.push("/")}
        className="fixed top-4 right-4 bg-yellow-400 text-yellow-900 font-semibold 
             px-4 py-2 rounded-lg shadow-md hover:bg-yellow-500 transition-all"
      >
        ⬅️ Home
      </button>
      <div className="w-[50%] bg-white rounded-2xl shadow-xl p-8 border border-yellow-200">
        <h1 className="text-6xl font-bold mb-8 text-yellow-700">
          {current.kanji}
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter reading (hiragana)"
            className="w-full text-center text-lg border-2 border-yellow-300 rounded-xl py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button
            type="submit"
            className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-xl hover:bg-yellow-600 transition"
          >
            Submit
          </button>
        </form>

        {feedback === "wrong" && (
          <p className="mt-4 text-red-500 font-semibold">❌ Try again!</p>
        )}

        {feedback === "correct" && (
          <div className="mt-6">
            <p className="text-green-600 font-bold text-lg">✅ Correct!</p>
            {showMeaning && (
              <p className="mt-2 text-gray-700 text-base">
                Meaning:{" "}
                <span className="font-semibold">{current.meaning}</span>
              </p>
            )}
            <button
              onClick={handleNext}
              className="mt-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      <p className="mt-6 text-sm text-yellow-600">
        Progress: {currentIndex + 1}/{jukugos.length}
      </p>
    </div>
  );
}
