import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";

interface Props {
  data: number[];
  color: string;
}

export default function SparklineTrend({ data, color }: Props) {
  const chartData = data.map((v, i) => ({ i, v }));
  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={chartData}>
        <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
        <Line
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={2}
          dot={false}
          isAnimationActive={true}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}