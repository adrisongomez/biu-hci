import { NATIVE_PADDING, WEB_MAX_WIDTH, WEB_PADDING } from "@/src/constants";
import { useAppSelector } from "@/src/redux/hooks";
import useLoginForm from "@/src/usecases/auth/LoginForm/hooks";
import { useRouter } from "expo-router";
import { FC } from "react";
import { Platform, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginForm: FC = () => {
  const router = useRouter();
  const { formik, error } = useLoginForm();
  const auth = useAppSelector((state) => state.auth);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: Platform.OS === "web" ? WEB_PADDING : NATIVE_PADDING,
        maxWidth: Platform.OS === "web" ? WEB_MAX_WIDTH : undefined,
        width: Platform.OS === "web" ? "100%" : undefined,
        gap: 32,
      }}
    >
      <Text
        variant="headlineLarge"
        style={{ fontWeight: "bold", textAlign: "center" }}
      >
        Medicapp
      </Text>
      <View
        style={{
          width: "100%", // Now fills the parent's constrained width
          gap: 24,
        }}
      >
        <TextInput
          disabled={auth.status == "loading"}
          mode="outlined"
          placeholder="Email"
          onChangeText={formik.handleChange("email")}
          keyboardType="email-address"
          inputMode="email"
          autoCapitalize="none"
        />
        <TextInput
          disabled={auth.status == "loading"}
          mode="outlined"
          placeholder="Contraseña"
          onChangeText={formik.handleChange("password")}
          keyboardType="visible-password"
          autoCapitalize="none"
          inputMode="text"
          secureTextEntry
        />
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      </View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <Button
          loading={auth.status == "loading"}
          disabled={auth.status == "loading"}
          mode="contained"
          icon="arrow-left"
          onPress={formik.submitForm}
        >
          Iniciar Session
        </Button>
        <Button
          disabled={auth.status == "loading"}
          icon="account-circle-outline"
          mode="contained-tonal"
          onPress={() => {
            formik.resetForm();
            router.push("/registration");
          }}
        >
          Registrar
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default LoginForm;
