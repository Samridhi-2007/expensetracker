import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentIncome = ({ transactions, onSeeMore }) => {
  const list = Array.isArray(transactions) ? transactions.slice(0, 5) : [];

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income</h5>
        <button onClick={onSeeMore} className="card-btn inline-flex items-center gap-1">
          See More <LuArrowRight className="text-base" />
        </button>
      </div>
      <div className="mt-4">
        {list.length === 0 ? (
          <p className="text-gray-500 text-sm py-2">No recent income</p>
        ) : (
          list.map((item, index) => (
            <TransactionInfoCard
              key={item._id ?? item.id ?? `income-${index}`}
              title={item.source}
              icon={item.icon}
              date={
                item.date ? moment(item.date).format("Do MMM, YYYY") : ""
              }
              amount={item.amount}
              type="income"
              hideDeleteBtn
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RecentIncome;
