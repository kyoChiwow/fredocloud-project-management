import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function GoalChart({ data }) {
  return (
    <BarChart width={500} height={300} data={data}>
      <XAxis dataKey="status" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#3b82f6" />
    </BarChart>
  );
}