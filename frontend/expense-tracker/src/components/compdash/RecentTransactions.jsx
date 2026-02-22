import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentTransactions = ({ transactions, onSeeMore }) => {
  const list = Array.isArray(transactions) ? transactions.slice(0, 10) : [];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-lg font-semibold">Recent Transactions</h5>
        <button
          type="button"
          onClick={onSeeMore}
          className="text-primary font-medium hover:underline inline-flex items-center gap-1"
        >
          See More <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-4 space-y-1">
        {list.length === 0 ? (
          <p className="text-gray-500 text-sm py-4">No recent transactions</p>
        ) : (
          list.map((item, index) => {
            const title =
              item.type === "expense"
                ? item.category || "Expense"
                : item.source || "Income";
            const dateStr = item.date
              ? moment(item.date).format("Do MMM YYYY")
              : "";
            const amount = Number(item.amount) || 0;
            return (
              <TransactionInfoCard
                key={item._id ?? item.id ?? `tx-${index}`}
                title={title}
                icon={item.icon}
                date={dateStr}
                amount={amount}
                type={item.type}
                hideDeleteBtn
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
