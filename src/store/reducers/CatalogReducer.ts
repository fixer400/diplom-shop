import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CatalogState {
  value: any;
  searchRequest: string;
}

const initialState: CatalogState = {
  value: [],
  searchRequest: "",
};

export const catalog = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setCatalog: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
    setSearchRequest: (state, action: PayloadAction<string>) => {
      state.searchRequest = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const selectCatalog = (state: RootState) => state.catalog.value;
export const selectCatalogSearch = (state: RootState) =>
  state.catalog.searchRequest;
export const { setCatalog, setSearchRequest } = catalog.actions;

export default catalog.reducer;
