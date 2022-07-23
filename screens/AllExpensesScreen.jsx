import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import ExpensesScreen from "./ExpensesScreen";
const AllExpensesScreen = () => {
  const expenses = useSelector((state) => state.expenses.expenses);
  return <ExpensesScreen summaryText={"All Expenses"} expenses={expenses} />;
};

export default AllExpensesScreen;

const styles = StyleSheet.create({});
