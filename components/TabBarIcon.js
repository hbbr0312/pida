import React from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import Colors from "../constants/Colors";

export default function TabBarIcon({ name, focused, fontawesome = false }) {
  return fontawesome ? (
    <FontAwesome
      name={name}
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  ) : (
    <Ionicons
      name={name}
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
