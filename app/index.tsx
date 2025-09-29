import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { useFormik } from "formik";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const theme = useTheme();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit(d) {
      console.log(d);
    },
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
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
          maxWidth: 460,
          minWidth: 360,
          width: "100%",
          gap: 24,
        }}
      >
        <TextInput
          mode="outlined"
          placeholder="Email"
          onChangeText={formik.handleChange("email")}
          keyboardType="email-address"
          inputMode="email"
          autoCapitalize="none"
          style={{
            borderRadius: theme.roundness,
          }}
        />
        <TextInput
          mode="outlined"
          placeholder="Contraseña"
          onChangeText={formik.handleChange("password")}
          keyboardType="visible-password"
          autoCapitalize="none"
          inputMode="text"
          secureTextEntry
          style={{
            borderRadius: theme.roundness,
          }}
        />
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
          mode="contained"
          icon="arrow-left"
          labelStyle={theme.fonts.titleLarge}
          onPress={formik.submitForm}
        >
          Iniciar Session
        </Button>
        <Button
          icon="account-circle-outline"
          mode="contained-tonal"
          labelStyle={theme.fonts.titleLarge}
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
}
