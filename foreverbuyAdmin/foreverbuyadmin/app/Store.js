import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../features/AddProducts/AddPrductSlice'   

export const store=configureStore({
    reducer:{
        products:productsReducer
    }
});