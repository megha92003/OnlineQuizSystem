"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const QUESTIONS = [
  {
    id: 1,
    question: "What is the SI unit of electric current?",
    options: ["Volt", "Ohm", "Ampere", "Watt"],
    answer: "Ampere",
  },
  {
    id: 2,
    question: "Which part of the human eye controls the amount of light entering?",
    options: ["Retina", "Iris", "Pupil", "Cornea"],
    answer: "Iris",
  },
  {
    id: 3,
    question: "What is the common name of Sodium Bicarbonate?",
    options: ["Washing Soda", "Baking Soda", "Bleaching Powder", "Plaster of Paris"],
    answer: "Baking Soda",
  },
  {
    id: 4,
    question: "Which lens is used to correct Myopia (Short-sightedness)?",
    options: ["Convex Lens", "Concave Lens", "Bifocal Lens", "Cylindrical Lens"],
    answer: "Concave Lens",
  },
  {
    id: 5,
    question: "Which gas is released during photosynthesis by plants?",
    options: ["Carbon Dioxide", "Hydrogen", "Oxygen", "Nitrogen"],
    answer: "Oxygen",
  },
  {
    id: 6,
    question: "What is the pH value of a neutral solution?",
    options: ["less than 7", "more than 7", "exactly 7", "0"],
    answer: "exactly 7",
  },
  {
    id: 7,
    question: "Which chemical is used in the manufacturing of glass from sand?",
    options: ["Sodium Carbonate", "Sodium Hydroxide", "Sodium Chloride", "Sodium Sulfate"],
    answer: "Sodium Carbonate",
  },
  {
    id: 8,
    question: "The property of metals to be drawn into thin wires is called:",
    options: ["Malleability", "Ductility", "Conductivity", "Sonorous"],
    answer: "Ductility",
  },
  {
    id: 9,
    question: "In the human heart, which chamber pumps oxygenated blood to the whole body?",
    options: ["Right Atrium", "Left Atrium", "Right Ventricle", "Left Ventricle"],
    answer: "Left Ventricle",
  },
  {
    id: 10,
    question: "What is the power of a lens with focal length 1 meter measured in?",
    options: ["Meter", "Dioptre", "Newton", "Pascal"],
    answer: "Dioptre",
  },
];

export default function ScienceNatureQuiz() {
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
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-5xl mx-auto shadow-2xl shadow-indigo-500/20 mb-6">
            🎉
          </div>
          <h1 className="text-4xl font-extrabold pb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Quiz Completed!
          </h1>
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
            <p className="text-gray-400 text-lg">Your Score</p>
            <div className="text-6xl font-black text-indigo-400">
              {score} <span className="text-2xl text-gray-600 font-normal">/ {QUESTIONS.length}</span>
            </div>
            <p className="text-sm text-gray-500 italic mt-4">
              {score === QUESTIONS.length ? "Nature Master! Perfect score." : score >= 3 ? "Great job! You know your science." : "Keep learning! Nature is full of wonders."}
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
              className="px-6 py-4 bg-indigo-600 rounded-2xl font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center"
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
        <div className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400 uppercase tracking-widest">
          Science & Nature
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
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500 ease-out"
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
                    ? "bg-indigo-600 border-indigo-400 shadow-xl shadow-indigo-600/20 translate-x-1"
                    : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/[0.07]"
                }`}
              >
                <span className={`text-lg font-medium ${selectedOption === option ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
                  {option}
                </span>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedOption === option ? "border-white bg-white" : "border-white/20"
                }`}>
                  {selectedOption === option && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className="px-10 py-4 bg-white text-black font-black rounded-2xl hover:bg-indigo-50 transition-all active:scale-[0.98] shadow-xl shadow-white/5 disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100 uppercase tracking-widest text-sm"
          >
            {currentStep === QUESTIONS.length - 1 ? "Finish Quiz" : "Next Question"}
          </button>
        </div>
      </main>
    </div>
  );
}
