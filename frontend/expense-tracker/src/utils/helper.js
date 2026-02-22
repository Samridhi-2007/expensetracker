import moment from "moment";
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};
export const getInitials = (fullName) => {
  if (!fullName || typeof fullName !== "string") return "";

  const names = fullName.trim().split(" ").filter(Boolean);

  if (names.length === 0) return "";

  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }

  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

export const addThousandSeparator = (num) => {
  if (num === null || num === undefined) return "";
  const n = Number(num);
  if (isNaN(n)) return "";

  const [integerPart, fractionalPart] = n.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData = (transactions) => {
  if (!Array.isArray(transactions)) return [];
  return transactions.map((item) => ({
    category: item.category ?? "—",
    amount: item.amount ?? 0,
  }));
};

/**
 * Group last-30-days expense transactions by category and sum amounts.
 * Use for "Last 30 Days Expenses" chart (one bar per category).
 */
export const prepareLast30DaysExpenseChartData = (transactions) => {
  if (!Array.isArray(transactions) || transactions.length === 0) return [];
  const byCategory = {};
  transactions.forEach((item) => {
    const cat = item.category?.trim() || "Other";
    byCategory[cat] = (byCategory[cat] || 0) + Number(item.amount || 0);
  });
  return Object.entries(byCategory)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
};

export const prepareIncomeBarChartData = (transactions) => {
  const sortedData = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );
  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    source: item?.source,
  }));

  return chartData;
};
