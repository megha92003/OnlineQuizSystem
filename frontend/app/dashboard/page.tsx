"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/signup");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  if (!user) return <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Navigation Header */}
      <nav className="border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/20">
              Q
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              QuizMaster
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold uppercase">
                {user.displayName?.charAt(0) || user.username?.charAt(0)}
              </div>
              <span className="text-sm font-medium text-gray-300">
                {user.displayName || user.username}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h1 className="text-4xl font-bold mb-2">Welcome back!</h1>
              <p className="text-gray-400">Ready to challenge your knowledge today?</p>
            </section>

            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Explore Categories</h2>
                <Link href="#" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">View All</Link>
              </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/dashboard/categories/science-nature" className="group">
                <div className="p-6 h-full rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-left hover:scale-[1.02] transition-all duration-300">
                  <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform">🔬</span>
                  <h3 className="text-xl font-bold mb-1">Science & Nature</h3>
                  <p className="text-sm text-gray-400">125 Quizzes</p>
                </div>
              </Link>

              {[
                { name: "World History", icon: "🌍", color: "from-amber-500/20 to-orange-500/20", borderColor: "border-amber-500/30", count: "84 Quizzes" },
                { name: "Technology", icon: "💻", color: "from-indigo-500/20 to-purple-500/20", borderColor: "border-indigo-500/30", count: "210 Quizzes" },
                { name: "Arts & Literature", icon: "🎨", color: "from-rose-500/20 to-pink-500/20", borderColor: "border-rose-500/30", count: "56 Quizzes" },
              ].map((category, idx) => (
                <button
                  key={idx}
                  className={`p-6 rounded-2xl bg-gradient-to-br ${category.color} border ${category.borderColor} text-left group hover:scale-[1.02] transition-all duration-300`}
                >
                  <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform">{category.icon}</span>
                  <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-400">{category.count}</p>
                </button>
              ))}
            </div>
            </section>
          </div>

          {/* Sidebar / Stats Area */}
          <div className="space-y-8">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
              <h3 className="text-xl font-bold">Your Performance</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-sm text-gray-400">Quizzes Taken</div>
                  <div className="text-xl font-bold">0</div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-sm text-gray-400">Avg. Score</div>
                  <div className="text-xl font-bold text-green-400">-%</div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-sm text-gray-400">Global Rank</div>
                  <div className="text-xl font-bold text-indigo-400">#---</div>
                </div>
              </div>

              <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20">
                View Detailed Stats
              </button>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 space-y-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <div className="text-6xl font-bold">💎</div>
              </div>
              <h3 className="text-xl font-bold relative z-10">Upgrade to Pro</h3>
              <p className="text-indigo-100 text-sm opacity-90 relative z-10">Get access to exclusive quizzes and advanced analytics.</p>
              <button className="px-6 py-2 bg-white text-indigo-700 rounded-xl font-bold text-sm relative z-10 hover:bg-gray-100 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
