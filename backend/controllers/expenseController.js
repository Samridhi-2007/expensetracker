const Expense = require("../models/Expense");
const writeXLSX = require("xlsx");
exports.addExpense = async (req, res) => {
  const userId = req.user._id;

  try {
    const { icon, category, amount, date } = req.body;
    if (!category || !amount || !date) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });
    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.getAllExpenses = async (req, res) => {
  const userId = req.user._id;
  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.deleteExpense = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  try {
    const deleted = await Expense.findOneAndDelete({ _id: id, userId });
    if (!deleted) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user._id;
  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    const data = expenses.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));
    const wb = writeXLSX.utils.book_new();
    const ws = writeXLSX.utils.json_to_sheet(data);
    writeXLSX.utils.book_append_sheet(wb, ws, "Expenses");
    writeXLSX.writeFile(wb, "expenses_details.xlsx");
    res.download("expenses_details.xlsx");
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
