import { FC, ReactNode } from "react";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const MainContainer: FC<{ children: ReactNode[] | ReactNode }> = ({
  children,
}) => {
  const theme = useTheme();
  return (
    <SafeAreaView
      edges={["right", "bottom", "left"]}
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      {children}
    </SafeAreaView>
  );
};

export default MainContainer;
