import { createStackNavigator, createAppContainer } from "react-navigation"
import TabNavigation from "./TabNavigation"
import ProductList from "../screens/Category/ProductList"
import MyInfo from "../screens/Settings/MyInfo"
import PayInfo from "../screens/Settings/PayInfo"
import AddressInfo from "../screens/Settings/AddressInfo"
import Notice from "../screens/Settings/Notice"
import FAQ from "../screens/Settings/FAQ"
import AppInfo from "../screens/Settings/AppInfo"
import MemberDelete from "../screens/Settings/MemberDelete"
import { headerStyles } from "./config"
import { Back, Close } from "../components/HeaderLeft"
import React from "react"

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
    MyInfo: {
      screen: MyInfo,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <Back navigation={navigation} />,
        headerStyle: {
          ...headerStyles,
          borderBottomWidth: 0
        }
      })
    },
    PayInfo: {
      screen: PayInfo,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <Back navigation={navigation} />,
        headerStyle: {
          ...headerStyles,
          borderBottomWidth: 0
        }
      })
    },
    AddressInfo: {
      screen: AddressInfo,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <Back navigation={navigation} />,
        headerStyle: {
          ...headerStyles,
          borderBottomWidth: 0
        }
      })
    },
    Notice: {
      screen: Notice,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <Back navigation={navigation} />,
        headerStyle: {
          ...headerStyles,
          borderBottomWidth: 0
        }
      })
    },
    FAQ: {
      screen: FAQ,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <Back navigation={navigation} />,
        headerStyle: {
          ...headerStyles,
          borderBottomWidth: 0
        }
      })
    },
    AppInfo: {
      screen: AppInfo,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <Back navigation={navigation} />,
        headerStyle: {
          ...headerStyles,
          borderBottomWidth: 0
        }
      })
    },
    MemberDelete: {
      screen: MemberDelete,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <Back navigation={navigation} />,
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
)

export default createAppContainer(MainNavigation)
