const Income = require("../models/Income");
const Expense = require("../models/Expense");

const { Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;
    const userObjectId = new Types.ObjectId(String(userId));

    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },

      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const last60DaysIncomeTransactions = await Income.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });
    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );
    const last30DaysExpenseTransactions = await Expense.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );

    const lastTransactions = [
      ...(
        await Income.find({ userId: userObjectId }).sort({ date: -1 }).limit(10)
      ).map((txn) => ({
        ...txn.toObject(),
        type: "income",
      })),
      ...(
        await Expense.find({ userId: userObjectId }).sort({ date: -1 }).limit(10)
      ).map((txn) => ({
        ...txn.toObject(),
        type: "expense",
      })),
    ]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);
    const totalIncomeAmount = totalIncome[0]?.total || 0;
    const totalExpenseAmount = totalExpense[0]?.total || 0;

    res.json({
      totalBalance: totalIncomeAmount - totalExpenseAmount,
      totalIncome: totalIncomeAmount,
      totalExpense: totalExpenseAmount,
      totalExpenses: totalExpenseAmount,
      last30DaysExpenses: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching dashboard data", error: error.message });
  }
};
