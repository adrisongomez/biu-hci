import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Drawer as PaperDrawer } from "react-native-paper";
import { useSupabase } from "@/src/providers/SupabaseProvider";

type DrawerItem = {
  id: number;
  label: string;
  icon: string;
  route: string;
  order: number;
};

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const router = useRouter();
  const { state } = props;
  const { routes, index } = state;
  const focusedRouteName = routes[index].name;

  const [drawerItems, setDrawerItems] = useState<DrawerItem[]>([]);
  const supabase = useSupabase();

  useEffect(() => {
    const fetchDrawerItems = async () => {
      const { data, error } = await supabase
        .from("drawer_items")
        .select("*")
        .order("order", { ascending: true });

      if (error) {
        console.error("Error fetching drawer items:", error);
      } else {
        setDrawerItems(data);
      }
    };

    fetchDrawerItems();
  }, [supabase]);

  return (
    <DrawerContentScrollView {...props}>
      <PaperDrawer.Section title="Navegación">
        {drawerItems.map((item) => (
          <PaperDrawer.Item
            key={item.id}
            label={item.label}
            icon={item.icon}
            active={item.route.includes(focusedRouteName)}
            onPress={() => router.navigate(item.route as any)}
          />
        ))}
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
