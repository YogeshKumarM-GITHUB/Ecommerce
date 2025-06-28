import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    products,
    loading: false,
    error: null
}

const productsSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        
    }
})


export default productsSlice.reducer;