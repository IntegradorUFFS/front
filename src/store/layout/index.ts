import { createSlice } from "@reduxjs/toolkit";

interface IStore {
  sidebarActive: boolean;
  breadcrumb?: string | React.ReactNode;
}

const initialState: IStore = {
  sidebarActive: true,
  breadcrumb: undefined,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarActive = !state.sidebarActive;
    },
    setBreadcrumb: (state, action) => {
      state.breadcrumb = action.payload;
    },
    disableBreadcrumb: (state) => {
      state.breadcrumb = undefined;
    },
  },
});

export default layoutSlice.reducer;
