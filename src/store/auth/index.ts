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
        first_name: string;
        last_name: string;
        email: string;
      }
    | undefined;
  role: string | undefined;
  permissions: string[];
}

const initialState: IStore = {
  oauth: undefined,
  user: undefined,
  role: undefined,
  permissions: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      const { role } = action.payload.data;
      state.role = role;
      state.permissions = [];
      delete action.payload.data.role;
      state.oauth = {
        type: "bearer",
        token: action.payload.data.token,
      };
      delete action.payload.data.token;
      state.user = action.payload.data;
    },
  },
});

export const { signIn } = authSlice.actions;

export default authSlice.reducer;
