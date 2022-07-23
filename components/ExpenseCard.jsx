import { StyleSheet, View } from "react-native";
import Text from "../components/ui/Text";
import React from "react";
import Colors from "../utils/Colors";
import { TouchableRipple, Card } from "react-native-paper";
const ExpenseCard = ({ title, date, amount, onPress }) => {
  return (
    <Card style={styles.outerCard}>
      <TouchableRipple onPress={onPress} rippleColor="#fff">
        <Card.Content style={styles.cardContainer}>
          <View style={styles.description}>
            <Text
              style={{
                fontFamily: "open-sans",
                textAlign: "left",
                fontWeight: "bold",
                color: "white",
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                fontFamily: "open-sans",
                fontSize: 13,
                color: "white",
              }}
            >
              {date}
            </Text>
          </View>
          <View style={styles.amount}>
            <Text
              style={{
                color: "#94d170",
                fontFamily: "open-sans",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              {amount}$
            </Text>
          </View>
        </Card.Content>
      </TouchableRipple>
    </Card>
  );
};

export default ExpenseCard;

const styles = StyleSheet.create({
  outerCard: {
    backgroundColor: Colors.secondary400,
    marginVertical: 10,
    borderRadius: 25,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 32,
    padding: 20,
    alignItems: "center",
  },
  description: {
    flex: 3,
  },
  amount: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
  },
});
