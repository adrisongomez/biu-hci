import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Platform, StyleSheet, View } from "react-native";
import { Appbar, Button, FAB } from "react-native-paper";
import { useSupabase } from "@/src/providers/SupabaseProvider";

export default function Dashboard() {
  const navigation = useNavigation();
  const supabase = useSupabase();
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Action
          icon="menu"
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
        <Appbar.Content title="Dashboard" />
        {Platform.OS === "web" && (
          <Appbar.Action title="Agregar Cita" onPress={() => {}} />
        )}
      </Appbar.Header>
      <View style={styles.content}>
        <Button mode="contained" onPress={() => supabase.auth.signOut()}>
          Logout
        </Button>
      </View>
      {Platform.OS !== "web" && (
        <FAB icon="plus" style={styles.fab} onPress={() => {}} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    right: 32,
    bottom: 16,
    borderRadius: 28,
  },
});
