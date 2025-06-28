import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASEURL = 'http://localhost:5000';

const initialState = {
    loading: false,
    error: null,
    success: false,
    productdata: {}
};


const AddProducts = createAsyncThunk(
    'Product/AddProduct',
    async (productdata, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASEURL}/api/addproduct`, productdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return response.data;
        } catch (error) {
            console.log(error.response?.data || error.message, productdata)
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


const productsSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddProducts.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(AddProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.productdata = action.payload;
            })
            .addCase(AddProducts.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.productdata = {};
                state.error = action.payload;
            });
    }
});


export  {AddProducts}
export default productsSlice.reducer;
