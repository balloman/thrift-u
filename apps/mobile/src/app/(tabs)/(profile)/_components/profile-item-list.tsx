import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import { ProfileItem, type ProfileItemProps } from "./profile-item";

interface ProfileItemListProps {
  items: ProfileItemProps[];
}

export function ProfileItemList(props: ProfileItemListProps) {
  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={props.items}
        renderItem={({ item }) => <ProfileItem {...item} />}
        estimatedItemSize={200}
        numColumns={2}
      />
    </View>
  );
}
