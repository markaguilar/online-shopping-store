import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// sample data
import items from "../../data/items.json";

interface Item {
  id: string;
  productName: string;
  description: string;
  unitPrice: number;
  category: string;
  imageUrl: string;
}

interface CartState {
  items: Item[];
  filteredItems: Item[];
  isLoading: boolean;
  selectedCategory: string | null;
}

const initialState: CartState = {
  items: [],
  isLoading: false,
  selectedCategory: "",
  filteredItems: [],
};

export const getItems = createAsyncThunk<Item[], void>(
  "product/getItems",
  async (_, thunkAPI) => {
    try {
      return items || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Failed to get cart items from local storage"
      );
    }
  }
);

export const filterItemsByCategory = createAsyncThunk<Item[], string>(
  "product/filterItemsByCategory",
  async (category, thunkAPI) => {
    try {
      return items?.filter(
        (item: { category: string }) => item.category === category
      );
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to filter items by category");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    sortItemsByPriceHighToLow: (state) => {
      state.items.sort((a, b) => b.unitPrice - a.unitPrice);
    },

    sortItemsByPriceLowToHigh: (state) => {
      state.items.sort((a, b) => a.unitPrice - b.unitPrice);
    },
    selectCategory: (state, action) => {
      state.items = state.items.filter(
        (item) => item.category === action.payload.toLowerCase()
      );
      console.log("state " + action.payload.toUpperCase());
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(getItems.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(filterItemsByCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(filterItemsByCategory.fulfilled, (state, action) => {
        state.filteredItems = action.payload;
        state.isLoading = false;
      })
      .addCase(filterItemsByCategory.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const selectCategory = createAction<string | null>(
  "product/selectCategory"
);

export const { sortItemsByPriceHighToLow, sortItemsByPriceLowToHigh } =
  productSlice.actions;

export default productSlice.reducer;
