import { StyledText } from "@/src/components/styled-text";
import { Image } from "expo-image";
import { View } from "react-native";

export interface ProfileItemProps {
  title: string;
  image: string;
  price: number;
}

export function ProfileItem({ title, image, price }: ProfileItemProps) {
  return (
    <View>
      <Image
        source={image}
        style={{
          width: "95%",
          aspectRatio: 1,
          borderRadius: 15,
          alignSelf: "center",
          marginVertical: 5,
        }}
      />
      <StyledText variant="medium" style={{ fontSize: 16 }}>
        {title}
      </StyledText>
      <StyledText variant="light">{`$${price}`}</StyledText>
    </View>
  );
}
