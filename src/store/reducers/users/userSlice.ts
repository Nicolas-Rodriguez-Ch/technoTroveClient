import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { handleReduxError } from "../../../utils/errorHandling";

import { User, UserState } from "./userInterfaces";
import { getUser, updateUserAsync } from "../../../services/userAPI";

const initialState: UserState = {
  data: null,
  status: "idle",
  error: null,
  deleted: false,
};

// get the user from the API
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUser();
      if (!response.ok) {
        throw new Error("Server responded with a non-200 status code");
      }
      const data: User = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(handleReduxError(error));
    }
  }
);

// Updates the user
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user: FormData, { rejectWithValue }) => {
    try {
      const data: User = await updateUserAsync(user);
      return data;
    } catch (error) {
      return rejectWithValue(handleReduxError(error));
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (_, { rejectWithValue }) => {
    try {
      await deleteUser();
      return null;
    } catch (error) {
      return rejectWithValue(handleReduxError(error));
    }
  }
);


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? handleReduxError(action.payload)
          : "Unknown error occurred";
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? handleReduxError(action.payload)
          : "Unknown error occurred";
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.data = null;
        state.deleted = true; // This indicates the deletion was successful
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? handleReduxError(action.payload)
          : "Unknown error occurred";
      });
  },
});

export default userSlice.reducer;
