import { createSlice } from "@reduxjs/toolkit";

const initialState = { fullName: "", nationalId: "", createdAT: "" };

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, customerId) {
        return {
          payload: {
            fullName,
            customerId,
            createdAT: new Date().toISOString(),
          },
        };
      },

      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.customerId = action.payload.customerId;
        state.createdAT = action.payload.createdAT;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;
