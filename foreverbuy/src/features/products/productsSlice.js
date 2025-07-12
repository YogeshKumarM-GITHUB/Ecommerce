import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
// import { products } from '../../assets/frontend_assets/assets';

const BASEURL = 'http://localhost:5000';
const initialState = {
    listofproducts:[],
    bestseller: [],
    loading: false,
    error: null,
    filteredproducts: [],
    individualProduct: {},
    globalsearch: false,
    cart: [],
    ordereddetails: { }
    ,placeorder:{}
}


const GetAllProducts=createAsyncThunk(
    'Product/GetAllProducts',
    async()=>{
         try{
            //debugger;
              const response=await axios.get(`${BASEURL}/api/getproducts`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              });
            //  debugger;
              console.log(response.data,"Products")
              return response.data;
         }
         catch(error){
            console.log(error.response?.data || error.message)
         }
    }
)

const Getbestsellerproducts=createAsyncThunk(
    'Product/Getbestsellerproducts',
    async()=>{
        try{
            const response=await axios.get(`${BASEURL}/api/getbestsellerproducts`,{headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
            });
            return response.data;
        }
        catch(error){
            console.log(error.response?.data || error.message)
        }
    }
)

const GetSingleProduct=createAsyncThunk(
    'Product/GetSingleProd',
    async({_id})=>{
        try{
               // console.log(_id);
                const response=await axios.get(`${BASEURL}/api/getsingleproduct/${_id}`,{headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            });
//console.log(response.data);
               return  response.data;
        }
        catch(error){
            console.log(error.response?.data||error.message)
        }
    }
)

const PLaceOrder=createAsyncThunk('Product/PlaceOrder',async({cartData})=>{
    try{
      //  debugger;
       const response=await axios.post(`${BASEURL}/api/placeorder/addcartitems`,cartData,{headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            });
//console.log(response.data);
               return  response.data;
    }
    catch(error){
        console.log(error.response?.data||error.message)
    }
})

const OrderedDetails=createAsyncThunk('Product/IndOrders',async({_id})=>{
    try{
             // debugger;
              const response=await axios.get(`${BASEURL}/api/placeorder/fetchorders/${_id}`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
              })
              console.log(response.data,"orderdetails");
              return response.data;
    }
    catch(error){
        console.log(error.response?.data||error.message)
    }
})


const productsSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        filteringProducts: (state, action) => {
            if (state.listofproducts.length == 0) return;
            let filtered = state.listofproducts;
            console.log(filtered,'filtered');
            // console.log(action.payload.categories,action.payload.type);
            const { categories = [], type = [], filterbyprice, searchGlobal } = action.payload;
            //console.log(categories,type,action.payload);
            let maxprice = Math.max(...state.listofproducts.map(p => p.ProductPrice));
            let minprice = Math.min(...state.listofproducts.map(p => p.ProductPrice));

            if (searchGlobal) {
                //console.log(action.payload)
                filtered = filtered.filter(p => p.ProductName.toLowerCase().includes(searchGlobal.toLowerCase()))
            }
            if (categories?.length > 0) {
                filtered = filtered.filter(p => p.ProductCategory.includes(categories));
                // console.log(categories);
            }
            if (type?.length > 0) {
                filtered = filtered.filter(p => p.ProductSubCategory.includes(type));
                // setfinalfilterproducts(...filtered,filtered)
            }

            if (filterbyprice === 'sortbylowtohigh') {
                filtered = filtered.slice().sort((a, b) => a.ProductPrice - b.ProductPrice);
            } else if (filterbyprice === 'sortbyhightolow') {
                filtered = filtered.slice().sort((a, b) => b.ProductPrice - a.ProductPrice);
            } else if (filterbyprice === 'sortbyrelevant') {
                filtered = filtered.filter(p => p.ProductPrice >= minprice && p.ProductPrice <= maxprice);
            }
            state.filteredproducts = filtered;
            //end of filtering code
        },
        // GetProductById: (state, action) => {
        //     //console.log(action.payload._id)
        //     //debugger
        //     const IndProd = state.listofproducts.filter((item) => item._id === action.payload._id);

        //     state.individualProduct = IndProd || {};
        // },
        OpenGlobalSearch: (state, action) => {
            state.globalsearch = action.payload
        },
        placeOrder: (state, action) => {
            const todaydate = new Date();
            const formatteddate = todaydate.toDateString();
            state.ordereddetails = {
                items: [...state.cart],
                status: 'Ordered Placed',
                ordereddate: formatteddate,
                PaymentType: action.payload.PaymentType,
                address:{...action.payload.address}
            }
            state.cart = []
          //  console.log(state.ordereddetails)
        },
        Addtocart: (state, action) => {
            let { productid, quantity, price, size, image, name } = action.payload;
            const productexists = state.cart.findIndex(item => item.productid === productid && item.size == size);
            //  console.log(productid, quantity, price, size, productexists)
            if (productexists !== -1) {
                const IsSizeAvailable = state.cart.findIndex(item => item.size == size);
                //console.log('size', IsSizeAvailable)
                if (IsSizeAvailable == -1) {
                    //console.log('size is not available',size)
                    state.cart.push({
                        ...action.payload,
                        quantity: quantity || 1,
                        price: price,
                        size,
                        image,
                        name
                    })
                } else {
                    //console.log('size is not available',size)
                    state.cart[productexists].quantity += 1;
                }
            }
            else {
                state.cart.push({
                    ...action.payload,
                    quantity: quantity || 1,
                    size: size,
                    price: price,
                    image,
                    name
                })
            }
          //  console.log(JSON.stringify(state.cart))
        }
    },
    extraReducers: (builder) => {
            builder
                .addCase(GetAllProducts.pending, (state) => {
                    state.loading = true;
                    state.success = false;
                    state.error = null;
                })
                .addCase(GetAllProducts.fulfilled, (state, action) => {
                    state.loading = false;
                    state.success = true;
                    state.listofproducts = action.payload.data;
                    state.filteredproducts=action.payload.data;
                })
                .addCase(GetAllProducts.rejected, (state, action) => {
                    state.loading = false;
                    state.success = false;
                    state.listofproducts = [];
                    state.error = action.payload;
                }).addCase(Getbestsellerproducts.pending,(state)=>{
                    state.loading=true;
                    state.success=false;
                    state.error=null;
                }).addCase(Getbestsellerproducts.fulfilled,(state,action)=>{
                    state.loading=false;
                    state.success=true;
                    state.bestseller=action.payload.data;
                }).addCase(Getbestsellerproducts.rejected,(state,action)=>{
                    state.loading=true;
                    state.success=false;
                    state.error=null;
                }).addCase(GetSingleProduct.pending,(state)=>{
                    state.loading=true;
                    state.success=false;
                    state.error=null;
                }).addCase(GetSingleProduct.fulfilled,(state,action)=>{
                    state.loading=false;
                    state.success=true;
                    state.individualProduct=action.payload.data;
                    //console.log(action.payload,state.individualProduct,'indprod')
                }).addCase(GetSingleProduct.rejected,(state,action)=>{
                    state.loading=true;
                    state.success=false;
                    state.error=null;
                }).addCase(PLaceOrder.pending,(state)=>{
                    state.loading=true,
                    state.error=""
                }).addCase(PLaceOrder.fulfilled,(state,action)=>{
                    state.loading=false,
                    state.placeorder=action.payload.data,
                    state.cart=[]

                }).addCase(PLaceOrder.rejected,(state,action)=>{
                    state.loading=false,
                    state.placeorder=null,
                    state.error=action.payload
                }).addCase(OrderedDetails.pending,(state)=>{
                    state.loading=true,
                    state.error=""
                }).addCase(OrderedDetails.fulfilled,(state,action)=>{
                    state.ordereddetails=action.payload.data;
                    state.loading=false;
                    state.error=""
                }).addCase(OrderedDetails.rejected,(state,action)=>{
                    state.loading=false;
                    state.error=action.payload
                })
    }
})

export {GetAllProducts,Getbestsellerproducts,GetSingleProduct,PLaceOrder,OrderedDetails}
export const { bestsellerProducts, filteringProducts,  OpenGlobalSearch, Addtocart,placeOrder } = productsSlice.actions;
export default productsSlice.reducer;