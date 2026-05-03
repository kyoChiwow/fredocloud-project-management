import GoalChart from "@/components/analytics/goalChart";
import StatsCards from "@/components/analytics/statsCards";

export default function AnalyticsPage() {
  const { stats, chart } = useQuery(["analytics"], fetchAnalytics);

  return (
    <div className="space-y-6">
      <StatsCards stats={stats} />
      <GoalChart data={chart} />
    </div>
  );
}