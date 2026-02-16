import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  const displayValue = value !== undefined && value !== null && value !== "" ? value : "0";
  return (
    <div className="flex gap-6 bg-white p-6 rounded-2xl shadow-md items-center">
      <div
        className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color ?? "bg-primary"} rounded-full drop-shadow-xl shrink-0`}
      >
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <h6 className="text-sm mb-1 text-gray-500">{label}</h6>
        <span className="text-[22px] font-medium">${displayValue}</span>
      </div>
    </div>
  );
};

export default InfoCard;
