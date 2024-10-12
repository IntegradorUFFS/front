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
  role: "admin" | "manager" | "viewer" | undefined;
  permissions: string[] | undefined;
}

const initialState: IStore = {
  oauth: undefined,
  user: undefined,
  role: undefined,
  permissions: undefined,
};

const permissionsByRoles = {
  viewer: ["material.view", "locationMaterial.view"],
  manager: [
    "material.view",
    "material.management",
    "locationMaterial.view",
    "locationMaterial.management",
    "transaction.view",
    "category.view",
    "category.management",
    "unit.view",
    "unit.management",
    "user.view",
    "user.management",
    "location.view",
    "location.management",
  ],
  admin: [
    "material.view",
    "material.management",
    "locationMaterial.view",
    "locationMaterial.management",
    "transaction.view",
    "category.view",
    "category.management",
    "unit.view",
    "unit.management",
    "user.view",
    "user.management",
    "location.view",
    "location.management",
  ],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      const role = action.payload.data.role as "admin" | "manager" | "viewer";
      state.permissions = permissionsByRoles[role];
      delete action.payload.data.role;
      state.oauth = {
        type: "bearer",
        token: action.payload.data.token,
      };
      delete action.payload.data.token;
      state.user = action.payload.data;
    },
    signOut: (state) => {
      state.oauth = initialState.oauth;
      state.user = initialState.user;
      state.role = initialState.role;
      state.permissions = initialState.permissions;
      localStorage.clear();
    },
  },
});

export const { signIn } = authSlice.actions;

export default authSlice.reducer;
