"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [formData, setFormData] = useState({ username: "", password: "", email: "", display_name: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const api_url = process.env.NEXT_PUBLIC_API_URL || "https://online-quiz-system-backend.onrender.com";

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${api_url}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify({
          id: data.user_id,
          username: formData.username,
          displayName: formData.display_name || formData.username
        }));
        router.push("/dashboard");
      } else {
        setMessage(`Error: ${data.detail || "Signup failed"}`);
      }
    } catch (err) {
      setMessage("Error: Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white font-sans selection:bg-purple-500/30 flex items-center justify-center p-4">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />

      <div className="relative z-10 w-full max-w-md bg-[#0f0f1a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl animate-scale-in">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
          <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-lg flex items-center justify-center font-bold text-sm shadow-lg group-hover:scale-110 transition-transform">Q</div>
          <span className="font-bold tracking-tight text-zinc-400 group-hover:text-white transition-colors">Back to Home</span>
        </Link>
        
        <h2 className="text-4xl font-black tracking-tight mb-2">Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Community</span></h2>
        <p className="text-zinc-400 text-sm mb-8">Set up your account to start your learning journey.</p>
        
        <form onSubmit={handleSignup} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider ml-1">Email Address</label>
            <input 
              type="email" 
              required 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-purple-500/50 focus:ring-4 ring-purple-500/10 transition-all text-sm" 
              placeholder="you@example.com" 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider ml-1">Username</label>
              <input 
                type="text" 
                required 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-purple-500/50 focus:ring-4 ring-purple-500/10 transition-all text-sm" 
                placeholder="johndoe" 
                onChange={(e) => setFormData({ ...formData, username: e.target.value })} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider ml-1">Display Name</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-purple-500/50 focus:ring-4 ring-purple-500/10 transition-all text-sm" 
                placeholder="John" 
                onChange={(e) => setFormData({ ...formData, display_name: e.target.value })} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider ml-1">Password</label>
            <input 
              type="password" 
              required 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-purple-500/50 focus:ring-4 ring-purple-500/10 transition-all text-sm" 
              placeholder="••••••••" 
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
            />
          </div>

          {message && (
            <p className={`text-sm text-center font-medium animate-fade-in ${message.startsWith("Error") ? "text-red-400" : "text-emerald-400"}`}>
              {message}
            </p>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full relative group overflow-hidden bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
          >
            <span className={isLoading ? "opacity-0" : "opacity-100"}>Create Account</span>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              </div>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-zinc-500 text-sm">
            Already have an account?{" "}
            <Link href="/" className="text-white font-semibold hover:text-purple-400 underline underline-offset-4 decoration-white/20 hover:decoration-purple-400/50 transition-all">
              Sign in here
            </Link>
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}
