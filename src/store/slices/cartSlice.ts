import {
  CancelOrderOption,
  CartItem,
  CartSlice,
  CreateOrderOption,
} from "@/types/cart";
import { config } from "@/utlis/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: CartSlice = {
  items: [],
  isLoading: false,
  error: null,
};
export const createOrder = createAsyncThunk(
  "cart/confirmOrder",
  async (options: CreateOrderOption, thunkApi) => {
    const { payload, onSuccess, onError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/order`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const dataFromServer = await response.json();
      onSuccess && onSuccess(dataFromServer);
    } catch (err) {
      onError && onError(err);
    }
  }
);
export const cancelOrder = createAsyncThunk(
  "cart/confirmOrder",
  async (options: CancelOrderOption, thunkApi) => {
    const { orderId, onSuccess, onError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/order/${orderId}`, {
        method: "DELETE",
      });

      onSuccess && onSuccess();
    } catch (err) {
      onError && onError(err);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    updateQuantity: (state, action) => {
      const quantity = action.payload.quantity;
      if (!quantity) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.items = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
      }
    },
  },
});

export const { addToCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
