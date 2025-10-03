import { FC, ReactNode } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

const MainContainer: FC<{ children: ReactNode[] | ReactNode }> = ({
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

export default MainContainer
