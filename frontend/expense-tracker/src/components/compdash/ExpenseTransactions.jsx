import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const ExpenseTransactions = ({ transaction, onSeeMore }) => {
  const list = Array.isArray(transaction) ? transaction.slice(0, 5) : [];

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expenses</h5>
        <button type="button" className="card-btn" onClick={onSeeMore}>
          See More
          <LuArrowRight className="text-base" />
        </button>
      </div>
      <div className="mt-6">
        {list.length === 0 ? (
          <p className="text-gray-500 text-sm py-2">No recent expenses</p>
        ) : (
          list.map((expense, index) => (
            <TransactionInfoCard
              key={expense._id ?? index}
              title={expense.category}
              icon={expense.icon}
              date={
                expense.date
                  ? moment(expense.date).format("Do MMM YYYY")
                  : ""
              }
              amount={expense.amount}
              type="expense"
              hideDeleteBtn
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
