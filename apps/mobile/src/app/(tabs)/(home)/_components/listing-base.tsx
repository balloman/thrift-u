import { StyledText } from "@/src/components/styled-text";
import { THEME } from "@/src/components/styles";
import { View } from "react-native";

export interface ListingBaseProps {
  label: string;
  children: React.ReactNode;
}

export function ListingBase({ label, children }: ListingBaseProps) {
  return (
    <View style={{ gap: 10 }}>
      <StyledText variant="medium" style={{ fontSize: 16 }}>
        {label}
      </StyledText>
      <View
        style={{
          backgroundColor: THEME.colors.light.outline,
          flexDirection: "row",
          justifyContent: "space-between",
          borderRadius: 10,
          paddingHorizontal: 15,
          paddingVertical: 12.5,
          alignItems: "center",
          borderColor: "gray",
          borderWidth: 0.3,
        }}
      >
        {children}
      </View>
    </View>
  );
}
