import { createSlice } from "@reduxjs/toolkit";
import { setUser } from "../actions";

export interface IUserSlice {
  user: any | null; // @TODO: also defined user type
  loading: boolean;
}

const initialState: IUserSlice = {
  user: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(setUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(setUser.rejected, (state) => {
      state.loading = false;
      state.user = null;
    });
  },
});

export default userSlice.reducer;
