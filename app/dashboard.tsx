import { supabase } from "@/src/superbase/client";
import { View } from "react-native";
import { Appbar, Button } from "react-native-paper";

export default function Dashboard() {
  return (
    <View>
      <Appbar>
        <Appbar.Content title="Dashboard" />
      </Appbar>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button mode="contained" onPress={() => supabase.auth.signOut()}>
          Logout
        </Button>
      </View>
    </View>
  );
}
