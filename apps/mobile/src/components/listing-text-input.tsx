import { StyledText } from "@/src/components/styled-text";
import { View } from "react-native";

interface ListingTextInputProps {
  label: string;
  placeholder: string;
}

export function ListingTextInput({
  label,
  placeholder,
}: ListingTextInputProps) {
  return (
    <View>
      <StyledText variant="medium">{label}</StyledText>
    </View>
  );
}
