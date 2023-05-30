import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { createWrapper } from "next-redux-wrapper";
import cartReducer from "./cartSlice";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorage";
import { isServer } from "../utils/environment";
import { productApi } from "./productApi";
import { userApi } from "./userApi";

const combinedReducer = combineReducers({
  // Example of API-based global state management + fetching
  [productApi.reducerPath]: productApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  // Example pure client-side global state management, "derived state"
  cart: cartReducer,
});

const makeStore = () => {
  const configuredStore = configureStore({
    reducer: combinedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productApi.middleware).concat(userApi.middleware),
    // use loadFromLocalStorage to overwrite any values
    // that we already have saved
    preloadedState: loadFromLocalStorage(),
    devTools: process.env.NODE_ENV !== "production",
  });

  // listen for store changes and use saveToLocalStorage to
  // save them to localStorage, only on client side
  if (!isServer()) {
    configuredStore.subscribe(() => {
      saveToLocalStorage(configuredStore.getState());
    });
  }

  // Leaving this on prevents the localStorage from updating
  // setupListeners(configuredStore.dispatch);

  return configuredStore;
};

export const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper(makeStore, { debug: true });
