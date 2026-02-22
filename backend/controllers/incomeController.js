const Income = require("../models/Income");
const User = require("../models/User");
const writeXLSX = require("xlsx");
exports.addIncome = async (req, res) => {
  const userId = req.user._id;

  try {
    const { icon, source, amount, date } = req.body;
    if (!source || !amount || !date) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });
    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.getAllIncome = async (req, res) => {
  const userId = req.user._id;
  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.deleteIncome = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  try {
    const deleted = await Income.findOneAndDelete({ _id: id, userId });
    if (!deleted) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user._id;
  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });
    const data = incomes.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));
    const wb = writeXLSX.utils.book_new();
    const ws = writeXLSX.utils.json_to_sheet(data);
    writeXLSX.utils.book_append_sheet(wb, ws, "Incomes");
    writeXLSX.writeFile(wb, "incomes_details.xlsx");
    res.download("incomes_details.xlsx");
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
