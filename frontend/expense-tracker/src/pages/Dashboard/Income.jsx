import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/layouts/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import IncomeList from "../../components/Income/IncomeList";
import { toast } from "react-hot-toast";

import DeleteAlert from "../../components/layouts/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";

const Income = () => {
  useUserAuth(); // ✅ ensure user is authenticated
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch {
      setIncomeData([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add Income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    if (!source.trim()) return toast.error("Source is required");
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      return toast.error("Amount should be greater than 0");
    if (!date) return toast.error("Date is required");

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      toast.success("Income Added Successfully");
      setOpenAddIncomeModal(false);
      fetchIncomeDetails();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to add income. Try again.",
      );
    }
  };

  // ✅ Delete Income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(
        API_PATHS.INCOME.DELETE_INCOME({ incomeId: id }),
      );
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income Deleted Successfully");
      fetchIncomeDetails();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete income. Try again.",
      );
    }
  };
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        { responseType: "blob" },
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Income export downloaded");
    } catch {
      toast.error("Download failed. Try again.");
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <IncomeOverview
            transactions={incomeData}
            onAddIncome={() => setOpenAddIncomeModal(true)}
          />

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>

        {/* Add Income Modal */}
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
            <DeleteAlert
              content="Are you sure you want to delete this income?"
              onConfirm={() => deleteIncome(openDeleteAlert.data)}
              onCancel={() => setOpenDeleteAlert({ show: false, data: null })}
            />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
