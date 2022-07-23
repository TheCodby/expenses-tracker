import { StyleSheet, View } from "react-native";
import React from "react";
import { useState } from "react";
import Colors from "../utils/Colors";
import { useDispatch } from "react-redux";
import { addExpense } from "../store/expenses";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Modal,
  Button,
  TextInput,
  IconButton,
  HelperText,
} from "react-native-paper";
import { storeExpense } from "../utils/http";
const ExpenseModal = ({ hideModal, modalShown }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescrption] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  // Input Errors
  const [amountError, setAmountError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const dispatch = useDispatch();
  function validateNumber(value) {
    let number = parseInt(value);
    if (number > 0 || value === "") {
      setAmount(value);
      setAmountError(false);
    } else {
      setAmountError(true);
    }
  }
  function validateDescription(value) {
    if (value !== "") {
      setDescriptionError(false);
    } else {
      setDescriptionError(true);
    }
    setDescrption(value);
  }
  function validateDate(event, value) {
    if (value !== "" && new Date(value) <= new Date()) {
      setDate(value);
      setDateError(false);
    } else {
      setDateError(true);
    }
    setShow(false);
  }
  //
  async function addNewExpense() {
    const id = await storeExpense({
      amount: amount,
      date: date.toLocaleString(),
      description: description,
    });
    console.log(id);
    dispatch(
      addExpense({
        expense: {
          id: id,
          amount: amount,
          date: date.toLocaleString(),
          description: description,
        },
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
      dismissable={false}
      onDismiss={hideModal}
      contentContainerStyle={containerStyle}
    >
      <IconButton
        icon="close"
        iconColor="black"
        size={20}
        onPress={hideModal}
        style={{ alignSelf: "flex-end" }}
      />
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
          <HelperText type="error" visible={amountError}>
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
          <HelperText type="error" visible={dateError}>
            Date is invalid!
          </HelperText>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date(date)}
              mode="date"
              is24Hour={true}
              onChange={validateDate}
              maximumDate={new Date()}
            />
          )}
        </View>
      </View>
      <View style={{ margin: 10 }}>
        <TextInput
          style={{ height: 200 }}
          placeholder="Description"
          value={description}
          onChangeText={validateDescription}
          size={20}
          animationColors={[Colors.secondary100, Colors.secondary300]}
          label="Description"
          mode="outlined"
          multiline={true}
        />
        <HelperText type="error" visible={descriptionError}>
          Description is invalid!
        </HelperText>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <Button
            icon="plus"
            mode="contained"
            onPress={addNewExpense}
            color={Colors.secondary400}
          >
            Add
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default ExpenseModal;

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
