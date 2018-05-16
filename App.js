import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { TabNavigator, createStackNavigator } from "react-navigation";

import PostList from "./src/screens/PostList";
import Post from "./src/screens/Post";

StatusBar.setBarStyle("light-content");

const App = createStackNavigator(
  {
    Home: {
      screen: PostList,
      navigationOptions: {
        title: "WordCamp Bo"
      }
    },
    Post: {
      screen: Post,
      navigationOptions: {
        title: "Post"
      }
    }
  },
  {
    navigationOptions: {
      headerTintColor: "white",
      headerPressColorAndroid: "rgba(255,255,255,0.5)",
      headerStyle: {
        backgroundColor: "#eb5757",
        borderBottomColor: "#0e0838"
      }
    },
    headerTransitionPreset: "uikit"
  }
);

export default App;
