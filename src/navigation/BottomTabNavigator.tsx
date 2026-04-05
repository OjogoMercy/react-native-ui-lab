import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { ColorValue, Platform } from "react-native";
import { AnimatedIconWrapper } from "../components/AnimatedIconWrapper";
import { COLORS } from "../constants/THEME";
import WalletScreen from "../screens/BottomScreens/WalletScreens/WalletScreen";
import HomeScreen from "../screens/BottomScreens/Home/HomeScreen";
import ProfileScreen from "../screens/BottomScreens/Profile/ProfileScreen";
import PaymentScreen from "../screens/BottomScreens/PaymentScreen/PaymentScreen";
type RootTabParamList = {
  Home: undefined;
  PaymentScreen: undefined;
  Profile: undefined;
  WalletScreen: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
  const activeTintColor: ColorValue = COLORS.primary;
  const inactiveTintColor: ColorValue = "#8e8e93";
  // const glowColor = COLORS.secondary + "45";

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          marginTop: 4,
        },
        tabBarStyle: {
          height: Platform.OS === "android" ? 70 : 90,
          paddingTop: 10,
          backgroundColor: "white",
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
        },
        // tabBarIcon: ({ color, size, focused }) => {
        //   const iconProps = {
        //     color: color,
        //     size: 22,
        //     strokeWidth: focused ? 2.5 : 2,
        //   };

        //   // return (
        //   //   <AnimatedIconWrapper focused={focused} glowColor="#a0f0a4ff" 
        //   //     {route.name === "Home" && <Home {...iconProps} />}
        //   //     {route.name === "WalletScreen" && <ClipboardCheck {...iconProps} />}
        //   //     {route.name === "PaymentScreen" && <ShieldCheck {...iconProps} />}
        //   //     {route.name === "Profile" && <UserCircle {...iconProps} />}
        //   //   </AnimatedIconWrapper>
        //   // );
        // },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="WalletScreen"
        component={WalletScreen}
        options={{ title: "WalletScreen" }}
      />
      <Tab.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{ title: "PaymentScreen" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
}
