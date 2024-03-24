import { StyledButton } from "@/src/components/styled-button";
import { StyledText } from "@/src/components/styled-text";
import { ScrollView, View } from "react-native";
import {
  ListingSelectInput,
  type SelectItem,
} from "./_components/listing-select-input";
import { ListingTextInput } from "./_components/listing-text-input";
import { PhotoInput } from "./_components/photo-input";

const clothingTypes: SelectItem[] = [
  { label: "Shirt", value: "shirt" },
  { label: "Pants", value: "pants" },
  { label: "Shoes", value: "shoes" },
  { label: "Accessories", value: "accessories" },
  { label: "Outerwear", value: "outerwear" },
  { label: "Dresses", value: "dresses" },
  { label: "Skirts", value: "skirts" },
  { label: "Suits", value: "suits" },
  { label: "Activewear", value: "activewear" },
  { label: "Other", value: "other" },
];

const years: SelectItem[] = Array(100)
  .fill(0)
  .map((_, i) => {
    return {
      label: (new Date().getFullYear() - i).toString(),
      value: (new Date().getFullYear() - i).toString(),
    };
  });

function Header() {
  return (
    <View
      style={{
        paddingTop: 20,
        paddingBottom: 10,
        gap: 5,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1 }} />
        <StyledText
          variant="semibold"
          style={{ fontSize: 18, flex: 3, textAlign: "center" }}
        >
          Post a listing
        </StyledText>
        <StyledButton
          style={{
            flex: 1,
            backgroundColor: "transparent",
            padding: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
          labelStyle={{ opacity: 0.7, fontSize: 16 }}
        >
          Post
        </StyledButton>
      </View>
      <StyledText variant="light" style={{ textAlign: "center" }}>
        Give clothes a new home!
      </StyledText>
    </View>
  );
}

export default function PostScreen() {
  return (
    <View>
      <ScrollView
        style={{ paddingHorizontal: 10 }}
        automaticallyAdjustKeyboardInsets
        stickyHeaderIndices={[0]}
      >
        <Header />
        <View style={{ marginHorizontal: 10, marginTop: 20, gap: 20 }}>
          <PhotoInput />
          <ListingTextInput
            label="Brand"
            placeholder="Enter the brand for this item"
          />
          <ListingTextInput
            label="Size"
            placeholder="Enter the size"
            maxLength={3}
            autoCorrect={false}
          />
          <ListingSelectInput label="Category" items={clothingTypes} />
          <ListingTextInput
            label="Price"
            placeholder="Enter price in dollars"
            inputMode="numeric"
            returnKeyType="done"
          />
          <ListingSelectInput label="Year Acquired" items={years} />
          <ListingTextInput
            label="Description"
            placeholder="Really sell it!"
            multiline
            style={{ height: 100 }}
            maxLength={500}
          />
        </View>
        <StyledButton style={{ marginVertical: 20, marginHorizontal: 10 }}>
          Post Listing
        </StyledButton>
        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
}
