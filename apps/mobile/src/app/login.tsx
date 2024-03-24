import * as AppleAuthentication from "expo-apple-authentication";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { View } from "react-native";
import { trpc } from "../api/api";
import { StyledText } from "../components/styled-text";

export default function LoginScreen() {
  const loginMutation = trpc.signIn.useMutation();

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{ headerTitle: "Login", headerShadowVisible: false }}
      />
      <Image
        source={require("../../assets/images/login.png")}
        style={{ width: "100%", aspectRatio: 1.5 }}
      />
      <View style={{ marginHorizontal: 20 }}>
        <StyledText
          variant="bold"
          style={{ fontSize: 28, textAlign: "center", marginTop: 20 }}
        >
          Join a community of students who love shopping secondhand!
        </StyledText>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: "30%",
          flex: 1,
        }}
      >
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={
            AppleAuthentication.AppleAuthenticationButtonType.CONTINUE
          }
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={{ width: 200, height: 44 }}
          onPress={async () => {
            try {
              const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                ],
              });
              const identityToken = credential.identityToken;
              if (!identityToken) {
                throw new Error("Apple Sign In failed: no identity token");
              }
              console.log(credential);
              const result = await loginMutation.mutateAsync({
                appleToken: identityToken,
              });
              if (!result.success && result.error === "User not found") {
                console.log("User not found, redirecting to sign up.");
              }
            } catch (e) {
              // @ts-expect-error - TypeScript doesn't know about the code property
              if (e.code === "ERR_CANCELED") {
                console.log("User cancelled Apple Sign In.");
              } else {
                console.error(e);
              }
            }
          }}
        />
      </View>
    </View>
  );
}
