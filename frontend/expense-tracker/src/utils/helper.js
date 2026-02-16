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
  const chartData = transactions.map((item) => ({
    category: item.category,
    amount: item.amount,
  }));
  return chartData;
};
