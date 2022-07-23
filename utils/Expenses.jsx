export function getSummaryBetweenTwoDates(expenses, startDate, endDate) {
  let amount = 0;
  expenses.map((value, key) => {
    if (new Date(value.date) <= endDate && new Date(value.date) >= startDate) {
      amount += parseInt(value.amount);
    }
  });
  return amount;
}
export function getAllExpensesAmount(expenses) {
  let amount = 0;
  expenses.map((value, key) => {
    amount += parseInt(value.amount);
  });
  return amount;
}
export function getExpensesBetweenTwoDates(expenses, startDate, endDate) {
  return expenses.filter((value) => {
    return new Date(value.date) <= endDate && new Date(value.date) >= startDate;
  });
}
