import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { handleReduxError } from '../../../utils/errorHandling';

import { LoginResponse, User, UserState } from './userInterfaces';
import {
  authenticateUser,
  getUser,
  updateUserAsync,
  deleteUserAsync,
} from '../../../services/userAPI';

const initialState: UserState = {
  data: null,
  status: 'idle',
  error: null,
  deleted: false,
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const data: LoginResponse = await authenticateUser(credentials);
      return data;
    } catch (error) {
      return rejectWithValue(handleReduxError(error));
    }
  }
);

// get the user from the API
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUser();
      if (!response.ok) {
        throw new Error('Server responded with a non-200 status code');
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
  'user/updateUser',
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
  'user/deleteUser',
  async (_, { rejectWithValue }) => {
    try {
      await deleteUserAsync();
      return null;
    } catch (error) {
      return rejectWithValue(handleReduxError(error));
    }
  }
);


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.status = 'succeeded';
          state.data = action.payload;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload
          ? handleReduxError(action.payload)
          : 'Unknown error occurred';
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload
          ? handleReduxError(action.payload)
          : 'Unknown error occurred';
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload
          ? handleReduxError(action.payload)
          : 'Unknown error occurred';
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.data = null;
        state.deleted = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload
          ? handleReduxError(action.payload)
          : 'Unknown error occurred';
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;