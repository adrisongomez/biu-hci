import { supabase } from "@/src/superbase/client";
import { appLogger } from "@/src/util/logger";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import { StyleSheet, View } from "react-native";
import { Appbar, Button, HelperText, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

type RegistrationFormState = {
  name: string;
  lastName: string;
  nationalId: string;
  email: string;
  password: string;
  confirmPassword: string;
  hidePassword: boolean;
  hideConfirmPassword: boolean;
};

const InitialState: RegistrationFormState = {
  name: "",
  nationalId: "",
  email: "",
  confirmPassword: "",
  lastName: "",
  password: "",
  hideConfirmPassword: true,
  hidePassword: true,
};

const RegistrationFormValidationSchema = Yup.object({
  name: Yup.string().required(),
  lastName: Yup.string().required(),
  nationalId: Yup.string().min(11).required(),
  email: Yup.string().email().trim().strict().required(),
  password: Yup.string()
    .min(8, "La contraseña debe tener minimo 8 caracteres")
    .required("Obligatorio")
    .trim()
    .strict(),
  confirmPassword: Yup.string()
    .required("Obligatorio")
    .when("password", (value, field) => {
      return value
        ? field
            .required("La contraseña deben ser iguales")
            .oneOf([Yup.ref("password")])
        : field;
    }),
});

export default function RegistrationPage() {
  const formik = useFormik<RegistrationFormState>({
    validationSchema: RegistrationFormValidationSchema,
    initialValues: InitialState,
    async onSubmit(d) {
      appLogger.info("Submitting signup into superbase")
      await supabase.auth.signUp({
        email: d.email,
        password: d.password,
      });
      appLogger.info("Successful call for signup into superbase: User Authenticated")
    },
  });
  const router = useRouter();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      <Appbar>
        <Appbar.BackAction
          onPress={() => {
            formik.resetForm();
            router.back();
          }}
        />
        <Appbar.Content title="Formulario de Registro" />
      </Appbar>
      <View style={styles.container}>
        <TextInput
          mode="outlined"
          placeholder="Nombres"
          value={formik.values.name}
          onChangeText={formik.handleChange("name")}
          error={formik.touched.name && !!formik.errors.name}
        />
        <TextInput
          mode="outlined"
          placeholder="Apellidos"
          value={formik.values.lastName}
          onChangeText={formik.handleChange("lastName")}
          error={formik.touched.lastName && !!formik.errors.lastName}
        />
        <TextInput
          mode="outlined"
          placeholder="No. Identification o ID"
          value={formik.values.nationalId}
          onChangeText={formik.handleChange("nationalId")}
          error={formik.touched.nationalId && !!formik.errors.nationalId}
        />
        <TextInput
          mode="outlined"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          inputMode="email"
          onChangeText={formik.handleChange("email")}
          error={formik.touched.email && !!formik.errors.email}
        />
        <View>
          <TextInput
            mode="outlined"
            keyboardType="default"
            autoCapitalize="none"
            inputMode="text"
            placeholder="Contraseña"
            onChangeText={formik.handleChange("password")}
            error={formik.touched.password && !!formik.errors.password}
            secureTextEntry={formik.values.hidePassword}
            right={
              <TextInput.Icon
                icon={formik.values.hidePassword ? "eye" : "eye-off"}
                onPress={() =>
                  formik.setFieldValue(
                    "hidePassword",
                    !formik.values.hidePassword
                  )
                }
              />
            }
          />
          {formik.touched.password && !!formik.errors.password && (
            <HelperText type="error">{formik.errors.password}</HelperText>
          )}
        </View>
        <View>
          <TextInput
            mode="outlined"
            keyboardType="visible-password"
            autoCapitalize="none"
            inputMode="none"
            placeholder="Confirmar contraseña"
            onChangeText={formik.handleChange("confirmPassword")}
            error={
              formik.touched.confirmPassword && !!formik.errors.confirmPassword
            }
            secureTextEntry={formik.values.hideConfirmPassword}
            right={
              <TextInput.Icon
                icon={formik.values.hideConfirmPassword ? "eye" : "eye-off"}
                onPress={() =>
                  formik.setFieldValue(
                    "hideConfirmPassword",
                    !formik.values.hideConfirmPassword
                  )
                }
              />
            }
          />

          {formik.touched.confirmPassword &&
            !!formik.errors.confirmPassword && (
              <HelperText type="error">
                {formik.errors.confirmPassword}
              </HelperText>
            )}
        </View>

        <View style={styles.btnContainer}>
          <Button
            container
            style={styles.btnStyles}
            icon="arrow-right"
            mode="contained"
            onPress={formik.submitForm}
            disabled={!formik.isValid}
          >
            Registrar
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 23,
  },
  btnStyles: {
    padding: 4,
    borderRadius: 32,
  },
  btnContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
