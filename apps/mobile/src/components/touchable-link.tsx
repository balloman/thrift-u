import { Link, type AllRoutes, type LinkProps } from "expo-router";
import { TouchableOpacity, type TouchableOpacityProps } from "react-native";

type TouchableLinkProps = TouchableOpacityProps & LinkProps<AllRoutes>;

export function TouchableLink(props: TouchableLinkProps) {
  return (
    <Link asChild href={props.href} push={props.push}>
      <TouchableOpacity {...props} />
    </Link>
  );
}
