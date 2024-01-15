import { createAsyncThunk, createSlice,current } from '@reduxjs/toolkit';
import { addToCart, deleteItemFromCart, fetchCount, fetchItemsByUserId, resetCart, updateCart } from './cartAPI';

const initialState = {
  status: 'idle',
  cartItems: [],
};


export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);


export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async (userId) => {
    const response = await fetchItemsByUserId(userId);
    return response.data;
  }
);


export const updateCartAsync = createAsyncThunk(
  'cart/updateCart', 
  async (update) => {
    console.log("Before db call to update , printing updated object :",update);
    const response = await updateCart(update);
    return response.data;
  }
);


export const resetCartAsync = createAsyncThunk(
  'cart/resetCart', 
  async (userId) => {
    const response = await resetCart(userId);
    return response.data;
  }
);


export const deleteItemFromCartAsync = createAsyncThunk(
  'cart/deleteItemFromCart', 
  async (itemId) => {
    const response = await deleteItemFromCart(itemId);
    console.log("recieved data after db deletion in async: ",response,response.data);
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
   
      state.value += 1;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cartItems.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cartItems = action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log("after db updation in cart , printing updated object : ",action.payload);
        console.log(state.cartItems);
        const index = state.cartItems.findIndex((item)=>item.id===action.payload.id)
        console.log("after db updation in cart , printing  object before updation in redux cartItems  state : ",current(state.cartItems[index]));


        state.cartItems[index] = action.payload;
        console.log("after db updation in cart , printing  object after updation in redux cartItems  state : ",(state.cartItems[index]));

      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.cartItems.findIndex((item)=>item.id===action.payload.id)
        state.cartItems.splice(index,1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cartItems=[]
      });

  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;


export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartItemsStatus = (state) => state.cart.status;




export default counterSlice.reducer;
