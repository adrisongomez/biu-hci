import { configureStore } from "@reduxjs/toolkit";
import { auth } from "./auth/reducer";

export const store = configureStore({
  reducer: {
    auth: auth.reducer,
  },
});

export type RooState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;