import { getSupabase } from "@/src/superbase/client";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Appbar, Button, FAB } from "react-native-paper";

export default function Dashboard() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Action
          icon="menu"
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
        <Appbar.Content title="Dashboard" />
      </Appbar.Header>
      <View style={styles.content}>
        <Button mode="contained" onPress={() => getSupabase().auth.signOut()}>
          Logout
        </Button>
      </View>
      <FAB icon="plus" style={styles.fab} onPress={() => {}} />
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
