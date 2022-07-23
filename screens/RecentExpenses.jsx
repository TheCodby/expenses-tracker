import React, { useState, useEffect } from "react";
import ExpensesScreen from "./ExpensesScreen";
import { useDispatch, useSelector } from "react-redux";
import { getExpensesBetweenTwoDates } from "../utils/Expenses";
import { View } from "react-native";
import ExpenseModal from "./ExpenseModal";
import Text from "../components/ui/Text";
import { Portal, Provider, IconButton } from "react-native-paper";
import { fetchExpenses } from "../utils/http";
import { setExpenses } from "../store/expenses";

const RecentExpenses = ({ days = 7 }) => {
  const [addExpenseVisible, setAddExpenseVisible] = useState(false);
  const [fetchedExpenses, setFetchedExpenses] = useState([]);
  const expenses = useSelector((state) => state.expenses.expenses);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getExpenses() {
      const expenses = await fetchExpenses();
      dispatch(
        setExpenses({
          expenses: fetchedExpenses,
        })
      );
      setFetchedExpenses(expenses);
    }
    getExpenses();
  }, []);
  let endDate = new Date();
  let startDate = new Date();
  startDate.setDate(endDate.getDate() - days);
  const lastDaysExpenses = getExpensesBetweenTwoDates(
    expenses,
    startDate,
    endDate
  );
  return (
    <Provider>
      <Portal>
        <ExpenseModal
          modalShown={addExpenseVisible}
          hideModal={setAddExpenseVisible.bind(this, false)}
        />
        {!addExpenseVisible && (
          <ExpensesScreen
            summaryText={"Last 7-days expenses"}
            days={7}
            expenses={lastDaysExpenses}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>
                Good morning, <Text style={{ fontWeight: "bold" }}>Ahmed</Text>
              </Text>
              <IconButton
                icon="plus-circle-outline"
                iconColor="black"
                size={24}
                onPress={setAddExpenseVisible.bind(this, true)}
              />
            </View>
          </ExpensesScreen>
        )}
      </Portal>
    </Provider>
  );
};

export default RecentExpenses;
