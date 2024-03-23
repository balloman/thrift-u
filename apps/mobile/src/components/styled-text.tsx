import { useMemo } from "react";
import { Text, type TextProps } from "react-native";

interface StyledTextProps extends TextProps {
  variant?: "bold" | "regular" | "light" | "medium" | "semibold";
}

export function StyledText(props: StyledTextProps) {
  const style = props.style || {};
  const family = useMemo(() => {
    switch (props.variant) {
      case "bold":
        return "PlusJakartaSans-Bold";
      case "light":
        return "PlusJakartaSans-Light";
      case "medium":
        return "PlusJakartaSans-Medium";
      case "semibold":
        return "PlusJakartaSans-SemiBold";
      default:
        return "PlusJakartaSans-Regular";
    }
  }, [props.variant]);

  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: family,
        },
        style,
      ]}
    />
  );
}
