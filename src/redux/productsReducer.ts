import { AsyncThunkAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  $api, { API_URL } from "../http";
import axios from "axios";
import { IProduct } from "../models/IProduct";
import { Action } from "@reduxjs/toolkit"
import { RootState } from "./store";

type ProductsState = {
    error: string,
    products: IProduct[],
    isLoading: boolean
}

const initialState: ProductsState= {
    error: "",
    products: [],
    isLoading: false
}

export const fetchProducts = createAsyncThunk(
    '/products',
    async (_, {rejectWithValue}) => {
        try {
            return await $api.get<IProduct[]>('/products/all')
            // return await axios.get(`${API_URL}/products/all`)
        } catch(error) {
            return rejectWithValue(error);
        }
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchProducts.pending.type]: (state, action) => {
            state.isLoading = true
        },
        [fetchProducts.fulfilled.type]: (state, {payload} ) => {
            state.products = payload.data
            state.isLoading = false
        },
        [fetchProducts.rejected.type]: (state, action) => {
            state.isLoading = false
            // state.error = action.payload.response.data.message
            state.error = action;
            
        },
    }
})



export const selectProducts = (state: RootState) => state.rootReducer.productsReducer.products
export const selectLoading = (state: RootState) => state.rootReducer.productsReducer.isLoading
export default productsSlice.reducer