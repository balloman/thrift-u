import { StyledText } from "@/src/components/styled-text";
import { THEME } from "@/src/components/styles";
import { Image } from "expo-image";
import { View } from "react-native";

export function MessageItem() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        gap: 15,
        marginHorizontal: 15,
        marginVertical: 10,
      }}
    >
      <Image
        source={{ uri: "https://i.pravatar.cc/300" }}
        style={{ borderRadius: 40, height: 56, width: 56 }}
      />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <StyledText variant="medium" style={{ fontSize: 16 }}>
          Olivia Smith
        </StyledText>
        <StyledText style={{ color: THEME.colors.light.accent }}>
          I'm interested in your item
        </StyledText>
      </View>
      <View style={{ justifyContent: "center" }}>
        <StyledText>A few hours ago</StyledText>
      </View>
    </View>
  );
}
