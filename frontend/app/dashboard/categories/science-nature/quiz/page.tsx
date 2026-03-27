"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const QUESTIONS = [
  { id: 1, question: "What is the SI unit of electric current?", options: ["Volt", "Ampere", "Ohm", "Watt"], answer: "Ampere" },
  { id: 2, question: "Which lens is used to correct myopia (near-sightedness)?", options: ["Convex lens", "Concave lens", "Bifocal lens", "Cylindrical lens"], answer: "Concave lens" },
  { id: 3, question: "What is the process of conversion of solid directly into gas?", options: ["Evaporation", "Condensation", "Sublimation", "Solidification"], answer: "Sublimation" },
  { id: 4, question: "What is the main component of natural gas?", options: ["Ethane", "Methane", "Propane", "Butane"], answer: "Methane" },
  { id: 5, question: "Which acid is present in ant sting?", options: ["Citric acid", "Acetic acid", "Methanoic acid", "Tartaric acid"], answer: "Methanoic acid" },
  { id: 6, question: "What is the chemical formula for Bleaching powder?", options: ["CaCO3", "CaOCl2", "Ca(OH)2", "CaCl2"], answer: "CaOCl2" },
  { id: 7, question: "Which metal is liquid at room temperature?", options: ["Mercury", "Sodium", "Calcium", "Zinc"], answer: "Mercury" },
  { id: 8, question: "What is the outer layer of the Earth called?", options: ["Core", "Mantle", "Crust", "Atmosphere"], answer: "Crust" },
  { id: 9, question: "Which organelle is known as the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi apparatus"], answer: "Mitochondria" },
  { id: 10, question: "What is the basic unit of heredity?", options: ["Cell", "DNA", "Gene", "Chromosome"], answer: "Gene" },
  { id: 11, question: "Which blood group is known as the universal donor?", options: ["AB positive", "AB negative", "O positive", "O negative"], answer: "O negative" },
  { id: 12, question: "What is the refractive index of diamond?", options: ["1.33", "1.50", "2.42", "2.10"], answer: "2.42" },
  { id: 13, question: "Which hormone regulates blood sugar levels?", options: ["Adrenaline", "Thyroxine", "Insulin", "Growth hormone"], answer: "Insulin" },
  { id: 14, question: "What is the common name for Sodium Bicarbonate?", options: ["Washing Soda", "Baking Soda", "Caustic Soda", "Bleaching Powder"], answer: "Baking Soda" },
  { id: 15, question: "Which mirror is used in headlights of cars?", options: ["Plane mirror", "Convex mirror", "Concave mirror", "Cylindrical mirror"], answer: "Concave mirror" },
  { id: 16, question: "What is the frequency range of audible sound for humans?", options: ["2 Hz - 200 Hz", "20 Hz - 20,000 Hz", "2,000 Hz - 200,000 Hz", "200 Hz - 2,000 Hz"], answer: "20 Hz - 20,000 Hz" },
  { id: 17, question: "Which gas is primarily filled in electric bulbs?", options: ["Oxygen", "Hydrogen", "Argon", "Carbon Dioxide"], answer: "Argon" },
  { id: 18, question: "What is the valency of Carbon?", options: ["2", "3", "4", "6"], answer: "4" },
  { id: 19, question: "Which part of the plant conducts water and minerals from soil?", options: ["Phloem", "Xylem", "Stomata", "Chloroplast"], answer: "Xylem" },
  { id: 20, question: "What is the speed of light in vacuum?", options: ["3 x 10^5 m/s", "3 x 10^8 m/s", "3 x 10^10 m/s", "3 x 10^6 m/s"], answer: "3 x 10^8 m/s" },
];

export default function Grade10ScienceQuiz() {
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
        <div className="max-w-xl w-full text-center space-y-10 animate-fade-in">
          <div className="w-28 h-28 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-6xl mx-auto shadow-2xl shadow-indigo-500/20 mb-8 border-4 border-white/5">
            🏆
          </div>
          <div className="space-y-2">
            <h1 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 tracking-tight">
              Grade 10 Results
            </h1>
            <p className="text-gray-500 text-lg">Great effort! Take a look at your performace.</p>
          </div>
          
          <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 space-y-6 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-50" />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Final Score</p>
            <div className="text-8xl font-black text-indigo-400">
              {score} <span className="text-3xl text-gray-700">/ {QUESTIONS.length}</span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="p-4 rounded-3xl bg-white/5 border border-white/5">
                   <div className="text-xs text-gray-500 mb-1">ACCURACY</div>
                   <div className="font-bold">{(score/QUESTIONS.length)*100}%</div>
                </div>
                <div className="p-4 rounded-3xl bg-white/5 border border-white/5">
                   <div className="text-xs text-gray-500 mb-1">STREAK</div>
                   <div className="font-bold text-orange-400">🔥 5</div>
                </div>
                <div className="p-4 rounded-3xl bg-white/5 border border-white/5">
                   <div className="text-xs text-gray-500 mb-1">XP</div>
                   <div className="font-bold text-green-400">+{score * 10}</div>
                </div>
            </div>

            <p className="text-gray-400 italic text-sm pt-4">
              {score >= 18 ? "Absolute Genius! Ready for the finals." : score >= 12 ? "Solid knowledge! A bit more practice and you'll be perfect." : "Keep studying! Science is about exploration."}
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
              className="px-8 py-5 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all border-b-4 border-white/5 active:border-b-0 active:translate-y-1"
            >
              Take it again
            </button>
            <Link
              href="/dashboard/categories/science-nature"
              className="px-8 py-5 bg-indigo-600 rounded-2xl font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center border-b-4 border-indigo-700 active:border-b-0 active:translate-y-1"
            >
               Finish
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      <header className="max-w-6xl mx-auto w-full px-6 py-10 flex items-center justify-between">
        <Link href="/dashboard/categories/science-nature" className="group flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center group-hover:border-indigo-500 transition-all">←</div>
          <span className="text-sm font-medium text-gray-500 group-hover:text-white transition-colors">Exit Quiz</span>
        </Link>
        <div className="text-center">
            <h1 className="text-xl font-bold tracking-tight">Grade 10 Science</h1>
            <p className="text-[10px] uppercase font-black tracking-widest text-indigo-500">20 Question Challenge</p>
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-indigo-500/20 flex items-center justify-center text-[10px] font-black text-indigo-400 bg-indigo-500/5">
             {Math.round(progress)}%
        </div>
      </header>

      <main className="max-w-4xl mx-auto w-full px-6 flex-grow flex flex-col justify-center pb-20">
        <div className="space-y-12">
          {/* Progress Indicator */}
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-700 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
               <span className="text-indigo-400 font-black text-xs uppercase tracking-[0.2em] opacity-80">Question {currentStep + 1} of 20</span>
               <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
                 {QUESTIONS[currentStep].question}
               </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {QUESTIONS[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option)}
                  className={`relative p-8 rounded-[2rem] border-2 text-left group transition-all duration-500 ${
                    selectedOption === option
                      ? "bg-indigo-600 border-white shadow-2xl shadow-indigo-600/30 scale-[1.02]"
                      : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/[0.08]"
                  }`}
                >
                  <div className="flex items-center gap-5">
                      <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center text-sm font-black transition-all ${
                          selectedOption === option ? "border-white bg-white text-indigo-600" : "border-white/10 text-gray-500 group-hover:border-white/30"
                      }`}>
                          {String.fromCharCode(65 + idx)}
                      </div>
                      <span className={`text-xl font-bold ${selectedOption === option ? "text-white" : "text-gray-300 group-hover:text-white"}`}>
                        {option}
                      </span>
                  </div>
                  {selectedOption === option && (
                      <div className="absolute top-4 right-4 text-white text-xl">✨</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-end">
          <button
            onClick={handleNext}
            disabled={!selectedOption}
             className="relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:scale-105 transition-transform duration-500 rounded-3xl" />
            <div className={`relative px-16 py-6 font-black rounded-3xl transition-all active:scale-[0.98] ${
                 selectedOption ? "text-white" : "text-white/20"
            }`}>
                 {currentStep === QUESTIONS.length - 1 ? "FINISH CHALLENGE" : "CONFIRM & NEXT"}
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}
