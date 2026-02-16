import React from "react";
import { useEffect } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";

const last30daysExpenses = ({ data }) => {
  const [chartData, setChartData] = React.useState([]);
  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);

    return () => {};
  }, [data]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expenses</h5>
      </div>
    </div>
  );
};

export default last30daysExpenses;
