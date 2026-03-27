"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DetailedStatsPage() {
  const [results, setResults] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/signin");
    } else {
      setUser(JSON.parse(storedUser));
      const storedResults = JSON.parse(localStorage.getItem("quiz_results") || "[]");
      // Sort by timestamp descending
      setResults(storedResults.sort((a: any, b: any) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ));
    }
  }, [router]);

  // Calculate Aggregated Stats
  const totalQuizzes = results.length;
  const totalScore = results.reduce((acc, curr) => acc + curr.score, 0);
  const totalPossible = results.reduce((acc, curr) => acc + curr.total, 0);
  const avgAccuracy = totalQuizzes > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

  // Find Top Category
  const categoryStats: any = {};
  results.forEach(r => {
    if (!categoryStats[r.category]) {
      categoryStats[r.category] = { total: 0, score: 0, count: 0 };
    }
    categoryStats[r.category].total += r.total;
    categoryStats[r.category].score += r.score;
    categoryStats[r.category].count += 1;
  });

  let topCategory = "---";
  let bestAvg = -1;
  Object.keys(categoryStats).forEach(cat => {
    const avg = categoryStats[cat].score / categoryStats[cat].total;
    if (avg > bestAvg) {
      bestAvg = avg;
      topCategory = cat;
    }
  });

  if (!user) return <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 font-sans">
      <header className="max-w-6xl mx-auto w-full py-8 flex items-center justify-between">
        <Link href="/dashboard" className="text-sm font-medium text-gray-500 hover:text-white transition-all flex items-center gap-2 group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Dashboard
        </Link>
        <h1 className="text-xl font-bold tracking-tight">Performance Deep Dive</h1>
      </header>

      <main className="max-w-6xl mx-auto w-full space-y-12 pb-24">
        {/* Summary Cards */}
        <section className="grid sm:grid-cols-3 gap-6">
          {[
            { label: "Total Quizzes", value: totalQuizzes, sub: "Completed sessions", color: "from-blue-500/20 to-blue-600/5", border: "border-blue-500/30" },
            { label: "Avg. Accuracy", value: `${avgAccuracy}%`, sub: "Across all subjects", color: "from-green-500/20 to-green-600/5", border: "border-green-500/30" },
            { label: "Top Category", value: topCategory, sub: "Best performing field", color: "from-purple-500/20 to-purple-600/5", border: "border-purple-500/30" },
          ].map((stat, idx) => (
            <div key={idx} className={`p-8 rounded-3xl bg-gradient-to-br ${stat.color} border ${stat.border} space-y-2`}>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">{stat.label}</p>
              <h2 className="text-4xl font-black">{stat.value}</h2>
              <p className="text-sm text-gray-500">{stat.sub}</p>
            </div>
          ))}
        </section>

        {/* History Log */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold">Activity Log</h3>
          
          {results.length === 0 ? (
            <div className="p-12 text-center rounded-3xl border border-white/5 bg-white/2">
              <p className="text-gray-500">No data found. Complete a quiz to see your analytics!</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111]">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 text-gray-400 text-xs font-bold uppercase tracking-widest">
                    <th className="px-8 py-5">Subject</th>
                    <th className="px-8 py-5">Date</th>
                    <th className="px-8 py-5 text-right">Score</th>
                    <th className="px-8 py-5 text-right">Accuracy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {results.map((res, idx) => {
                    const accuracy = Math.round((res.score / res.total) * 100);
                    return (
                      <tr key={idx} className="group hover:bg-white/[0.02] transition-colors">
                        <td className="px-8 py-6 font-bold text-lg">{res.category}</td>
                        <td className="px-8 py-6 text-gray-500 text-sm">
                          {new Date(res.timestamp).toLocaleDateString(undefined, {
                            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </td>
                        <td className="px-8 py-6 text-right font-mono text-gray-300">
                          {res.score} / {res.total}
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="inline-flex items-center gap-4">
                            <span className={`text-sm font-bold ${accuracy >= 80 ? "text-green-400" : accuracy >= 50 ? "text-amber-400" : "text-rose-400"}`}>
                              {accuracy}%
                            </span>
                            <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-1000 ${accuracy >= 80 ? "bg-green-500" : accuracy >= 50 ? "bg-amber-500" : "bg-rose-500"}`}
                                style={{ width: `${accuracy}%` }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
