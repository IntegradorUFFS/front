import { createSlice } from "@reduxjs/toolkit";

interface IStore {
  oauth:
    | {
        type: string;
        token: string;
      }
    | undefined;
  user:
    | {
        id: number;
        name: string;
        email: string;
        picture: string;
        tenant?: string;
      }
    | undefined;
  role: "admin" | "user" | undefined;

  logged: boolean;
}

const initialState: IStore = {
  oauth: undefined,
  user: undefined,
  role: undefined,

  logged: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      const role = action.payload.user.role as "admin" | "user";
      state.role = role;
      state.oauth = {
        type: "bearer",
        token: action.payload.token,
      };
      state.user = {
        email: action.payload.user.email,
        id: action.payload.user.id,
        name: action.payload.user.name,
        picture: action.payload.user.picture,
        tenant: action.payload.user.tenant,
      };
      state.logged = true;
    },
    refresh: (state, action) => {
      const role = action.payload.user.role as "admin" | "user";
      state.role = role;
      state.oauth = {
        type: "bearer",
        token: action.payload.token,
      };
      state.user = {
        email: action.payload.user.email,
        id: action.payload.user.id,
        name: action.payload.user.name,
        picture: action.payload.user.picture,
        tenant: action.payload.user.tenant,
      };
    },
    signOut: (state) => {
      state.oauth = initialState.oauth;
      state.user = initialState.user;
      state.role = initialState.role;
      state.logged = initialState.logged;
      localStorage.clear();
    },
  },
});

export default authSlice.reducer;
