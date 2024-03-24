import { Ionicons } from "@expo/vector-icons";
import { forwardRef } from "react";
import { TouchableOpacity } from "react-native";
import { THEME } from "./styles";

export function InnerFab(
  { onPress }: { onPress?: () => void },
  ref: React.ForwardedRef<TouchableOpacity>,
) {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: "2.5%",
        right: "5%",
        backgroundColor: THEME.colors.light.primary,
        borderRadius: 10,
        padding: 7.5,
      }}
      onPress={onPress}
      ref={ref}
    >
      <Ionicons name="add" size={32} />
    </TouchableOpacity>
  );
}

export const Fab = forwardRef(InnerFab);
