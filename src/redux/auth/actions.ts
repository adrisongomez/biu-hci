import { createAction } from "@reduxjs/toolkit";
import { AuthState } from "./reducer";


export const AuthAction_SetState = createAction<AuthState>(
    'auth/set_state'
)
