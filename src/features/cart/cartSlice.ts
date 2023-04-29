import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  productName: string;
  description: string;
  unitPrice: number;
  category: string;
  imageUrl: string;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  totalAmount: number;
  isLoading: boolean;
  totalItems: number;
  quantity: number;
}

const initialState: CartState = {
  cartItems: [],
  totalAmount: 0,
  isLoading: true,
  totalItems: 0,
  quantity: 0,
};

export const getCartItems = createAsyncThunk<CartItem[], void>(
  "cart/getCartItems",
  async (_, thunkAPI) => {
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Failed to get cart items from local storage"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cartItems.push(item);
      }

      state.totalItems = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cart"); // clear local storage
      state.totalItems = state.cartItems?.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    removeItem(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      state.cartItems.splice(itemIndex, 1);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));

      state.totalItems = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    incrementItemQuantity(state, action) {
      const { id, increment } = action.payload;
      console.log("incrementItemQuantity", action.payload);
      const cartItems = [...state.cartItems];
      const itemIndex = cartItems.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        cartItems[itemIndex].quantity += increment;
        if (cartItems[itemIndex].quantity <= 0) {
          cartItems.splice(itemIndex, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cartItems));
        state.cartItems = cartItems;
      }

      state.totalItems = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    decreaseQuantity: (state, action) => {
      const { id } = action.payload;
      const cartItems = [...state.cartItems];
      const itemIndex = cartItems.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        if (cartItems[itemIndex].quantity > 1) {
          cartItems[itemIndex].quantity -= 1;
        } else {
          cartItems.splice(itemIndex, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cartItems));
        state.cartItems = cartItems;
      }

      state.totalItems = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    calculateTotals: (state) => {
      let quantity = 0;
      let totalAmount = 0;
      state.cartItems.forEach((item) => {
        quantity += item.quantity;
        totalAmount += item.quantity * item.unitPrice;
      });
      state.totalItems = quantity;
      state.totalAmount = totalAmount;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.isLoading = false;
        state.quantity = action.payload?.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        state.totalAmount = action.payload?.reduce(
          (acc, item) => acc + item.quantity * item.unitPrice,
          0
        );
      })
      .addCase(getCartItems.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  addToCart,
  clearCart,
  removeItem,
  incrementItemQuantity,
  decreaseQuantity,
  calculateTotals,
} = cartSlice.actions;

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log("Could not load state from local storage", e);
    return undefined;
  }
};

export const initializeCartState = () => {
  return loadFromLocalStorage() ?? { cartItems: [], totalItems: 0 };
};

export default cartSlice.reducer;
