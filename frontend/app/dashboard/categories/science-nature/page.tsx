"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ScienceNatureCategoryPage() {
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

  if (!user) return <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Navigation Header */}
      <nav className="border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center font-bold text-xl group-hover:border-indigo-500/50 transition-all">
              ←
            </div>
            <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
              Back to Dashboard
            </span>
          </Link>

          <div className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400 uppercase tracking-widest">
            Science & Nature
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="mb-16">
          <h1 className="text-5xl font-black mb-4 tracking-tight">Science & Nature</h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Explore the mysteries of the universe, from the depths of the ocean to the far reaches of space.
          </p>
        </section>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Grade 10 Science Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
              <span className="text-7xl font-bold italic">10th</span>
            </div>
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/20">
                🧬
              </div>
              <h3 className="text-2xl font-bold">Grade 10 Science</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Comprehensive 20 MCQ quiz covering Physics, Chemistry, and Biology essentials for 10th-grade students.
              </p>
              <div className="flex items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                <span>20 Questions</span>
                <span>•</span>
                <span>15 Minutes</span>
              </div>
            </div>
            <Link
              href="/dashboard/categories/science-nature/quiz"
              className="block w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-center rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98] relative z-10"
            >
              Start Quiz
            </Link>
          </div>

          {/* Quick Quiz Card (Old One) */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6 group hover:border-white/20 transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl">
                🔭
              </div>
              <h3 className="text-2xl font-bold">General Quiz</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                A quick 5-question jump-start to refresh your basic science facts.
              </p>
              <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span>5 Questions</span>
                <span>•</span>
                <span>3 Minutes</span>
              </div>
            </div>
            <button
               className="w-full py-4 bg-white/10 hover:bg-white/20 text-center rounded-2xl font-bold transition-all disabled:opacity-50 cursor-not-allowed"
               disabled
            >
              Coming Soon
            </button>
          </div>

          {/* Locked Category */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-6 opacity-50 relative grayscale">
             <div className="absolute inset-0 flex items-center justify-center z-20">
                <span className="text-4xl">🔒</span>
             </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-2xl">
                🌿
              </div>
              <h3 className="text-2xl font-bold">Plant Biology</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Deep dive into the world of botany and photosynthesis.
              </p>
            </div>
            <button className="w-full py-4 bg-white/5 rounded-2xl font-bold cursor-not-allowed" disabled>
              Locked
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
