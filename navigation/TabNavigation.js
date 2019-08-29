import React from "react"
import { createBottomTabNavigator, createAppContainer } from "react-navigation"
import TabBarTitle from "../components/TabBarTitle"

import Category from "../screens/Category"
import Cart from "../screens/Cart"
import GroupBuying from "../screens/GroupBuying"
import MyPida from "../screens/MyPida"
import Settings from "../screens/Settings"

import { BG_COLOR } from "../constants/Colors"
import TabBarIcon from "../components/TabBarIcon"
import { Platform } from "@unimodules/core"
import { createStack } from "./config"

const TabNavigation = createBottomTabNavigator(
  {
    Category: {
      screen: createStack(Category, "카테고리"),
      navigationOptions: {
        tabBarLabel: ({ focused }) => (
          <TabBarTitle focused={focused} title={"카테고리"} />
        ),
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-list" : "md-list"}
          />
        )
      }
    },
    Cart: {
      screen: createStack(Cart, "장바구니"),
      navigationOptions: {
        tabBarLabel: ({ focused }) => (
          <TabBarTitle focused={focused} title={"장바구니"} />
        ),
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-cart" : "md-cart"}
          />
        )
      }
    },
    GroupBuying: {
      screen: createStack(GroupBuying, "공동구매"),
      navigationOptions: {
        tabBarLabel: ({ focused }) => (
          <TabBarTitle focused={focused} title={"공동구매"} />
        ),
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-people" : "md-people"}
          />
        )
      }
    },
    MyPida: {
      screen: createStack(MyPida, "My피다"),
      navigationOptions: {
        tabBarLabel: ({ focused }) => (
          <TabBarTitle focused={focused} title={"My피다"} />
        ),
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name={"truck"} fontawesome={true} />
        )
      }
    },
    Settings: {
      screen: createStack(Settings, "설정"),
      navigationOptions: {
        tabBarLabel: ({ focused }) => (
          <TabBarTitle focused={focused} title={"설정"} />
        ),
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-settings" : "md-settings"}
          />
        )
      }
    }
  },
  {
    initialRouteName: "Category",
    tabBarOptions: {
      style: {
        backgroundColor: BG_COLOR
      }
    }
  }
)

export default createAppContainer(TabNavigation)
