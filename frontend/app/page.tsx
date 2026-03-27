"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [showModal, setShowModal] = useState<"signin" | "signup" | null>(null);
  const [formData, setFormData] = useState({ username: "", password: "", email: "", display_name: "" });
  const [message, setMessage] = useState("");

  const api_url = process.env.NEXT_PUBLIC_API_URL || "https://online-quiz-system-backend.onrender.com";

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = showModal === "signin" ? "/api/signin" : "/api/signup";
    try {
      const res = await fetch(`${api_url}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`Success: ${data.message}`);
        setTimeout(() => setShowModal(null), 2000);
      } else {
        setMessage(`Error: ${data.detail}`);
      }
    } catch (err) {
      setMessage("Failed to connect to backend");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white font-sans selection:bg-purple-500/30">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto border-b border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-purple-500/20">Q</div>
          <span className="text-xl font-bold tracking-tight">QuizSystem</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">Leaderboard</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
        </div>
          <div className="flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">How it works</Link>
            <Link href="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Features</Link>
            <Link href="/signin" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">Log In</Link>
            <Link 
              href="/signup" 
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
            >
              Get Started
            </Link>
          </div>
      </nav>
      <main className="relative z-10 max-w-7xl mx-auto px-8 py-24 md:py-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-300 mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          Next-gen Learning Platform
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1]">Challenge your <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 animate-gradient">Intelligence.</span></h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed">The ultimate platform for competitive quizzes and interactive learning. Build, share, and compete in real-time with thousands of users worldwide.</p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link href="/signup" className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 font-bold text-lg shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-all active:scale-95">Create Free Account</Link>
          <button className="px-8 py-4 rounded-full border border-white/10 bg-white/5 font-semibold text-lg hover:bg-white/10 transition-colors">Browse Quizzes</button>
        </div>
        <div className="mt-20 w-full max-w-5xl aspect-video rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-4 shadow-2xl animate-float">
          <div className="w-full h-full rounded-2xl bg-[#0a0a14] overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
            <div className="absolute top-0 left-0 w-full h-12 bg-white/5 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
          </div>
        </div>
      </main>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(null)} />
          <div className="relative w-full max-w-md bg-[#0f0f1a] border border-white/10 rounded-3xl p-8 shadow-2xl animate-scale-in">
            <h2 className="text-3xl font-bold mb-2">{showModal === "signin" ? "Welcome Back" : "Join the Community"}</h2>
            <p className="text-zinc-400 text-sm mb-8">{showModal === "signin" ? "Enter your credentials to continue." : "Set up your account to start learning."}</p>
            <form onSubmit={handleAuth} className="space-y-4">
              {showModal === "signup" && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider ml-1">Email Address</label>
                  <input type="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 focus:ring-4 ring-purple-500/10 transition-all" placeholder="you@example.com" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
              )}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider ml-1">Username</label>
                <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 focus:ring-4 ring-purple-500/10 transition-all" placeholder="johndoe" onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider ml-1">Password</label>
                <input type="password" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 focus:ring-4 ring-purple-500/10 transition-all" placeholder="••••••••" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              </div>
              {message && <p className={`text-sm text-center ${message.startsWith("Error") ? "text-red-400" : "text-emerald-400"}`}>{message}</p>}
              <button type="submit" className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-all active:scale-95">{showModal === "signin" ? "Sign In" : "Create Account"}</button>
            </form>
            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <span className="text-zinc-500 text-sm">{showModal === "signin" ? "Don't have an account?" : "Already have an account?"} <button onClick={() => setShowModal(showModal === "signin" ? "signup" : "signin")} className="text-white font-semibold hover:text-purple-400 underline underline-offset-4">{showModal === "signin" ? "Sign up" : "Log in"}</button></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
