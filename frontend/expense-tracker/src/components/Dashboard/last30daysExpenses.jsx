import React, { useEffect, useState } from "react";
import {
  prepareLast30DaysExpenseChartData,
  addThousandSeparator,
} from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const Last30daysExpenses = ({ data, total }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareLast30DaysExpenseChartData(data);
    setChartData(result);
  }, [data]);

  const hasData = Array.isArray(data) && data.length > 0;
  const displayTotal = total ?? 0;

  return (
    <div className="card col-span-1">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
        <h5 className="text-lg font-semibold">Last 30 Days Expenses</h5>
        {hasData && (
          <p className="text-sm text-gray-600">
            Total:{" "}
            <span className="font-medium text-primary">
              ${addThousandSeparator(displayTotal)}
            </span>
          </p>
        )}
      </div>

      {!hasData ? (
        <div className="h-[300px] flex items-center justify-center text-gray-500 text-sm">
          No expenses in the last 30 days
        </div>
      ) : chartData.length === 0 ? (
        <div className="h-[300px] flex items-center justify-center text-gray-500 text-sm">
          No data to display
        </div>
      ) : (
        <CustomBarChart
          data={chartData}
          xAxisDataKey="category"
          tooltipLabelKey="category"
        />
      )}
    </div>
  );
};

export default Last30daysExpenses;
