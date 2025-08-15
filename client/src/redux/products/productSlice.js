import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    selectedProduct: {},
    error: null,
    loading: false
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts:(state, action)=>{
            state.products = action.payload;
        },
        setSelectedProduct:(state, action)=>{
            state.selectedProduct = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
})
export const {
    setProducts,
    setLoading,
    setError,
    setSelectedProduct
} = productSlice.actions;

export default productSlice.reducer;
