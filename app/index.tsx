import { supabase } from "@/src/superbase/client";
import { appLogger } from "@/src/util/logger";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import { View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const theme = useTheme();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    async onSubmit(d) {
      appLogger.info("SignIn Attempt got called")
      const data = await supabase.auth.signInWithPassword({
        email: d.email,
        password: d.password,
      });
      console.log(data)
      appLogger.info("SignIn Successfully: User Authenticated")
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
        <Button mode="contained" icon="arrow-left" onPress={formik.submitForm}>
          Iniciar Session
        </Button>
        <Button
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
}
