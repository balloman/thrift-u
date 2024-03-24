import { TextInput, type TextInputProps } from "react-native";

export function StyledTextInput(props: TextInputProps) {
  return (
    <TextInput
      {...props}
      style={[{ fontFamily: "PlusJakartaSans-Regular" }, props.style]}
    />
  );
}
