import { StyledText } from "@/src/components/styled-text";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { ListingBase } from "./listing-base";

export function PhotoInput(props: { onPress: () => void }) {
  return (
    <ListingBase label="Photo">
      <TouchableOpacity
        onPress={props.onPress}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StyledText variant="light" style={{ opacity: 0.7, flex: 1 }}>
          Tap to add photo
        </StyledText>
        <Ionicons name="camera" size={24} />
      </TouchableOpacity>
    </ListingBase>
  );
}
