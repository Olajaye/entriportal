import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  createTenant: null,
};

const tenantSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {
    tenantData: (state, { payload }) => {
      state.createTenant = payload;
    },
  },
});

export const { tenantData } = tenantSlice.actions;

export default tenantSlice.reducer;
