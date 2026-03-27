"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const QUESTIONS = [
  {
    id: 1,
    question: "Who was the leader of the Nazi Party in Germany?",
    options: ["Winston Churchill", "Adolf Hitler", "Benito Mussolini", "Joseph Stalin"],
    answer: "Adolf Hitler",
  },
  {
    id: 2,
    question: "Which event triggered the start of World War I?",
    options: ["Invasion of Poland", "Attack on Pearl Harbor", "Assassination of Archduke Franz Ferdinand", "The Fall of the Bastille"],
    answer: "Assassination of Archduke Franz Ferdinand",
  },
  {
    id: 3,
    question: "The Industrial Revolution first began in which country?",
    options: ["France", "USA", "Germany", "Great Britain"],
    answer: "Great Britain",
  },
  {
    id: 4,
    question: "Who wrote the 'Communist Manifesto'?",
    options: ["Karl Marx & Friedrich Engels", "Vladimir Lenin", "Adam Smith", "Leon Trotsky"],
    answer: "Karl Marx & Friedrich Engels",
  },
  {
    id: 5,
    question: "Which treaty ended World War I?",
    options: ["Treaty of Paris", "Treaty of Versailles", "Treaty of London", "Treaty of Ghent"],
    answer: "Treaty of Versailles",
  },
  {
    id: 6,
    question: "The French Revolution began in which year?",
    options: ["1776", "1789", "1812", "1848"],
    answer: "1789",
  },
  {
    id: 7,
    question: "Who is known as the 'Father of the Nation' in Vietnam?",
    options: ["Mao Zedong", "Ho Chi Minh", "Pol Pot", "Sukarno"],
    answer: "Ho Chi Minh",
  },
  {
    id: 8,
    question: "Fascism originated in which country?",
    options: ["Germany", "Spain", "Italy", "Japan"],
    answer: "Italy",
  },
  {
    id: 9,
    question: "The League of Nations was established after which war?",
    options: ["World War I", "World War II", "Napoleonic Wars", "Cold War"],
    answer: "World War I",
  },
  {
    id: 10,
    question: "Who was the President of the United States during the end of World War II?",
    options: ["Woodrow Wilson", "Franklin D. Roosevelt", "Harry S. Truman", "Dwight D. Eisenhower"],
    answer: "Harry S. Truman",
  },
];

export default function WorldHistoryQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/signin");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === QUESTIONS[currentStep].answer) {
      setScore(score + 1);
    }

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  if (!user) return <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">Loading...</div>;

  if (showResult) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full text-center space-y-8 animate-fade-in">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-5xl mx-auto shadow-2xl shadow-orange-500/20 mb-6 font-bold">
            📜
          </div>
          <h1 className="text-4xl font-extrabold pb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Quiz Completed!
          </h1>
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
            <p className="text-gray-400 text-lg">Your History Score</p>
            <div className="text-6xl font-black text-amber-400">
              {score} <span className="text-2xl text-gray-600 font-normal">/ {QUESTIONS.length}</span>
            </div>
            <p className="text-sm text-gray-500 italic mt-4">
              {score === QUESTIONS.length ? "Historian Supreme! Perfect score." : score >= 7 ? "Great job! You have a strong grasp of history." : "History is the key to the future. Keep exploring!"}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <button
              onClick={() => {
                setCurrentStep(0);
                setScore(0);
                setShowResult(false);
                setSelectedOption(null);
              }}
              className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all"
            >
              Retry
            </button>
            <Link
              href="/dashboard"
              className="px-6 py-4 bg-amber-600 rounded-2xl font-bold hover:bg-amber-500 transition-all shadow-lg shadow-amber-600/20 flex items-center justify-center"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 font-sans flex flex-col">
      <header className="max-w-4xl mx-auto w-full py-8 flex items-center justify-between">
        <Link href="/dashboard" className="text-sm font-medium text-gray-500 hover:text-white transition-colors flex items-center gap-2">
          <span>←</span> Back to Dashboard
        </Link>
        <div className="px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-400 uppercase tracking-widest">
          World History (10th Std)
        </div>
      </header>

      <main className="max-w-3xl mx-auto w-full flex-grow flex flex-col justify-center gap-12 pb-24">
        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-bold text-gray-500 tracking-wider">
            <span>QUESTION {currentStep + 1} OF {QUESTIONS.length}</span>
            <span>{Math.round(progress)}% COMPLETE</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Area */}
        <div className="space-y-10">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight animate-fade-in-up">
            {QUESTIONS[currentStep].question}
          </h2>

          <div className="grid gap-4">
            {QUESTIONS[currentStep].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(option)}
                className={`group p-6 rounded-2xl border text-left flex items-center justify-between transition-all duration-300 ${
                  selectedOption === option
                    ? "bg-amber-600 border-amber-400 shadow-xl shadow-amber-600/20 translate-x-1"
                    : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/[0.07]"
                }`}
              >
                <span className={`text-lg font-medium ${selectedOption === option ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
                  {option}
                </span>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedOption === option ? "border-white bg-white" : "border-white/20"
                }`}>
                  {selectedOption === option && <div className="w-2.5 h-2.5 bg-amber-600 rounded-full" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className="px-10 py-4 bg-white text-black font-black rounded-2xl hover:bg-amber-50 transition-all active:scale-[0.98] shadow-xl shadow-white/5 disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100 uppercase tracking-widest text-sm"
          >
            {currentStep === QUESTIONS.length - 1 ? "Finish Quiz" : "Next Question"}
          </button>
        </div>
      </main>
    </div>
  );
}
