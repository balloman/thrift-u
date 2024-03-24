import { StyledText } from "@/src/components/styled-text";
import { Ionicons } from "@expo/vector-icons";
import { ListingBase } from "./listing-base";

export function PhotoInput() {
  return (
    <ListingBase label="Photo">
      <StyledText variant="light" style={{ opacity: 0.7 }}>
        Tap to add photo
      </StyledText>
      <Ionicons name="camera" size={24} />
    </ListingBase>
  );
}
