import { supabase, trpc } from "@/src/api/api";
import { StyledButton } from "@/src/components/styled-button";
import { StyledText } from "@/src/components/styled-text";
import { useMainStore } from "@/src/stores/store";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { decode } from "base64-arraybuffer";
import * as crypto from "expo-crypto";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { z } from "zod";
import {
  ListingSelectInput,
  type SelectItem,
} from "./_components/listing-select-input";
import { ListingTextInput } from "./_components/listing-text-input";
import { PhotoInput } from "./_components/photo-input";

const clothingTypes: SelectItem[] = [
  { label: "Shirt", value: "Shirt" },
  { label: "Pants", value: "Pants" },
  { label: "Shoes", value: "Shoes" },
  { label: "Accessories", value: "Accessories" },
  { label: "Outerwear", value: "Outerwear" },
  { label: "Dresses", value: "Dresses" },
  { label: "Skirts", value: "Skirts" },
  { label: "Suits", value: "Suits" },
  { label: "Activewear", value: "Activewear" },
  { label: "Other", value: "Other" },
];

const years: SelectItem[] = Array(100)
  .fill(0)
  .map((_, i) => {
    return {
      label: (new Date().getFullYear() - i).toString(),
      value: (new Date().getFullYear() - i).toString(),
    };
  });

async function uploadImage(base64?: string) {
  if (!base64) {
    throw new Error("No base64 image provided");
  }
  const uuid = crypto.randomUUID();
  const result = await supabase.storage
    .from("images")
    .upload(`${uuid}.png`, decode(base64), {
      contentType: "image/png",
      upsert: true,
    });
  if (result.error) {
    throw new Error(result.error.message);
  }
  const url = supabase.storage.from("images").getPublicUrl(result.data.path);
  if (!url) {
    throw new Error("Failed to get public URL");
  }
  return url;
}

function Header({ onPost }: { onPost: () => void }) {
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
          onPress={onPost}
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
  const postMutation = trpc.postListing.useMutation();
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | undefined>(
    undefined,
  );
  const user = useMainStore((state) => state.userId);
  const router = useRouter();
  const utils = trpc.useUtils();
  const form = useForm({
    defaultValues: {
      title: "",
      size: "",
      category: "",
      price: "",
      year: "",
      description: "",
    },
    onSubmit: async ({ value }) => {
      if (!user) {
        return;
      }
      const url = await uploadImage(image?.base64 ?? undefined);
      postMutation.mutate(
        {
          title: value.title,
          size: value.size,
          category: value.category,
          price: Number.parseInt(value.price),
          year: Number.parseInt(value.year),
          description: value.description,
          image: url.data.publicUrl,
          uid: user,
        },
        {
          onSettled: () => {
            utils.invalidate();
          },
        },
      );
      router.replace("/(tabs)/(home)/");
    },
    onSubmitInvalid: () => {
      alert("Please fill out all fields correctly");
    },
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  return (
    <View>
      <ScrollView
        style={{ paddingHorizontal: 10 }}
        automaticallyAdjustKeyboardInsets
        stickyHeaderIndices={[0]}
      >
        <Header onPost={form.handleSubmit} />
        <View style={{ marginHorizontal: 10, marginTop: 20, gap: 20 }}>
          {image ? (
            <Image
              source={{ uri: image.uri }}
              style={{ height: 200, aspectRatio: 1, alignSelf: "center" }}
            />
          ) : (
            <PhotoInput onPress={pickImage} />
          )}
          <form.Field
            name="title"
            validators={{
              onSubmit: ({ value }) =>
                value.length > 6
                  ? undefined
                  : "Titles must be longer than that",
            }}
          >
            {(field) => (
              <ListingTextInput
                label="Title"
                placeholder="Enter a short title for this item"
                onChangeText={field.handleChange}
                onBlur={() => field.handleBlur()}
                value={field.state.value}
                error={field.state.meta.errors.map((e) => e).join(", ")}
              />
            )}
          </form.Field>

          <form.Field name="size">
            {(field) => (
              <ListingTextInput
                label="Size"
                placeholder="Enter the size"
                onChangeText={field.handleChange}
                value={field.state.value}
                maxLength={3}
                autoCorrect={false}
              />
            )}
          </form.Field>
          <form.Field
            name="category"
            validators={{
              onChange: ({ value }) => {
                return value === "null" || !value
                  ? "Category is required"
                  : undefined;
              },
            }}
          >
            {(field) => (
              <ListingSelectInput
                label="Category"
                items={clothingTypes}
                onValueChange={field.handleChange}
                value={field.state.value}
                error={field.state.meta.errors.map((e) => e).join(", ")}
              />
            )}
          </form.Field>
          <form.Field
            name="price"
            validatorAdapter={zodValidator}
            validators={{
              onChange: z
                .number({ coerce: true })
                .min(0, "Price must be a positive number")
                .max(9999, "Price must be less than $10,000"),
            }}
          >
            {(field) => (
              <ListingTextInput
                label="Price"
                placeholder="Enter price in dollars"
                inputMode="numeric"
                returnKeyType="done"
                onChangeText={field.handleChange}
                value={field.state.value}
                error={field.state.meta.errors.map((e) => e).join(", ")}
              />
            )}
          </form.Field>
          <form.Field
            name="year"
            validators={{
              onChange: ({ value }) =>
                Number.parseInt(value) > 0
                  ? undefined
                  : "Year must be a positive integer",
            }}
          >
            {(field) => (
              <ListingSelectInput
                label="Year Acquired"
                items={years}
                onValueChange={field.handleChange}
                value={field.state.value}
                error={field.state.meta.errors.map((e) => e).join(", ")}
              />
            )}
          </form.Field>
          <form.Field name="description">
            {(field) => (
              <ListingTextInput
                label="Description"
                placeholder="Really sell it!"
                multiline
                style={{ height: 100 }}
                maxLength={500}
                onChangeText={field.handleChange}
                value={field.state.value}
              />
            )}
          </form.Field>
        </View>
        <StyledButton
          style={{ marginVertical: 20, marginHorizontal: 10 }}
          onPress={form.handleSubmit}
        >
          Post Listing
        </StyledButton>
        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
}
