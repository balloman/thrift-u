import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
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
          source={
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3f934614-2c85-4b2a-be8d-a5058509f054/solo-swoosh-mens-fleece-pullover-hoodie-qnqWb8.png"
          }
        />
        <ListingPageSection style={{ gap: 10, marginTop: 20 }}>
          <StyledText variant="bold" style={{ fontSize: 22 }}>
            Nike Hoodie
          </StyledText>
          <StyledText style={{ fontSize: 16 }}>$100</StyledText>
          <StyledText style={{ fontSize: 18, marginTop: 10 }} variant="bold">
            Details
          </StyledText>
        </ListingPageSection>
        <ListingPageSection>
          <ListingDetail icon="resize-outline" label="Size" value="M" />
          <ListingDetail
            icon="time-outline"
            label="Vintage From"
            value="2022"
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
                "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
              }
            />
            <View style={{ justifyContent: "center" }}>
              <StyledText style={{ fontSize: 16 }}>John D</StyledText>
            </View>
          </View>
        </ListingPageSection>
        <ListingPageSection style={{ marginTop: 20 }}>
          <StyledText style={{ fontSize: 18 }} variant="bold">
            Description
          </StyledText>
          <StyledTextInput editable={false} multiline scrollEnabled={false}>
            {
              "This is just a short description for this item to use for testing purposes. I could have used lorem ipsum, but I was too lazy to copy and paste it when I was writing this and it was also like 1 in the morning"
            }
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
