import PrimaryButton from "@/components/PrimaryButton";
import database, { Destination } from "@/constants/Database";
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH, SIZES } from "@/constants/THEME";
import { ThemedText } from "@/constants/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const BackdropItem = ({
  item,
  index,
  scrollX,
}: {
  item: Destination;
  index: number;
  scrollX: SharedValue<number>;
}) => {
  const CARD_WIDTH = SCREEN_WIDTH * 0.65;
  const BACKDROP_HEIGHT = SCREEN_HEIGHT * 0.7;

  const maskAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value,
      [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH],
      [1, 1, 0],
      Extrapolation.CLAMP,
    );
    return { opacity };
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollX.value,
      [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH],
      [SCREEN_WIDTH, 0, -SCREEN_WIDTH],
      Extrapolation.CLAMP,
    );
    return { transform: [{ translateX }] };
  });

  return (
    <MaskedView
      style={{ position: "absolute" }}
      maskElement={
        <Animated.View
          style={[
            {
              backgroundColor: "black",
              width: SCREEN_WIDTH,
              height: BACKDROP_HEIGHT,
            },
            maskAnimatedStyle,
          ]}
        />
      }
    >
      <Animated.View style={imageAnimatedStyle}>
        <Image
          source={item.backdrop}
          style={{ height: BACKDROP_HEIGHT, width: SCREEN_WIDTH }}
        />
      </Animated.View>
      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "white"]}
        style={{
          position: "absolute",
          width: SCREEN_WIDTH,
          height: BACKDROP_HEIGHT * 0.4,
          bottom: 0,
        }}
      />
    </MaskedView>
  );
};
const Backdrop = ({ scrollX }: { scrollX: SharedValue<number> }) => {
  return (
    <View style={styles.backdrop}>
      <FlatList
        data={database}
        scrollEnabled={false}
        removeClippedSubviews={false}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => (
          <BackdropItem item={item} index={index} scrollX={scrollX} />
        )}
      />
    </View>
  );
};
const CardItem = ({
  item,
  index,
  scrollX,
}: {
  item: Destination;
  index: number;
  scrollX: SharedValue<number>;
}) => {
  const adjustedIndex = index - 1;
  const CARD_WIDTH = SCREEN_WIDTH * 0.65;

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollX.value,
      [
        (adjustedIndex - 1) * CARD_WIDTH,
        adjustedIndex * CARD_WIDTH,
        (adjustedIndex + 1) * CARD_WIDTH,
      ],
      [100, 50, 100],
      Extrapolation.CLAMP,
    );
    return { transform: [{ translateY }] };
  });

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          borderRadius: SIZES.h2,
          height: "90%",
          width: "90%",
          backgroundColor: "white",
        }}
      >
        <Image source={item.poster} style={styles.poster} />
        <ThemedText type="text2bold" style={{ fontWeight: "bold" }}>
          {item.title}
        </ThemedText>

        <ThemedText style={{ textAlign: "center" }}>{item.tagline}</ThemedText>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            marginTop: SIZES.h6 / 2,
          }}
        >
          <Ionicons name="calendar" size={14} color={COLORS.gray} />
          <ThemedText type="text4bold" style={{ color: "gray" }}>
            Best time: "March – May"
          </ThemedText>
        </View>
      </View>
    </Animated.View>
  );
};
export default function Index() {
  const scrollX = useSharedValue(0);
  const spacerWidth = (SCREEN_WIDTH - SCREEN_WIDTH * 0.65) / 2;
  const dataWithSpacers = [{ key: "left" }, ...database, { key: "right" }];
  function isSpacer(item: { key: string }): item is Destination {
    return "poster" in item;
  }
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });
  const CARD_WIDTH = SCREEN_WIDTH * 0.65;
  const PaginationDots = ({ scrollX }: { scrollX: SharedValue<number> }) => {
    return (
      <View style={{ flexDirection: "row", gap: 6, justifyContent: "center" }}>
        {database.map((_, index) => {
          const animatedStyle = useAnimatedStyle(() => {
            const width = interpolate(
              scrollX.value,
              [
                (index - 1) * CARD_WIDTH,
                index * CARD_WIDTH,
                (index + 1) * CARD_WIDTH,
              ],
              [6, 20, 6],
              Extrapolation.CLAMP,
            );
            const opacity = interpolate(
              scrollX.value,
              [
                (index - 1) * CARD_WIDTH,
                index * CARD_WIDTH,
                (index + 1) * CARD_WIDTH,
              ],
              [0.4, 1, 0.4],
              Extrapolation.CLAMP,
            );
            return { width, opacity };
          });
          return (
            <Animated.View
              key={index}
              style={[
                {
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: COLORS.primary,
                },
                animatedStyle,
              ]}
            />
          );
        })}
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
        translucent
      />

      <Backdrop scrollX={scrollX} />
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          backgroundColor: "white",
          padding: SIZES.base / 2,
          zIndex: 1,
          borderRadius: SIZES.base,
          position: "absolute",
          top: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40,
          right: 20,
        }}
      >
        <Ionicons name="location-sharp" size={18} color={COLORS.primary} />
      </TouchableOpacity>
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
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          if (!isSpacer(item)) {
            return <View style={{ width: spacerWidth }} />;
          }
          return <CardItem item={item} index={index} scrollX={scrollX} />;
        }}
      />
      <PaginationDots scrollX={scrollX} />

      <View
        style={{
          alignItems: "center",
          marginTop: SIZES.h3,
          padding: SIZES.h2,
          width: SCREEN_WIDTH,
          overflow: "hidden",
        }}
      >
        <PrimaryButton
          title="Explore"
          style={{ width: SCREEN_WIDTH * 0.9 }}
          onPress={function (): void {
            throw new Error("Function not implemented.");
          }}
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
    overflow: "hidden",
  },
  poster: {
    height: "67%",
    width: "90%",
    borderRadius: SIZES.h2 / 1.2,
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
