import { createSlice } from "@reduxjs/toolkit";

const expenses = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload.expense);
    },
    removeExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (item) => item.id !== action.payload.id
      );
    },
    updateExpense: (state, action) => {
      const expense = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      state.expenses[expense].amount = action.payload.amount;
      state.expenses[expense].description = action.payload.description;
      state.expenses[expense].date = action.payload.date;
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload.expenses.reverse();
    },
  },
});

export const addExpense = expenses.actions.addExpense;
export const setExpenses = expenses.actions.setExpenses;
export const removeExpense = expenses.actions.removeExpense;
export const updateExpense = expenses.actions.updateExpense;
export default expenses.reducer;
