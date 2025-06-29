import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASEURL = 'http://localhost:5000';

const initialState = {
    loading: false,
    error: null,
    success: false,
    productdata: {},
    listofproducts:[]
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

const GetAllProducts=createAsyncThunk(
    'Product/GetAllProducts',
    async()=>{
        try{
              const response=await axios.get(`${BASEURL}/api/getproducts`);
              return response.data;
        }
        catch(error){
           console.log(error.response?.data || error.message)
        }
    }
)

const DeleteProductById=createAsyncThunk(
    'Product/DeleteProductById',
     async(_id)=>{
           try{
                 console.log(_id,"delId")
                  const response=await axios.delete(`${BASEURL}/api/delproduct/${_id}`);
                  return response.data;
           }
           catch(error){
            console.log(error.response);
           }
    }
)


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
            })
            .addCase(GetAllProducts.pending,(state)=>{
                state.loading=true;
                state.success=false;
                state.error=null;
            }).addCase(GetAllProducts.fulfilled,(state,action)=>{
                state.loading=false;
                state.success=true;
                state.listofproducts=action.payload.data;
            }).addCase(GetAllProducts.rejected,(state,action)=>{
                state.loading=false;
                state.success=false;
                state.listofproducts=null;
                state.error=true;
            }).addCase(DeleteProductById.pending,(state)=>{
                state.loading=true;
                state.success=false;
            }).addCase(DeleteProductById.fulfilled,(state,action)=>{
                state.loading=false;
                state.success=true;
            }).addCase(DeleteProductById.rejected,(state)=>{
                state.loading=false;
                state.success=false;
            });
    }
});


export  {AddProducts,GetAllProducts, DeleteProductById}
export default productsSlice.reducer;
