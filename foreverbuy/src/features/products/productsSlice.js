import { createSlice } from '@reduxjs/toolkit';
import { products } from '../../assets/frontend_assets/assets';


const initialState = {
    products,
    bestseller: [],
    loading: false,
    error: null,
    filteredproducts: [],
    individualProduct:{}
}

const productsSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        bestsellerProducts: (state, action) => {
            const bestsellers = state.products.filter(p => p.bestseller === true);
            state.bestseller = bestsellers;
        },
        filteringProducts: (state, action) => {
           // debugger
            // Filtering code
            if (state.products.length == 0) return;

            let filtered = state.products;
           // console.log(action.payload.categories,action.payload.type);
           const { categories = [], type = [], filterbyprice } = action.payload;
           //console.log(categories,type,action.payload);
            let maxprice = Math.max(...state.products.map(p => p.price));
            let minprice = Math.min(...state.products.map(p => p.price));

            if (categories?.length > 0 ) {
                filtered = filtered.filter(p => categories.includes(p.category));
               // console.log(categories);
            }

            if (type?.length > 0) {
                filtered = filtered.filter(p => type.includes(p.subCategory));
                // setfinalfilterproducts(...filtered,filtered)
            }

            if (filterbyprice === 'sortbylowtohigh') {
                filtered = filtered.slice().sort((a, b) => a.price - b.price);
            } else if (filterbyprice === 'sortbyhightolow') {
                filtered = filtered.slice().sort((a, b) => b.price - a.price);
            } else if (filterbyprice === 'sortbyrelevant') {
                filtered = filtered.filter(p => p.price >= minprice && p.price <= maxprice);
            }
            state.filteredproducts=filtered;
            //end of filtering code
        },
        GetProductById:(state,action)=>{
            //console.log(action.payload._id)
            //debugger
            const IndProd = state.products.filter((item) => item._id === action.payload._id);
        
            state.individualProduct=IndProd||{};
        }
    }
})

export const { bestsellerProducts,filteringProducts,GetProductById } = productsSlice.actions;
export default productsSlice.reducer;