import WrapView from "@/components/WrapView";
import database from "@/constants/Database";
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH, SIZES } from "@/constants/THEME";
import { ThemedText } from "@/constants/ThemedText";
import React from "react";
import { FlatList, Image, StatusBar, StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <WrapView>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={COLORS.background}
      />
      <ThemedText style={{ marginTop: 100 }}>Hello Mercy</ThemedText>
      <FlatList
        data={database}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={styles.card}>
              <Image source={item.poster} style={styles.poster} />
              <ThemedText type="text3bold">{item.title}</ThemedText>
              <ThemedText type="text5" style={{ textAlign: "center" }}>
                {item.description}
              </ThemedText>
            </View>
          );
        }}
      />
    </WrapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    height: SCREEN_HEIGHT * 0.5,
    width: SCREEN_WIDTH * 0.6,
    margin: SIZES.h5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.radius,
  },
  poster: {
    height: "80%",
    width: "90%",
    borderRadius: SIZES.padding,
    marginBottom: SIZES.h5,
  },
});
