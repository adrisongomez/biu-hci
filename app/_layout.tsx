import { store } from "@/src/redux/store";
import { supabase } from "@/src/superbase/client";
import { Slot, useRouter } from "expo-router";
import { FC, ReactNode, useEffect } from "react";
import { View } from "react-native";
import { PaperProvider, useTheme } from "react-native-paper";
import { Provider } from "react-redux";

const SessionGate: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/dashboard");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace("/dashboard");
      } else {
        router.replace("/");
      }
    });

    return () => subscription.unsubscribe();
  }, []);
  return <>{children}</>;
};

const Background: FC<{ children: ReactNode[] | ReactNode }> = ({
  children,
}) => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      {children}
    </View>
  );
};

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Background>
          <SessionGate>
            <Slot />
          </SessionGate>
        </Background>
      </PaperProvider>
    </Provider>
  );
}
