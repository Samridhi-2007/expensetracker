import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";
import { addThousandSeparator } from "../../utils/helper";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

const FinanceOverview = ({ totalBalance = 0, totalIncome = 0, totalExpense = 0 }) => {
  const balance = Number(totalBalance) || 0;
  const income = Number(totalIncome) || 0;
  const expense = Number(totalExpense) || 0;

  const balanceData = [
    { name: "Total Balance", amount: balance },
    { name: "Total Income", amount: income },
    { name: "Total Expense", amount: expense },
  ];

  const hasAnyValue = balance !== 0 || income !== 0 || expense !== 0;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold">Financial Overview</h5>
      </div>

      {hasAnyValue ? (
        <CustomPieChart
          data={balanceData}
          label="Total Balance"
          totalAmount={`$${addThousandSeparator(balance)}`}
          colors={COLORS}
          showTextAnchor
        />
      ) : (
        <div className="h-[300px] flex items-center justify-center text-gray-500 text-sm">
          Add income or expense to see overview
        </div>
      )}
    </div>
  );
};

export default FinanceOverview;
