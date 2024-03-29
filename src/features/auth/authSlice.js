import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, signOut, } from './authApi';
import { updateUser } from '../user/userApi';
const initialState = {
  loggedInUser: null,
  status: 'idle',
  error:null
};


export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async (id) => {
    const response = await signOut(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (loginInfo, {rejectWithValue}) => {
   try{
    const response = await checkUser(loginInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
   }
  //  Backend ke error messages yha catch ho jayenge 
   catch(err){
    console.log(err);
    return rejectWithValue(err)  // its a inbuilt function to catch error and put it in action.payload
  
   }
  }
);



export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    increment: (state) => {
   
      state.value += 1;
    },

  },
 
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser=  action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state,action) => {
        state.status = 'loading';
        state.loggedInUser =  action.payload;
        console.log(
          "Filling loggedin user info into loggedinUser substate:"
        );
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload
      })
      .addCase(updateUserAsync.pending, (state,action) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload
      })
      .addCase(signOutAsync.pending, (state,action) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = null
      });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const selectLoggedInUser = (state)=>state.auth.loggedInUser
export const selectError = (state)=>state.auth.error







export default counterSlice.reducer;
