import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({
  data = [],
  label,
  totalAmount,
  colors = [],
  showTextAnchor,
}) => {
  const safeData = Array.isArray(data) ? data : [];
  const safeColors =
    Array.isArray(colors) && colors.length > 0
      ? colors
      : ["#875CF5", "#FA2C37", "#FF6900"];

  if (safeData.length === 0) {
    return null;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={safeData}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {safeData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={safeColors[index % safeColors.length]}
            />
          ))}
        </Pie>
        <Tooltip content={CustomTooltip} />
        <Legend content={CustomLegend} />

        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-25}
              textAnchor="middle"
              fill="#666"
              fontSize="14px"
              dominantBaseline="middle"
              className="text-lg font-bold"
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy={8}
              textAnchor="middle"
              fill="#333"
              fontSize="24px"
              fontWeight="bold"
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
