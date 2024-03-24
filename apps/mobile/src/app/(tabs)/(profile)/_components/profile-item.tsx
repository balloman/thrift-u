import { StyledText } from "@/src/components/styled-text";
import type { Listing } from "backend/schema";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export interface ProfileItemProps {
  title: string;
  image: string;
  price: number;
  isSold?: boolean;
}

export function ProfileItem({ id, title, image, price }: Listing) {
  return (
    <View
      style={{ marginBottom: 10, alignSelf: "center", marginHorizontal: 10 }}
    >
      <Link
        href={{ pathname: "/(tabs)/(profile)/listing", params: { id } }}
        asChild
      >
        <TouchableOpacity>
          <Image
            source={image}
            style={{
              width: "100%",
              aspectRatio: 1,
              borderRadius: 15,
              alignSelf: "center",
              marginVertical: 10,
            }}
          />
        </TouchableOpacity>
      </Link>

      <StyledText variant="medium" style={{ fontSize: 16 }}>
        {title}
      </StyledText>
      <StyledText variant="light">{`$${price}`}</StyledText>
    </View>
  );
}
