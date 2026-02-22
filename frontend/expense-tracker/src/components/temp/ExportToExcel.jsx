import React, { useState } from "react";
import { LuDownload, LuWalletMinimal, LuHandCoins } from "react-icons/lu";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "react-hot-toast";

const downloadBlob = (blob, filename) => {
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

const ExportToExcel = () => {
  const [downloading, setDownloading] = useState(null);

  const handleExportIncome = async () => {
    setDownloading("income");
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: "blob",
      });
      downloadBlob(response.data, "income_details.xlsx");
      toast.success("Income export downloaded");
    } catch {
      toast.error("Income export failed. Try again.");
    } finally {
      setDownloading(null);
    }
  };

  const handleExportExpense = async () => {
    setDownloading("expense");
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        { responseType: "blob" },
      );
      downloadBlob(response.data, "expense_details.xlsx");
      toast.success("Expense export downloaded");
    } catch {
      toast.error("Expense export failed. Try again.");
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold flex items-center gap-2">
          <LuDownload className="text-primary" size={20} />
          Export to Excel
        </h5>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Download your income or expense records as Excel (.xlsx) for reports or
        backup.
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleExportIncome}
          disabled={downloading !== null}
          className="card-btn flex items-center gap-2 px-4 py-2.5 border border-green-200 bg-green-50/50 hover:bg-green-50 text-green-700 disabled:opacity-60"
          title="Download income records as Excel"
        >
          <LuWalletMinimal size={18} />
          {downloading === "income" ? "Downloading…" : "Income (Excel)"}
        </button>
        <button
          type="button"
          onClick={handleExportExpense}
          disabled={downloading !== null}
          className="card-btn flex items-center gap-2 px-4 py-2.5 border border-red-200 bg-red-50/50 hover:bg-red-50 text-red-700 disabled:opacity-60"
          title="Download expense records as Excel"
        >
          <LuHandCoins size={18} />
          {downloading === "expense" ? "Downloading…" : "Expense (Excel)"}
        </button>
      </div>
    </div>
  );
};

export default ExportToExcel;
