import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/50 transition-colors">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full shrink-0">
        {icon ? (
          <img
            src={icon}
            alt={title ?? ""}
            className="w-6 h-6 object-contain"
          />
        ) : (
          <LuUtensils className="text-gray-500" />
        )}
      </div>
      <div className="flex-1 min-w-0 flex items-center justify-between gap-3">
        <div>
          <p className="font-medium text-gray-800 truncate">{title ?? "—"}</p>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {!hideDeleteBtn && typeof onDelete === "function" && (
            <button
              type="button"
              className="text-red-500 hover:text-red-700 p-1"
              onClick={onDelete}
              aria-label="Delete"
            >
              <LuTrash2 size={18} />
            </button>
          )}

          <h6
            className={`font-medium ${type === "income" ? "text-green-500" : "text-red-500"}`}
          >
            {type === "income" ? "+" : "-"}${Number(amount).toLocaleString()}
          </h6>
          {type === "income" ? (
            <LuTrendingUp className="text-green-500 shrink-0" size={18} />
          ) : (
            <LuTrendingDown className="text-red-500 shrink-0" size={18} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
