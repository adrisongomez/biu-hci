import { AuthAction_SetState } from "@/src/redux/auth/actions";
import { useAppDispatch } from "@/src/redux/hooks";
import { useSupabase } from "@/src/providers/SupabaseProvider";
import { appLogger } from "@/src/util/logger";
import { useFormik } from "formik";
import { useState } from "react";

const authLogger = appLogger.extend("useLoginForm");

export default function useLoginForm() {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const supabase = useSupabase();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    async onSubmit(data) {
      authLogger.info("SignIn Attempt got called");
      setError(null);
      dispatch(AuthAction_SetState({ status: "loading" }));
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (signInError) {
        dispatch(AuthAction_SetState({ status: "logout" }));
        setError("Usuario o contraseña es inválida");
        return;
      }
      authLogger.info("SignIn Successfully: User Authenticated");
    },
  });
  return {
    formik,
    error,
  };
}
