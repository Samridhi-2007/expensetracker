import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";

const Expense = () => {
  useUserAuth();
  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5">
        <h2 className="text-xl font-semibold text-gray-800">Expense</h2>
        <p className="text-gray-500 mt-1">Manage your expense entries here.</p>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
