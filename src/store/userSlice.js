import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import agent from "../agent";

const initialState = {
  user: null,
  isLoading: false,
  hasError: false,
}

export const login = createAsyncThunk('user/login',
  async (body) => {
    return agent.Auth.login(body)
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getLoggedIn: (state) => {
      return !!state.user;
    },
    logOut: (state) => {
      state.user = null;
    }
  },
  extraReducers: ({addCase}) => {
    addCase(login.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });
    addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.hasError = false;
      console.log('logged in user', state.user)
    });
    addCase(login.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
      console.log("error")
    });
  }
})

export default userSlice.reducer;
export const {getLoggedIn, logOut} = userSlice.actions;