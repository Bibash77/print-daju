import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

type CartState = { items: { [pid: string]: number }; isVisible: boolean };

// convert to api
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {},
    isVisible: false,
  } as CartState,
  reducers: {
    addItem(state, action) {
      const pid = action.payload as string;
      if (!state.items?.[pid]) {
        state.items[pid] = 0;
      }
      state.items[pid] += 1;
    },
    removeItem(state, action) {
      const pid = action.payload as string;
      const curr = state.items[pid];

      if (curr && curr > 0) {
        state.items[pid]--;
        if (state.items[pid] === 0) {
          delete state.items[pid];
        }
      } else {
        console.info("None in cart.");
      }
    },
    removeAll(state, action) {
      delete state.items[action.payload];
    },
    showCart(state) {
      state.isVisible = true;
    },
    hideCart(state) {
      state.isVisible = false;
    },
    emptyCart(state) {
      state.items = {};
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { addItem, removeItem, removeAll, emptyCart, showCart, hideCart } =
  cartSlice.actions;

export default cartSlice.reducer;
