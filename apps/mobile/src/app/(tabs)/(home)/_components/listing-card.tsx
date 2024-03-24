import { StyledText } from "@/src/components/styled-text";
import { Image } from "expo-image";
import { View } from "react-native";

export function ListingCard() {
  return (
    <View style={{ gap: 5 }}>
      <Image
        source={{
          uri: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3f934614-2c85-4b2a-be8d-a5058509f054/solo-swoosh-mens-fleece-pullover-hoodie-qnqWb8.png",
        }}
        contentFit="cover"
        style={{ width: 200, height: 200, borderRadius: 10 }}
      />
      <StyledText variant="semibold">Nike Hoodie</StyledText>
      <StyledText variant="light">M/Gray</StyledText>
      <StyledText variant="light">$40</StyledText>
    </View>
  );
}
