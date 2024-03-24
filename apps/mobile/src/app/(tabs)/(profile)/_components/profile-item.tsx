import { StyledText } from "@/src/components/styled-text";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export interface ProfileItemProps {
  title: string;
  image: string;
  price: number;
  isSold?: boolean;
}

export function ProfileItem({ title, image, price }: ProfileItemProps) {
  const router = useRouter();

  return (
    <View
      style={{ marginBottom: 10, alignSelf: "center", marginHorizontal: 10 }}
    >
      <Link href={"/(tabs)/(profile)/listing"} push asChild>
        <TouchableOpacity>
          <Image
            source={image}
            style={{
              width: "100%",
              aspectRatio: 1,
              borderRadius: 15,
              alignSelf: "center",
              marginVertical: 10,
            }}
          />
        </TouchableOpacity>
      </Link>

      <StyledText variant="medium" style={{ fontSize: 16 }}>
        {title}
      </StyledText>
      <StyledText variant="light">{`$${price}`}</StyledText>
    </View>
  );
}
