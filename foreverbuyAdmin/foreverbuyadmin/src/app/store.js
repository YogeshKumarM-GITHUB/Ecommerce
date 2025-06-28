import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../features/AddProducts/AddProductSlice'   

export const store=configureStore({
    reducer:{
        products:productsReducer
    }
})