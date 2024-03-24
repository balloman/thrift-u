import { forwardRef } from "react";
import { TouchableOpacity, type TouchableOpacityProps } from "react-native";
import { StyledText, type StyledTextProps } from "./styled-text";
import { THEME } from "./styles";

interface StyledButtonProps extends TouchableOpacityProps {
  children: string;
  labelStyle?: StyledTextProps["style"];
}

function InnerStyledButton(
  { children, labelStyle, ...props }: StyledButtonProps,
  ref: React.ForwardedRef<TouchableOpacity>,
) {
  return (
    <TouchableOpacity
      ref={ref}
      {...props}
      style={[
        {
          backgroundColor: THEME.colors.light.primary,
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
        },
        props.style,
      ]}
    >
      <StyledText style={[{ color: "black" }, labelStyle]} variant="bold">
        {children}
      </StyledText>
    </TouchableOpacity>
  );
}

export const StyledButton = forwardRef(InnerStyledButton);
