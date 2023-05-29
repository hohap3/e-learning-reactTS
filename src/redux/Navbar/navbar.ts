import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export interface NabvarState {
  hiddenNavbar: boolean;
}

const initialState: NabvarState = {
  hiddenNavbar: false,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    toggleNavbar(state) {
      state.hiddenNavbar = !state.hiddenNavbar;
    },
  },
});

// actions
export const navbarAction = navbarSlice.actions;

// selector
export const selectHiddenNavbar = (state: RootState) =>
  state.navbar.hiddenNavbar;

// reducers
const navbarReducer = navbarSlice.reducer;
export default navbarReducer;
