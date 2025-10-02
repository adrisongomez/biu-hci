import useLoginForm from "@/src/usecases/LoginForm/hooks";
import { useRouter } from "expo-router";
import { FC } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginForm: FC = () => {
  const router = useRouter();
  const { formik } = useLoginForm();
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
        />
        <TextInput
          mode="outlined"
          placeholder="Contraseña"
          onChangeText={formik.handleChange("password")}
          keyboardType="visible-password"
          autoCapitalize="none"
          inputMode="text"
          secureTextEntry
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
};

export default LoginForm;
