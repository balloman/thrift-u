import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { View } from "react-native";
import { StyledText } from "./styled-text";
import { THEME } from "./styles";

interface ListingDetailProps {
  icon: ComponentProps<typeof Ionicons>["name"];
  label: string;
  value: string;
}

export function ListingDetail({ icon, label, value }: ListingDetailProps) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center", gap: 12 }}>
      <View
        style={{
          backgroundColor: THEME.colors.light.outline,
          height: 48,
          width: 48,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
        }}
      >
        <Ionicons
          name={icon}
          size={24}
          color={THEME.colors.light.onBackground}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <StyledText style={{ fontSize: 16 }} variant="medium">
          {label}
        </StyledText>
        <StyledText style={{ color: THEME.colors.light.accent }}>
          {value}
        </StyledText>
      </View>
    </View>
  );
}
