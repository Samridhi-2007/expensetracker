import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

const isImageIcon = (icon) =>
  typeof icon === "string" &&
  (icon.startsWith("http://") ||
    icon.startsWith("https://") ||
    icon.startsWith("data:"));

const TransactionInfoCard = ({ title, icon, date, amount, type, onDelete }) => {
  const displayTitle = title ?? "—";
  const displayAmount = Number(amount || 0).toLocaleString();

  return (
    <div className="flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/50 transition-colors">
      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center text-xl bg-gray-100 rounded-full shrink-0">
        {icon ? (
          isImageIcon(icon) ? (
            <img
              src={icon}
              alt={displayTitle}
              className="w-6 h-6 object-contain"
            />
          ) : (
            <span className="text-2xl leading-none">{icon}</span>
          )
        ) : (
          <LuUtensils className="text-gray-500" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="font-medium text-gray-800">{displayTitle}</p>
          <p className="text-sm text-gray-500">{date}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* ✅ Delete Button */}
          {typeof onDelete === "function" && (
            <button
              type="button"
              onClick={onDelete}
              className="text-red-500 hover:text-red-700 transition"
            >
              <LuTrash2 size={18} />
            </button>
          )}

          {/* Amount */}
          <h6
            className={`font-medium ${
              type === "income" ? "text-green-500" : "text-red-500"
            }`}
          >
            {type === "income" ? "+" : "-"}${displayAmount}
          </h6>

          {/* Trend Icon */}
          {type === "income" ? (
            <LuTrendingUp className="text-green-500" size={18} />
          ) : (
            <LuTrendingDown className="text-red-500" size={18} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
