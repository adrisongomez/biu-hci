import { PaperProvider, useTheme } from "react-native-paper";
import { Slot } from "expo-router";
import { FC, ReactNode } from "react";
import { View } from "react-native";

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
    <PaperProvider>
      <Background>
        <Slot />
      </Background>
    </PaperProvider>
  );
}
