import WrapView from "@/components/WrapView";
import { ThemedText } from "@/constants/ThemedText";
import { StyleSheet } from "react-native";

export default function Index() {
  return (
    <WrapView>
      <ThemedText>Hello Mercy</ThemedText>
    </WrapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
