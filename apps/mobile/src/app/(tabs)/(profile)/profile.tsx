import { StyledButton } from "@/src/components/styled-button";
import { StyledText } from "@/src/components/styled-text";
import { THEME } from "@/src/components/styles";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { Image } from "expo-image";
import { useState } from "react";
import { View, useWindowDimensions } from "react-native";
import {
  SceneMap,
  TabView,
  type NavigationState,
  type SceneRendererProps,
} from "react-native-tab-view";
import type { ProfileItemProps } from "./_components/profile-item";
import { ProfileItemList } from "./_components/profile-item-list";

const routes = [
  { key: "listings", title: "Listings" },
  { key: "purchases", title: "Purchases" },
  { key: "sales", title: "Sales" },
];

const routeTitles = routes.map((route) => route.title);

const sampleItems: ProfileItemProps[] = Array<ProfileItemProps>(30).fill({
  image: "https://i.redd.it/v0caqchbtn741.jpg",
  price: 50,
  title: "Item Title",
});

const renderScene = SceneMap({
  listings: () => <ProfileItemList items={sampleItems} />,
  purchases: () => <ProfileItemList items={sampleItems} />,
  sales: () => <ProfileItemList items={sampleItems} />,
});

function TabBar(
  props: SceneRendererProps & {
    navigationState: NavigationState<{ key: string; title: string }>;
  },
) {
  return (
    <SegmentedControl
      values={routeTitles}
      selectedIndex={props.navigationState.index}
      onChange={(e) => {
        console.log(e.nativeEvent.selectedSegmentIndex);
        return props.jumpTo(routes[e.nativeEvent.selectedSegmentIndex].key);
      }}
      style={{ marginBottom: 20 }}
      activeFontStyle={{ fontFamily: "PlusJakartaSans-Medium", fontSize: 16 }}
      fontStyle={{ fontFamily: "PlusJakartaSans-Medium", fontSize: 16 }}
      appearance="light"
      backgroundColor={THEME.colors.light.outline}
    />
  );
}

export default function ProfileScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  return (
    <View style={{ marginTop: 20, gap: 15, flex: 1 }}>
      <Image
        style={{
          borderRadius: 50,
          width: 100,
          height: 100,
          alignSelf: "center",
        }}
        source={"https://i.redd.it/v0caqchbtn741.jpg"}
      />

      <View style={{ alignItems: "center", gap: 7.5 }}>
        <StyledText variant="semibold" style={{ fontSize: 24 }}>
          Mike Wazowski
        </StyledText>
        <StyledText variant="light" style={{ fontSize: 16 }}>
          Carbon Emissions Saved: 0.0 kg
        </StyledText>
      </View>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
          flexDirection: "row",
          gap: 10,
          justifyContent: "center",
        }}
      >
        <StyledButton
          style={{
            flex: 1,
            backgroundColor: THEME.colors.light.outline,
            paddingVertical: 10,
          }}
        >
          Edit Profile
        </StyledButton>
        <StyledButton style={{ flex: 1, paddingVertical: 10 }}>
          Settings
        </StyledButton>
      </View>
      <View style={{ flex: 1, marginHorizontal: 15 }}>
        <TabView
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderScene={renderScene}
          renderTabBar={TabBar}
        />
      </View>
    </View>
  );
}
