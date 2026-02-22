import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const IncomeList = ({ transactions = [], onDelete, onDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Income Source</h5>

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
          transactions.map((income) => (
            <TransactionInfoCard
              key={income._id} // ✅ fixed
              title={income.source}
              amount={income.amount}
              date={
                income.date
                  ? moment(income.date).format("Do MMM YYYY")
                  : "No Date"
              }
              icon={income.icon}
              type="income"
              onDelete={() => onDelete && onDelete(income._id)} // ✅ safe
            />
          ))
        ) : (
          <p className="text-gray-500">No Income Found</p>
        )}
      </div>
    </div>
  );
};

export default IncomeList;
