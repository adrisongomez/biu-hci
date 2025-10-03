import { createSlice } from "@reduxjs/toolkit";
import { AuthAction_SetState } from "./actions";
import { User } from "@supabase/supabase-js";

export type AuthStatus = "signed" | "logout" | "loading";

export interface AuthState {
  status: AuthStatus;
  user?: User;
}

const initialState: AuthState = {
  status: "logout",
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {},
    extraReducers: (builder) => {
      builder.addCase(AuthAction_SetState, (state, action) => {
        return action.payload;
      });
    }, });
