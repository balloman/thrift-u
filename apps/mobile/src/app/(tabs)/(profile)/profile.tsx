import { trpc } from "@/src/api/api";
import { StyledButton } from "@/src/components/styled-button";
import { StyledText } from "@/src/components/styled-text";
import { THEME } from "@/src/components/styles";
import { useMainStore } from "@/src/stores/store";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { Image } from "expo-image";
import { useRef, type ComponentProps, type RefObject } from "react";
import { View } from "react-native";
import {
  MaterialTabBar,
  Tabs,
  type CollapsibleRef,
} from "react-native-collapsible-tab-view";
import type { TabView } from "react-native-tab-view";
import { ProfileItem, type ProfileItemProps } from "./_components/profile-item";
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

const renderScene: ComponentProps<typeof TabView>["renderScene"] = ({
  route,
}) => {
  switch (route.key) {
    case "listings":
      return <ProfileItemList items={sampleItems} />;
    case "purchases":
      return <ProfileItemList items={sampleItems} />;
    case "sales":
      return <ProfileItemList items={sampleItems} />;
    default:
      return null;
  }
};

function TabBar(props: { tabRef: RefObject<CollapsibleRef>; index: number }) {
  return (
    <SegmentedControl
      values={routeTitles}
      selectedIndex={props.index}
      onChange={(e) => {
        props.tabRef.current?.setIndex(e.nativeEvent.selectedSegmentIndex);
      }}
      activeFontStyle={{
        fontFamily: "PlusJakartaSans-Medium",
        fontSize: 16,
        color: THEME.colors.light.onBackground,
      }}
      fontStyle={{
        fontFamily: "PlusJakartaSans-Medium",
        fontSize: 16,
        color: THEME.colors.light.accent,
      }}
      appearance="light"
      backgroundColor={THEME.colors.light.outline}
    />
  );
}

function Header() {
  const uid = useMainStore((state) => state.userId);
  const user = trpc.getUser.useQuery(uid ?? "", { enabled: !!uid });

  return (
    <View style={{ marginVertical: 10 }}>
      <Image
        style={{
          borderRadius: 50,
          width: 100,
          height: 100,
          alignSelf: "center",
        }}
        source={
          user.data?.profilePictureUrl ?? "https://i.redd.it/v0caqchbtn741.jpg"
        }
      />

      <View style={{ alignItems: "center", gap: 7.5, marginBottom: 15 }}>
        <StyledText variant="semibold" style={{ fontSize: 24 }}>
          {user.data?.name ?? "Loading..."}
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
    </View>
  );
}

export default function ProfileScreen() {
  const ref = useRef<CollapsibleRef>(null);

  return (
    <View style={{ gap: 15, flex: 1 }}>
      <Tabs.Container
        renderHeader={Header}
        renderTabBar={(props) => (
          <MaterialTabBar
            {...props}
            indicatorStyle={{ backgroundColor: THEME.colors.light.accent }}
          />
        )}
        ref={ref}
      >
        <Tabs.Tab label={"Listings"} name="listings">
          <Tabs.FlashList
            data={sampleItems}
            renderItem={({ item }) => <ProfileItem {...item} />}
            estimatedItemSize={200}
            numColumns={2}
          />
        </Tabs.Tab>
        <Tabs.Tab label={"Purchases"} name="purchases">
          <Tabs.FlashList
            data={sampleItems}
            renderItem={({ item }) => <ProfileItem {...item} />}
            estimatedItemSize={200}
            numColumns={2}
          />
        </Tabs.Tab>
        <Tabs.Tab label={"Sales"} name="sales">
          <Tabs.FlashList
            data={sampleItems}
            renderItem={({ item }) => <ProfileItem {...item} />}
            estimatedItemSize={200}
            numColumns={2}
          />
        </Tabs.Tab>
      </Tabs.Container>
    </View>
  );
}
