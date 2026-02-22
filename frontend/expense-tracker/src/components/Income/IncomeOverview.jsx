import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

import CustomBarChart from "../Charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../../utils/helper";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);
    return () => {};
  }, [transactions]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Income Overview</h2>
        <p>Track your income sources over time</p>
        <button
          onClick={onAddIncome}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          <LuPlus />
          Add Income
        </button>
      </div>
      <CustomBarChart
        data={chartData}
        xAxisDataKey="month"
        tooltipLabelKey="source"
      />
    </div>
  );
};

export default IncomeOverview;
