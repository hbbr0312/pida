import { createStackNavigator, createAppContainer } from "react-navigation";
import TabNavigation from "./TabNavigation";
import ProductList from "../screens/Category/ProductList";
import Detail from "../screens/Detail";
import { headerStyles } from "./config";
import { Back, Close } from "../components/HeaderLeft";
import React from "react";

const MainNavigation = createStackNavigator(
  {
    Tabs: {
      screen: TabNavigation,
      navigationOptions: { header: null }
    },
    ProductList: {
      screen: ProductList,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <Back navigation={navigation} />,
        headerStyle: {
          ...headerStyles,
          borderBottomWidth: 0
        }
      })
    },
    Detail: {
      screen: Detail,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <Close navigation={navigation} />,
        headerStyle: {
          ...headerStyles,
          borderBottomWidth: 0
        }
      })
    }
  },
  {
    headerMode: "screen",
    headerBackTitleVisible: false
  }
);

export default createAppContainer(MainNavigation);
