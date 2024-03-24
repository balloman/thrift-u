import { Fab } from "@/src/components/fab";
import { StyledText } from "@/src/components/styled-text";
import { Link } from "expo-router";
import { View } from "react-native";
import { ListingCard } from "./_components/listing-card";

export default function HomeScreen() {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <StyledText>Tab [Home|Settings]</StyledText>
      <View style={{ gap: 10 }}>
        <ListingCard />
        <ListingCard />
      </View>
      <Link asChild href={"/post"}>
        <Fab />
      </Link>
    </View>
  );
}
