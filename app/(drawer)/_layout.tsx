import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { useRouter } from "expo-router";
import { Drawer as PaperDrawer } from "react-native-paper";

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const router = useRouter();
  const { state } = props;
  const { routes, index } = state;
  const focusedRouteName = routes[index].name;

  return (
    <DrawerContentScrollView {...props}>
      <PaperDrawer.Section title="Navegación">
        <PaperDrawer.Item
          label="Dashboard"
          icon="view-dashboard"
          active={focusedRouteName === "dashboard"}
          onPress={() => router.navigate("/(drawer)/dashboard")}
        />
      </PaperDrawer.Section>
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false, // We use our own Appbar in each screen
      }}
    >
      <Drawer.Screen
        name="dashboard" // This corresponds to dashboard.tsx
        options={{
          drawerLabel: "Dashboard",
          title: "Dashboard",
        }}
      />
    </Drawer>
  );
}
