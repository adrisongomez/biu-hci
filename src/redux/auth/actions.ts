// import { supabase } from "@/src/superbase/client";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";


export type UserCredential = {
  email: string;
  password: string;
};

export const AuthAction_SignIn = createAsyncThunk(
  "auth/login",
  async (credentials: UserCredential): Promise<string | undefined> => {
    // const session = await supabase.auth.signInWithPassword({
    //   email: credentials.email,
    //   password: credentials.password,
    // });
    // if (session.error) {
    //   authLogger.error("Error trying to signIn user", session.error);
    //   return;
    // }
    // authLogger.info("User got logged in successfully");
    return credentials.email;
  }
);

export const AuthAction_SignOut = createAction(
    'auth/logout'
)
