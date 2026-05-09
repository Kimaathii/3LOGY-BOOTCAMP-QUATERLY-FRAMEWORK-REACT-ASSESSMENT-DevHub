import { useState, useEffect } from "react";
import dashboardService from "../services/dashboardService";
import StatCard from "../components/statCard";
import { FileText, BookOpen, CheckSquare } from 'lucide-react';

function DashboardPage() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       const getStats = async () => {
            const dashboardStats = await dashboardService.getStats();
            setStats(dashboardStats);
            setLoading(false);
        }
        getStats();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center min-h-[calc(100vh-64px)] text-white">Loading...</div>;
    }

    if (!stats) {
        return <div className="flex items-center justify-center min-h-[calc(100vh-64px)] text-white">Error loading dashboard</div>;
    }

    // Transform API response into StatCard format
    const statCards = [
        { title: "Snippets", count: stats.totals.snippets, icon: FileText },
        { title: "Resources", count: stats.totals.resources, icon: BookOpen },
        { title: "Tasks", count: stats.totals.tasks, icon: CheckSquare }
    ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400 mb-8">Welcome to DevShelf Dashboard</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <StatCard key={index} title={stat.title} count={stat.count} icon={stat.icon} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
