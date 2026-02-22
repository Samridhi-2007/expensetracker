import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({
  data,
  xAxisDataKey = "month",
  tooltipLabelKey = "category",
}) => {
  const getBarColor = (index) => {
    return index % 2 === 0 ? "#875cf5" : "#cfbefb";
  };
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const label = item[tooltipLabelKey] ?? item.category ?? item.source ?? "";
      return (
        <div className="bg-white p-2 shadow-md rounded border border-gray-300">
          <p className="text-sm text-purple-700">{label}</p>
          <p className="text-sm text-gray-700">
            Amount:{" "}
            <span className="text-sm font-medium text-gray-900">
              ${item.amount}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data ?? []}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={xAxisDataKey}
            tick={{ fontSize: 12, fill: "#555" }}
          />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={CustomTooltip} />

          <Bar
            dataKey="amount"
            fill="#875cf5"
            radius={[10, 10, 0, 0]}
            activeDot={{ r: 8, fill: "#cfbefb" }}
            activeStyle={{ fill: "#875cf5" }}
          >
            {(data ?? []).map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
