import { StyledText } from "@/src/components/styled-text";
import { THEME } from "@/src/components/styles";
import { View } from "react-native";

export interface ListingBaseProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export function ListingBase({ label, children, error }: ListingBaseProps) {
  return (
    <View>
      <View style={{ marginBottom: 10 }}>
        <StyledText variant="medium" style={{ fontSize: 16 }}>
          {label}
        </StyledText>
      </View>

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
      {error && (
        <View>
          <StyledText
            variant="light"
            style={{ fontSize: 12, marginTop: 5, color: "red" }}
          >
            {error}
          </StyledText>
        </View>
      )}
    </View>
  );
}
