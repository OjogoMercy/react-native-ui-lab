import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { COLORS, SIZES } from "../constants/THEME";

interface WrapViewProps {
  children: React.ReactNode;
  title: string;
  authScreen: boolean;
  headerStyle?: object;
}
const WrapView = ({ children }: WrapViewProps) => {
  return (
    <View style={[styles.container]}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={"transparent"}
      />

      <View style={{}}>{children}</View>
    </View>
  );
};

export default WrapView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.background,
    justifyContent: "center",
    padding: SIZES.padding,
  },
});
