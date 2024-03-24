import { PRIVATE_KEY } from "@/private-key";
import { Ionicons } from "@expo/vector-icons";
import { createClient } from "@supabase/supabase-js";
import { decode } from "base64-arraybuffer";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { trpc } from "../api/api";
import { THEME } from "../components/styles";
import { useMainStore } from "../stores/store";
import { ListingTextInput } from "./(tabs)/(home)/_components/listing-text-input";

const supabase = createClient(
  "https://npjryurjfclrplkzwnsm.supabase.co",
  PRIVATE_KEY,
);

async function uploadImage(uid: string, base64?: string) {
  if (!base64) {
    throw new Error("No base64 image provided");
  }
  const result = await supabase.storage
    .from("images")
    .upload(`${uid}.png`, decode(base64), {
      contentType: "image/png",
      upsert: true,
    });

  console.log(result);
  if (result.error) {
    throw new Error(result.error.message);
  }
  const url = supabase.storage.from("images").getPublicUrl(result.data.path);
  if (!url) {
    throw new Error("Failed to get public URL");
  }
  return url;
}

export default function CreateProfile() {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [base64Image, setBase64Image] = useState<string | undefined>(undefined);
  const { uid } = useLocalSearchParams<{ uid: string }>();
  const [name, setName] = useState<string>("");
  const updateProfileMutation = trpc.updateProfile.useMutation();
  const setUser = useMainStore((state) => state.setUserId);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setBase64Image(result.assets[0].base64 ?? undefined);
    }
  };

  return (
    <View style={{ marginHorizontal: 20, marginTop: 30 }}>
      <Stack.Screen
        options={{
          headerTitle: "Create Profile",
          headerBackTitleVisible: false,
          headerBackVisible: false,
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => {
                uploadImage(uid, base64Image).then((result) => {
                  updateProfileMutation.mutate({
                    name: name,
                    profilePictureUrl: result.data.publicUrl,
                    uid: uid,
                  });
                  setUser(uid);
                  router.replace("/(tabs)/(home)/");
                });
              }}
            >
              <Ionicons
                name="checkmark"
                size={30}
                color={THEME.colors.light.accent}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <TouchableOpacity
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          alignSelf: "center",
          backgroundColor: THEME.colors.light.outline,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={pickImage}
      >
        {!image && (
          <Ionicons name="person" size={50} color={THEME.colors.light.accent} />
        )}
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        )}
      </TouchableOpacity>
      <ListingTextInput
        label="Name"
        placeholder="Enter a name"
        value={name}
        onChangeText={setName}
      />
    </View>
  );
}
