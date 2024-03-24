import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { TextInput, View, type TextInputProps } from "react-native";
import { ListingBase, type ListingBaseProps } from "./listing-base";

type ListingTextInputProps = TextInputProps &
  Omit<ListingBaseProps, "children"> & {
    placeholder: string;
    leftIcon?: ComponentProps<typeof Ionicons>["name"];
  };

export function ListingTextInput({
  label,
  placeholder,
  leftIcon,
  ...props
}: ListingTextInputProps) {
  return (
    <ListingBase label={label} error={props.error}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        {leftIcon && <Ionicons name={leftIcon} size={12} />}
        <TextInput
          style={{ fontFamily: "PlusJakartaSans-Regular" }}
          placeholder={placeholder}
          {...props}
        />
      </View>
    </ListingBase>
  );
}
