import { StyleSheet, View } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import Colors from "../utils/Colors";
import { useDispatch } from "react-redux";
import { removeExpense, updateExpense } from "../store/expenses";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Modal,
  Button,
  TextInput,
  Text,
  IconButton,
  HelperText,
} from "react-native-paper";
const EditExpenseModal = ({ hideModal, modalShown, item }) => {
  const [amount, setAmount] = useState(item.amount);
  const [description, setDescrption] = useState(item.description);
  const [date, setDate] = useState(new Date().toLocaleString());
  const [show, setShow] = useState(false);
  useEffect(() => {
    setAmount(item.amount);
    setDescrption(item.description);
    setDate(new Date(item.date).toLocaleString());
  }, [modalShown]);
  const dispatch = useDispatch();
  function validateNumber(value) {
    let number = parseInt(value);
    if (number > 0 || value === "") {
      setAmount(value);
    }
  }
  function deleteExpense() {
    hideModal();
    dispatch(
      removeExpense({
        id: item.id,
      })
    );
    setAmount("");
    setDescrption("");
    setDate(new Date().toLocaleDateString());
  }
  function updateExp() {
    dispatch(
      updateExpense({
        id: item.id,
        amount: amount,
        description: description,
        date: date.toLocaleString(),
      })
    );
    setAmount("");
    setDescrption("");
    setDate(new Date().toLocaleDateString());
    hideModal();
  }
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };
  const showMode = (currentMode) => {
    setShow(true);
  };
  function validateInputs(input) {
    if (input === "amount") {
      if (parseInt(amount) <= 0 || amount === "") {
        return true;
      }
    } else if (input === "description") {
      if (description === "") {
        return true;
      }
    } else if (input === "date") {
      if (date === "") {
        return true;
      }
    }
    return false;
  }
  const containerStyle = { backgroundColor: "white", padding: 20 };
  return (
    <Modal
      visible={modalShown}
      onDismiss={hideModal}
      dismissable={false}
      contentContainerStyle={containerStyle}
    >
      <View>
        <IconButton
          icon="close"
          iconColor="black"
          size={20}
          onPress={hideModal}
          style={{ alignSelf: "flex-end" }}
        />
        <Text style={{ fontSize: 20, textAlign: "center" }}>#{item.id}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder="Amount"
            value={amount}
            onChangeText={validateNumber}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            size={20}
            animationColors={[Colors.secondary100, Colors.secondary300]}
            label="Amount"
            mode="outlined"
          />
          <HelperText type="error" visible={validateInputs("amount")}>
            Amount is invalid!
          </HelperText>
        </View>
        <View style={{ flex: 2, marginHorizontal: 10 }}>
          <TextInput
            showSoftInputOnFocus={false}
            placeholder="Date"
            value={date.toLocaleString()}
            size={20}
            onPressIn={showMode}
            animationColors={[Colors.secondary100, Colors.secondary300]}
            label="Date"
            mode="outlined"
          />
          <HelperText type="error" visible={validateInputs("date")}>
            Date is invalid!
          </HelperText>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date(date)}
              mode="date"
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </View>
      </View>
      <View style={{ margin: 10 }}>
        <TextInput
          style={{ height: 200 }}
          placeholder="Description"
          value={description}
          onChangeText={setDescrption}
          size={20}
          animationColors={[Colors.secondary100, Colors.secondary300]}
          label="Description"
          mode="outlined"
          multiline={true}
        />
        <HelperText type="error" visible={validateInputs("description")}>
          Description is invalid!
        </HelperText>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <Button
            icon="delete"
            mode="contained"
            onPress={deleteExpense}
            color={Colors.secondary400}
          >
            Delete
          </Button>
        </View>
        <View style={styles.button}>
          <Button
            icon="update"
            mode="contained"
            onPress={updateExp}
            color={Colors.secondary400}
          >
            Update
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default EditExpenseModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.secondary500,
    justifyContent: "center",
    padding: 30,
  },
  buttonsContainer: {
    flexDirection: "row",
    margin: 20,
  },
  button: {
    padding: 10,
    flex: 1,
  },
});
