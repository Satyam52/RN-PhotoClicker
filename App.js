import React from "react";
import Home from "./screens/Home";
import Camera from "./screens/Camera";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";

const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Camera: {
      screen: Camera
    }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#8B78E6"
      },
      headerTitleStyle: {
        color: "#fff"
      }
    }
  }
);
const App = createAppContainer(MainNavigator);

export default App;
