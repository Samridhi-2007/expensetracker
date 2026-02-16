import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";

const Income = () => {
  useUserAuth();
  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5">
        <h2 className="text-xl font-semibold text-gray-800">Income</h2>
        <p className="text-gray-500 mt-1">Manage your income entries here.</p>
      </div>
    </DashboardLayout>
  );
};

export default Income;
