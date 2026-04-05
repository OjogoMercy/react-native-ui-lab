import PrimaryButton from "@/components/PrimaryButton";
import database, { Destination } from "@/constants/Database";
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH, SIZES } from "@/constants/THEME";
import { ThemedText } from "@/constants/ThemedText";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Animated,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

const Backdrop = ({ scrollX }: { scrollX: Animated.Value }) => {
  return (
    <View style={styles.backdrop}>
      <FlatList
        data={database}
        scrollEnabled={false}
        removeClippedSubviews={false}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * SCREEN_WIDTH * 0.65,
            index * SCREEN_WIDTH * 0.65,
            (index + 1) * SCREEN_WIDTH * 0.65,
          ];
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [SCREEN_WIDTH, 0, -SCREEN_WIDTH],
            extrapolate: "clamp",
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1, 0],
            extrapolate: "clamp",
          });
          return (
            <MaskedView
              style={{ position: "absolute" }}
              maskElement={
                <Animated.View
                  style={{
                    backgroundColor: "black",
                    width: SCREEN_WIDTH,
                    opacity,
                    height: SCREEN_HEIGHT * 0.65,
                  }}
                />
              }
            >
              <Animated.View style={{ transform: [{ translateX }] }}>
                <Image
                  source={item.backdrop}
                  style={{
                    height: SCREEN_HEIGHT * 0.65,
                    width: SCREEN_WIDTH,
                  }}
                />
              </Animated.View>
              <LinearGradient
                colors={["rgba(0, 0, 0, 0)", "white"]}
                style={{
                  position: "absolute",
                  width: SCREEN_WIDTH,
                  height: SCREEN_HEIGHT * 0.25,
                  bottom: 0,
                }}
              />
            </MaskedView>
          );
        }}
      />
    </View>
  );
};
export default function Index() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const spacerWidth = (SCREEN_WIDTH - SCREEN_WIDTH * 0.65) / 2;
  const dataWithSpacers = [{ key: "left" }, ...database, { key: "right" }];
  function isSpacer(item: { key: string }): item is Destination {
    return "poster" in item;
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
        translucent
      />

      <Backdrop scrollX={scrollX} />
      <Animated.FlatList
        data={dataWithSpacers}
        horizontal
        contentContainerStyle={{
          paddingVertical: SIZES.h1 * 2,
          marginTop: SCREEN_HEIGHT * 0.1,
        }}
        snapToInterval={SCREEN_WIDTH * 0.65}
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          const adjustedIndex = index - 1;
          const cardWidth = SCREEN_WIDTH * 0.65;
          const inputRange = [
            (adjustedIndex - 1) * cardWidth,
            adjustedIndex * cardWidth,
            (adjustedIndex + 1) * cardWidth,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
          });
          if (!isSpacer(item)) {
            return <View style={{ width: spacerWidth }} />;
          }

          return (
            <Animated.View
              style={[styles.card, { transform: [{ translateY }] }]}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: SIZES.h1,
                  height: "90%",
                  width: "90%",
                  backgroundColor: "white",
                }}
              >
                <Image source={item.poster} style={styles.poster} />
                <ThemedText type="text3bold">{item.title}</ThemedText>
                <ThemedText type="text5" style={{ textAlign: "center" }}>
                  {item.description}
                </ThemedText>
              </View>
            </Animated.View>
          );
        }}
      />
      <View
        style={{
          alignItems: "center",
          marginTop: SIZES.h3,
          padding: SIZES.h2,
          width: SCREEN_WIDTH,
        }}
      >
        <PrimaryButton
          title="Explore"
          style={{ width: SCREEN_WIDTH * 0.9 }}
          onPress={undefined}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: SCREEN_HEIGHT * 0.55,
    width: SCREEN_WIDTH * 0.65,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  poster: {
    height: "67%",
    width: "90%",
    borderRadius: SIZES.h1,
    marginBottom: SIZES.h5,
    resizeMode: "cover",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.65,
  },
});
