import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchAllOrders, fetchCount, updateOrder } from './orderApi';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder:null,
  totalOrders:0
};
//we may need more info about placed order , so store recently placed order in current order 

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (order) => {
    const response = await updateOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async ({sort,pagination}) => {
    const response = await fetchAllOrders(sort,pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


// ऑर्डर को reset करने के लिए हम normal reducer का use कर सकते है , क्योंकि वो लोकल state मे है न की db मे 

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
   resetOrder:(state)=>{
    state.currentOrder=null
   }

  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder=action.payload   // latest order ki puri info yha hai, orders array me pushed recent order ki info yha aa jayegi
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders=action.payload.orders   // latest order ki puri info yha hai
        state.totalOrders=action.payload.totalOrders 
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.orders.findIndex(order=>order.id=== action.payload.id)
        state.orders[index] = action.payload;
      });
  },
});

export const {resetOrder } = orderSlice.actions
export  const selectCurrentOrder = (state)=>state.order.currentOrder
export  const selectTotalOrders = (state)=>state.order.orders
export  const selectTotalOrdersCount = (state)=>state.order.totalOrders

export default orderSlice.reducer;
