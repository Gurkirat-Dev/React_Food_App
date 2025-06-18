import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItems: (state, action) => {
      const {item, quantity} = action.payload;
      const indexProductId = state.items.findIndex((oneItem) => oneItem.item?.info?.id === item?.info?.id);
      if(indexProductId >=0){
        state.items[indexProductId].quantity += quantity;
      }else{
        state.items.push({item,quantity});
      }
      
    },
    incrementQty:(state,action) => {
      const item = state.items.find(i => i.item.info.id === action.payload);
      if(item) item.quantity++;

    },
    decrementQty: (state,action) => {
      const item = state.items.find(i => i.item.info.id === action.payload);
      if(item && item.quantity > 1){
        item.quantity--;
      }
      else{
        const confirmation = confirm("Do You Want To Remove This Item")
        if(confirmation){
          state.items = state.items.filter((i) => i.item.info.id !== action.payload);
        }
        else return
      }
    },
    removeItems: (state, action) => {
      state.items = state.items.filter((i) => i.item.info.id !== action.payload)
    },
    clearItems: (state) => {
      state.items.length = 0;
    },
  },
});

export const { addItems, removeItems, clearItems, incrementQty,decrementQty } = cartSlice.actions;

export default cartSlice.reducer;
