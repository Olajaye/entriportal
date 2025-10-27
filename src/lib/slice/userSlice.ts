import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  token: null,
  profile: null,
  user: null,
  updatePassData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      state.user = payload;
    },
    updateProfile: (state, { payload }) => {
      state.profile = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    updatePassword: (state, { payload }) => {
      state.updatePassData = payload;
    },
    logoutUser: () => initialState,
  },
});

export const { loginUser, logoutUser, updateProfile, setUser, updatePassword } =
  userSlice.actions;

export default userSlice.reducer;
