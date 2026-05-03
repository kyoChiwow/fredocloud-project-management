export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card title="Total Goals" value={stats.totalGoals} />
      <Card title="Completed This Week" value={stats.completedThisWeek} />
      <Card title="Overdue" value={stats.overdue} />
    </div>
  );
}