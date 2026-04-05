import PrimaryButton from "../../components/PrimaryButton";
import { images } from "../../constants/images";
import {
  COLORS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SIZES,
} from "../../constants/THEME";
import { ThemedText } from "../../constants/ThemedText";
import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
import { Animated, Image, StatusBar, StyleSheet, View } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

const FirstScreen = ({ onDone }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const sliderRef = useRef<any>(null);

  const slides = [
    {
      key: "slide1",
      title: "Welcome to Ransact",
      text: "Your all-in-one financial companion, designed to simplify your banking experience.",
      footerText: "Let's get started!",
    }
  ]

  const navigation = useNavigation();
  const renderPagination = (activeIndex: number) => {
    const isLastSlide = activeIndex === slides.length - 1;

    return (
      <View style={styles.paginationContainer}>
        <View style={styles.paginationDots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === activeIndex && styles.activeDot]}
            />
          ))}
        </View>

        <View style={styles.buttonWrapper}>
          <PrimaryButton
            title={isLastSlide ? "Get Started" : "Next"}
            onPress={() => {
              if (isLastSlide) {
                navigation.navigate("Main");
              } else {
                Animated.timing(scrollX, {
                  toValue: activeIndex + 1,
                  useNativeDriver: true,
                  duration: 400,
                }).start();

                sliderRef.current?.goToSlide(activeIndex + 1);
              }
            }}
            style={{ elevation: 5 }}
          />
        </View>
        <ThemedText
          type="text3bold"
          style={{ fontWeight: "bold" }}
        ></ThemedText>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar backgroundColor={"white"} />
      <AppIntroSlider
        ref={sliderRef}
        data={slides}
        renderPagination={renderPagination}
        onSlideChange={(index) => {
          Animated.timing(scrollX, {
            toValue: index,
            useNativeDriver: true,
            duration: 400,
          }).start();
        }}
        renderItem={({ item, index }) => {
          const opacity = scrollX.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0, 1, 0],
          });

          const translateY = scrollX.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0, 0, 0],
          });
          return (
            <Animated.View
              style={[styles.slide, { opacity, transform: [{ translateY }] }]}
            >
              <Image source={item.image} style={styles.image} />
              <ThemedText type="text2" style={styles.title}>
                {item.title}
              </ThemedText>
              <ThemedText type="text3" style={styles.description}>
                {item.text}
              </ThemedText>
              <ThemedText
                type="text2bold"
                style={{ color: COLORS.accent, textTransform: "lowercase" }}
              >
                {item.footerText}
              </ThemedText>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  slide: {
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.white,
    paddingTop: SIZES.padding * 3,
    width: SCREEN_WIDTH,
    flex: 1,
  },
  image: {
    resizeMode: "contain",
    width: SIZES.width * 0.7,
    height: SIZES.height * 0.35,
    marginBottom: SIZES.padding,
    alignSelf: "center",
  },
  title: {
    fontWeight: "bold",
    marginVertical: SIZES.base,
    fontSize: SCREEN_HEIGHT * 0.032,
  },
  description: {
    color: COLORS.inputText,
    marginVertical: SIZES.base * 2,
  },
  paginationContainer: {
    position: "absolute",
    bottom: SIZES.base,
    left: 0,
    right: 0,
    alignItems: "center",
  },

  paginationDots: {
    flexDirection: "row",
    height: SIZES.base,
    marginVertical: SIZES.padding,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: SIZES.base,
    height: SIZES.base,
    borderRadius: SIZES.base / 2,
    backgroundColor: COLORS.gray,
    marginHorizontal: SIZES.base / 2,
    opacity: 0.7,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: SIZES.padding,
    opacity: 1,
  },
  buttonWrapper: {
    width: SCREEN_WIDTH * 0.85,
    marginVertical: SIZES.padding,
  },
  footerCTA: {
    marginTop: SIZES.padding,
  },
  ctaText: {
    textAlign: "center",
    color: COLORS.inputText,
  },
});
