// import { supabase } from "@/src/superbase/client";
import { authLogger } from "@/src/util/logger";
import { createSlice } from "@reduxjs/toolkit";
import { AuthAction_SignIn, AuthAction_SignOut } from "./actions";

export type AuthStatus = "signed" | "logout" | "loading";

export interface AuthState {
  userEmail?: string;
  status: AuthStatus;
}

const initialState: AuthState = {
  status: "logout",
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addAsyncThunk(AuthAction_SignIn, {
      fulfilled: (state, action) => {
        if (action.payload) {
          state.userEmail = action.payload;
          state.status = "signed";
          return;
        }
        state.status = "logout";
      },
      pending: (state) => {
        state.status = "loading";
      },
      rejected: (state) => {
        // supabase.auth.signOut();
        state.status = "logout";
        authLogger.info("Error present while loging: User has logged out");
      },
    });
    builder.addCase(AuthAction_SignOut, (state) => {
      // supabase.auth.signOut();
      state.status = "logout";
      authLogger.info("User has logged out");
    });
  },
});
