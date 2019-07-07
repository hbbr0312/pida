import { createStackNavigator } from "react-navigation";
import { bgColor, tintColor } from "../constants/Colors";

export const headerStyles = {
  headerStyle: {
    backgroundColor: bgColor
    //borderBottomWidth: 0
  },
  headerTitleStyle: {},
  headerTintColor: tintColor
};

export const createStack = (screen, title) =>
  createStackNavigator({
    Screen: {
      screen,
      navigationOptions: {
        title,
        ...headerStyles
      }
    }
  });
