import { createStackNavigator, createAppContainer } from "react-navigation";
import TabNavigation from "./TabNavigation";
import ProductList from "../screens/Category/ProductList";
import { headerStyles } from "./config";

const MainNavigation = createStackNavigator(
  {
    Tabs: { screen: TabNavigation, navigationOptions: { header: null } },
    ProductList: {
      screen: ProductList,
      navigationOptions: {
        headerStyle: {
          ...headerStyles,
          borderBottomWidth: 0
        }
      }
    }
  },
  {
    headerMode: "screen",
    headerBackTitleVisible: false
  }
);

export default createAppContainer(MainNavigation);
