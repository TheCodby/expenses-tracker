import { StyleSheet, Text as ReactText, View } from "react-native";
import React from "react";

const Text = (props) => {
  return (
    <ReactText {...props} style={[styles.text, props.style]}>
      {props.children}
    </ReactText>
  );
};

export default Text;

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontFamily: "open-sans",
  },
});
