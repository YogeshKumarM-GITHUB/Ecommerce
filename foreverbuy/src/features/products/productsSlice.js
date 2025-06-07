import { createSlice } from '@reduxjs/toolkit';
import { products } from '../../assets/frontend_assets/assets';


const initialState = {
    products,
    bestseller: [],
    loading: false,
    error: null
}

const productsSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        bestsellerProducts: (state, action) => {
            const bestsellers = state.products.filter(p => p.bestseller === true);
            state.bestseller = bestsellers;
        }
    }
})

export const { bestsellerProducts } = productsSlice.actions;
export default productsSlice.reducer;