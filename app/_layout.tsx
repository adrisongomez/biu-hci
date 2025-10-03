import MainContainer from "@/src/components/containers/MainContainer";
import { store } from "@/src/redux/store";
import Auth from "@/src/usecases/auth/Auth";
import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";


export default function RootLayout() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <MainContainer>
          <Auth>
            <Slot />
          </Auth>
        </MainContainer>
      </PaperProvider>
    </Provider>
  );
}
