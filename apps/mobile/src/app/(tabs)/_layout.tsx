import { THEME } from "@/src/components/styles";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import type { ComponentProps } from "react";

function TabBarIcon({
  name,
  color,
  focused,
  size,
}: {
  name: ComponentProps<typeof Ionicons>["name"];
  color: string;
  focused: boolean;
  size: number;
}) {
  return <Ionicons name={name} color={color} size={size} />;
}

const sharedRoutes = ["listing"];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: {
          fontFamily: "PlusJakartaSans-Medium",
          fontSize: 12,
        },
        tabBarStyle: {
          paddingTop: 5,
        },
        tabBarActiveTintColor: THEME.colors.light.onBackground,
        tabBarInactiveTintColor: THEME.colors.light.accent,
        headerStyle: {
          backgroundColor: "white",
        },
        headerTitleStyle: {
          fontFamily: "PlusJakartaSans-Medium",
        },
      }}
      sceneContainerStyle={{
        backgroundColor: "white",
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          headerTitle: "Listings",
          tabBarIcon: ({ color, focused, size }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
              focused={focused}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: "Inbox",
          tabBarIcon: ({ color, focused, size }) => (
            <TabBarIcon
              name={focused ? "mail" : "mail-outline"}
              color={color}
              focused={focused}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused, size }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
              focused={focused}
              size={size}
            />
          ),
        }}
      />
      {sharedRoutes.map((route) => (
        <Tabs.Screen
          key={route}
          name={`(home)/${route}`}
          options={{
            href: null,
          }}
        />
      ))}
      {sharedRoutes.map((route) => (
        <Tabs.Screen
          key={route}
          name={`(profile)/${route}`}
          options={{
            href: null,
          }}
        />
      ))}
      {sharedRoutes.map((route) => (
        <Tabs.Screen
          key={route}
          name={`(inbox)/${route}`}
          options={{
            href: null,
          }}
        />
      ))}
    </Tabs>
  );
}
