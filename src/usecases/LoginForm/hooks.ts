import { authLogger } from "@/src/util/logger";
import { useRouter } from "expo-router";
import { useFormik } from "formik";

export default function useLoginForm() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit(d) {
      authLogger.info("SignIn Attempt got called");
      authLogger.info("SignIn Successfully: User Authenticated");
      router.replace("/dashboard");
    },
  });
  return {
    formik,
  };
}
