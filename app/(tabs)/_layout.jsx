import { Ionicons } from "@expo/vector-icons";
import Tabs from "expo-router"
import Stack from "expo-router";

export default function TabsLayout() {
  return (

    <Tabs 
    screenOptions={{
      tabBarActiveintColor: "black",
      tabBarActiveintColor: "grey",
    }}
    >
      <Tabs.Screen 
      name="home"
      options={{
        title: "Home",
        tabBarIcon: ({ color, size }) =>  (
          <Ionicons name= "home-outline" size={size} color={color} />
        ),
      }}
      />

      <Tabs.Screen 
      name="Movies"
      options={{
        title: "Movies",
        tabBarIcon: ({ color, size }) =>  (
          <Ionicons name= "videocam-outline" size={size} color={color} />
        ),
      }}
      />

      <Tabs.Screen 
      name="home"
      options={{
        title: "Home",
        tabBarIcon: ({ color, size }) =>  (
          <Ionicons name= "settings-outline" size={size} color={color} />
        ),
      }}
      />

    </Tabs>
  )
}
