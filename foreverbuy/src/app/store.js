import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../features/products/productsSlice'   
import userReducer from '../features/User/UserSlice'

export const store=configureStore({
    reducer:{
        products:productsReducer,
        user:userReducer
    }
});