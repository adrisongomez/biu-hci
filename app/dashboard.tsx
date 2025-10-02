import { supabase } from "@/src/superbase/client";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function Dashboard() {
  return (
    <View
      style={{ flex: 1, backgroundColor: "red", justifyContent: "center" }}
    >
      <Text>Dashboard</Text>
      <Button mode="contained" onPress={() => supabase.auth.signOut()}>
        Logout
      </Button>
    </View>
  );
}
