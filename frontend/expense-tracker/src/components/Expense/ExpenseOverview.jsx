import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareExpenseBarChartData } from "../../utils/helper";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(transactions || []);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Expense Overview</h2>
        <p className="text-gray-500 text-sm hidden sm:block">
          Track your expenses by category
        </p>
        <button
          type="button"
          onClick={onAddExpense}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-violet-600 transition-colors text-sm font-medium"
        >
          <LuPlus size={18} />
          Add Expense
        </button>
      </div>
      <CustomBarChart
        data={chartData}
        xAxisDataKey="category"
        tooltipLabelKey="category"
      />
    </div>
  );
};

export default ExpenseOverview;
