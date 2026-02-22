import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const ExpenseList = ({ transactions = [], onDelete, onDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Expense Categories</h5>
        <button
          type="button"
          className="card-btn flex items-center gap-2"
          onClick={onDownload}
          title="Export to Excel"
        >
          <LuDownload className="text-base" />
          Export Excel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {transactions.length > 0 ? (
          transactions.map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              amount={expense.amount}
              date={
                expense.date
                  ? moment(expense.date).format("Do MMM YYYY")
                  : "No Date"
              }
              icon={expense.icon}
              type="expense"
              onDelete={() => onDelete && onDelete(expense._id)}
            />
          ))
        ) : (
          <p className="text-gray-500">No expenses found</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
