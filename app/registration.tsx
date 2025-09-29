import { useRouter } from "expo-router";
import { useFormik } from "formik";
import { Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegistrationPage() {
  const formik = useFormik({
    initialValues: {},
    onSubmit(d) {
      console.log(d);
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
        <Appbar.Content title="Registro de Usuarios" />
      </Appbar>
    </SafeAreaView>
  );
}
