import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../features/AddProducts/AddProductSlice'   
import adminuserReducer from '../features/AdminSlice'

export const store=configureStore({
    reducer:{
        products:productsReducer,
        admin:adminuserReducer
    }
})