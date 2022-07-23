import { StyleSheet } from "react-native";
import React from "react";
import { Card, Chip } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../utils/Colors";

const Summary = ({ amount, text }) => {
  return (
    <Card elevation={5} style={styles.outerCard}>
      <Card.Title
        title={text}
        right={(props) => (
          <Chip
            style={{ backgroundColor: "#85bb65", marginRight: 20 }}
            textStyle={{ color: "white" }}
            icon={({ size }) => (
              <AntDesign name="arrowup" size={size} color="white" />
            )}
          >
            33%
          </Chip>
        )}
        subtitle={amount + "$"}
      />
    </Card>
  );
};

export default Summary;

const styles = StyleSheet.create({
  outerCard: {
    borderBottomColor: Colors.secondary400,
    borderBottomWidth: 2,
  },
  text: {
    color: "white",
    fontFamily: "open-sans",
  },
});
