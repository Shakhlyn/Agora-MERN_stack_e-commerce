import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("auth", JSON.stringify(action.payload));

      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("expirationTime", expirationTime);
    },

    logout: (state, action) => {
      localStorage.clear(); //if we want that the next user doesn't inherit the previous user's cart and shipping info
      state.userInfo = null;
      // localStorage.removeItem("userInfo"); //only remove the item of userInfor
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
