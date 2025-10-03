import PageLoader from "@/src/components/PageLoader";
import { AuthAction_SetState } from "@/src/redux/auth/actions";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { getSupabase } from "@/src/superbase/client";
import { appLogger } from "@/src/util/logger";
import { usePathname, useRouter } from "expo-router";
import { FC, ReactNode, useEffect } from "react";

const authLogger = appLogger.extend("AuthProvider");

const Auth: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        dispatch(
          AuthAction_SetState({ status: "signed", user: session.user })
        );
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      authLogger.info("AuthEvent recieved", _event);
      if (
        _event === "SIGNED_IN" ||
        _event === "INITIAL_SESSION" ||
        _event === "USER_UPDATED"
      ) {
        dispatch(
          AuthAction_SetState({ status: "signed", user: session?.user })
        );
      } else if (_event === "SIGNED_OUT") {
        dispatch(AuthAction_SetState({ status: "logout", user: undefined }));
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    authLogger.debug({ pathname, authState });

    // Wait for the auth state to be determined
    if (authState.status === "loading") {
      return;
    }

    const isSigned = authState.status === "signed";
    const isAuthScreen = pathname === "/";

    if (!isSigned && !isAuthScreen) {
      authLogger.info("User not signed in, redirecting to login");
      router.replace("/");
    } else if (isSigned && isAuthScreen) {
      authLogger.info("User signed in, redirecting to dashboard");
      router.replace("/dashboard");
    }
  }, [authState, pathname, router]);

  return (
    <>
      {children}
      {authState.status === "loading" && <PageLoader />}
    </>
  );
};

export default Auth;
