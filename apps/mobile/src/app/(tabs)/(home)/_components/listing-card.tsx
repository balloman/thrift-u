import { StyledText } from "@/src/components/styled-text";
import type { Listing } from "backend/schema";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export function ListingCard({ item }: { item: Listing }) {
  return (
    <View style={{ gap: 5, marginHorizontal: 10, marginVertical: 10 }}>
      <Link
        asChild
        href={{
          params: { id: item.id },
          pathname: "/(tabs)/(home)/listing",
        }}
      >
        <TouchableOpacity>
          <Image
            source={{
              uri: item.image,
            }}
            contentFit="contain"
            style={{ width: "100%", aspectRatio: 1, borderRadius: 10 }}
          />
        </TouchableOpacity>
      </Link>
      <StyledText variant="semibold">{item.title}</StyledText>
      <StyledText variant="light">{item.size}</StyledText>
      <StyledText variant="light">{`$${item.price}`}</StyledText>
    </View>
  );
}
