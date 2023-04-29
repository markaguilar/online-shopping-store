import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { initializeCartState } from "./features/cart/cartSlice";
import productReducer from "./features/product/productSlice";
import modalReducer from "./features/modal/modalSlice";
import drawerReducer from "./features/drawer/drawerSlice";

const saveToLocalStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (e) {
    console.log("Could not save state to local storage", e);
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
    drawer: drawerReducer,
    product: productReducer,
  },
  preloadedState: {
    cart: initializeCartState(),
  },
});

store.subscribe(() => {
  saveToLocalStorage(store.getState().cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
