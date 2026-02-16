import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import InfoCard from "../../components/Cards/InfoCard";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandSeparator } from "../../utils/helper";
import ExpenseTransactions from "../../components/DashBoard/ExpenseTransactions";
import Last30daysExpenses from "../../components/DashBoard/last30daysExpenses";
const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch {
      setDashboardData(
        (prev) =>
          prev ?? {
            totalBalance: 0,
            totalIncome: 0,
            totalExpense: 0,
            recentTransactions: [],
          },
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5">
        {loading && (
          <p className="text-sm text-gray-500 mb-4">Loading dashboard…</p>
        )}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandSeparator(dashboardData?.totalBalance ?? 0)}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandSeparator(dashboardData?.totalIncome ?? 0)}
            color="bg-green-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandSeparator(dashboardData?.totalExpense ?? 0)}
            color="bg-red-500"
          />
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          /> */}
          <ExpenseTransactions
            transaction={dashboardData?.last30daysExpenses?.transaction || []}
            onSeeMore={() => navigate("/expense")}
          />
          <Last30daysExpenses
            data={dashboardData?.last30daysExpenses?.transaction || []}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
