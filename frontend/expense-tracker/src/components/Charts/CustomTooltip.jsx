import React from "react";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow">
        <p className="text-sm font-medium">{payload[0].name}</p>
        <p className="text-sm text-gray-600">${payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
