import { FlatList, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ExpenseCard from "../components/ExpenseCard";
import Summary from "../components/Summary";
import { Card, Divider, Provider, Portal } from "react-native-paper";
import EditExpenseModal from "./EditExpenseModal";
import {
  getSummaryBetweenTwoDates,
  getAllExpensesAmount,
} from "../utils/Expenses";
import { useLayoutEffect } from "react";
const ExpensesScreen = ({ days = 0, summaryText, expenses, children }) => {
  const [editExpenseModal, setEditExpenseModal] = useState(false);
  const [editedItem, setEditedItem] = useState({});
  const [amount, setAmount] = useState(0);
  useLayoutEffect(() => {
    if (days > 0) {
      let endDate = new Date();
      let startDate = new Date();
      startDate.setDate(endDate.getDate() - days);
      setAmount(getSummaryBetweenTwoDates(expenses, startDate, endDate));
    } else {
      setAmount(getAllExpensesAmount(expenses));
    }
  });
  function editItem(item) {
    setEditedItem(item);
    setEditExpenseModal(true);
  }
  return (
    <Provider>
      <Portal>
        <EditExpenseModal
          item={editedItem}
          hideModal={setEditExpenseModal.bind(this, false)}
          modalShown={editExpenseModal}
        />
        {!editExpenseModal && (
          <View style={styles.rootContainer}>
            {children}
            <Summary text={summaryText} amount={amount} />
            <View style={{ flex: 1, marginTop: 30 }}>
              <FlatList
                style={{ flex: 1 }}
                data={expenses}
                renderItem={({ item }) => (
                  <>
                    <ExpenseCard
                      amount={item.amount}
                      title={item.description}
                      date={item.date}
                      onPress={editItem.bind(this, item)}
                    />
                  </>
                )}
              />
            </View>
          </View>
        )}
      </Portal>
    </Provider>
  );
};

export default ExpensesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 16,
    marginTop: 30,
  },
});
