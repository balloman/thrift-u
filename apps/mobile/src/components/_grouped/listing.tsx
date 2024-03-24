import { trpc } from "@/src/api/api";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, View, type ViewProps } from "react-native";
import { ListingDetail } from "../listing-detail";
import { StyledButton } from "../styled-button";
import { StyledText } from "../styled-text";
import { StyledTextInput } from "../styled-text-input";
import { TouchableLink } from "../touchable-link";

function ListingPageSection(props: ViewProps) {
  return (
    <View
      {...props}
      style={[{ marginHorizontal: 15, marginTop: 20, gap: 15 }, props.style]}
    />
  );
}

export default function ListingPage() {
  const params = useLocalSearchParams<{ id: string }>();
  const { data: item } = trpc.getListing.useQuery(params.id);
  const user = trpc.getUser.useQuery(item?.postedBy ?? "", {
    enabled: !!item?.postedBy,
  });

  return (
    <View>
      <ScrollView>
        <Stack.Screen
          options={{
            headerTitle: "",
            headerBackTitleVisible: false,
            headerLeft: (props) => (
              <TouchableLink href="..">
                <Ionicons name="chevron-back" size={24} {...props} />
              </TouchableLink>
            ),
          }}
        />
        <Image
          style={{ width: "100%", aspectRatio: 1 }}
          contentFit="contain"
          source={item?.image}
        />
        <ListingPageSection style={{ gap: 10, marginTop: 20 }}>
          <StyledText variant="bold" style={{ fontSize: 22 }}>
            {item?.title}
          </StyledText>
          <StyledText style={{ fontSize: 16 }}>{`$${item?.price}`}</StyledText>
          <StyledText style={{ fontSize: 18, marginTop: 10 }} variant="bold">
            Details
          </StyledText>
        </ListingPageSection>
        <ListingPageSection>
          <ListingDetail
            icon="resize-outline"
            label="Size"
            value={item?.size ?? ""}
          />
          <ListingDetail
            icon="time-outline"
            label="Vintage From"
            value={item?.year.toFixed(0) ?? "2024"}
          />
        </ListingPageSection>
        <ListingPageSection>
          <StyledText style={{ fontSize: 18 }} variant="bold">
            About the seller
          </StyledText>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Image
              style={{ height: 48, aspectRatio: 1, borderRadius: 30 }}
              source={
                user.data?.profilePictureUrl ??
                "https://i.redd.it/v0caqchbtn741.jpg"
              }
            />
            <View style={{ justifyContent: "center" }}>
              <StyledText style={{ fontSize: 16 }}>
                {user.data?.name}
              </StyledText>
            </View>
          </View>
        </ListingPageSection>
        <ListingPageSection style={{ marginTop: 20 }}>
          <StyledText style={{ fontSize: 18 }} variant="bold">
            Description
          </StyledText>
          <StyledTextInput editable={false} multiline scrollEnabled={false}>
            {item?.description}
          </StyledTextInput>
        </ListingPageSection>

        <View style={{ height: 80 }} />
      </ScrollView>
      <LinearGradient
        colors={[
          "rgba(255, 255, 255, 0.1)",
          "rgba(255, 255, 255, 0.8)",
          "white",
        ]}
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 0,
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}
      >
        <StyledButton style={{ flex: 1 }}>Message</StyledButton>
      </LinearGradient>
    </View>
  );
}
