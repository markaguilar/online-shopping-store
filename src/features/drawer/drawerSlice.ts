import { createSlice } from "@reduxjs/toolkit";

const drawerSlice = createSlice({
  name: "drawer",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
