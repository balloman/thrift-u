import { trpc } from "@/src/api/api";
import { Fab } from "@/src/components/fab";
import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import { View } from "react-native";
import { ListingCard } from "./_components/listing-card";

export default function HomeScreen() {
  const listingQuery = trpc.getAllListings.useQuery();

  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={listingQuery.data ?? []}
        renderItem={ListingCard}
        refreshing={listingQuery.isLoading}
        onRefresh={listingQuery.refetch}
        numColumns={2}
        estimatedItemSize={225}
      />
      <Link asChild href={"/post"}>
        <Fab />
      </Link>
    </View>
  );
}
