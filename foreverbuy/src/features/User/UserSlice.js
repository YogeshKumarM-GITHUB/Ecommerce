import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState={
    UserDetails:{},
    loading:false,
    error:"",
    success:false,
    token:""
}

const BASEURL = 'http://localhost:5000';

const RegisteUser=createAsyncThunk(
    'User/RegisterUser',async(userData)=>{
              try{
                     const response=await axios.post(`${BASEURL}/api/user/AddUser`,userData);
                     return response.data;
              }
              catch(error){
                console.log(error.response?.data || error.message)
              }
    }
)

const LoginUser=createAsyncThunk(
    'User/LoginUser',async(userData)=>{
              try{
                    const {Email,Password}=userData;
                     const response=await axios.post(`${BASEURL}/api/user/Login`,{
                        Email,
                        Password
                     },{
                        headers:{
                            "Content-Type": "application/json"
                        }
                     });
                     console.log(response)
                     localStorage.setItem("token",response.data.token);
                     return response.data.token;
              }
              catch(error){
                console.log(error.response?.data || error.message)
              }
    }
)

const userSlice=createSlice({
     name: 'product',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
          builder.addCase(RegisteUser.pending,(state)=>{
            state.loading=true,
            state.error=""
          }).addCase(RegisteUser.fulfilled,(state,action)=>{
            state.loading=false,
            state.UserDetails=action.payload.data
          }).addCase(RegisteUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
          }).addCase(LoginUser.pending,(state)=>{
            state.loading=true,
            state.error=""
            state.token=action.payload.token;
          }).addCase(LoginUser.fulfilled,(state,action)=>{
            state.loading=false,
            state.success=true
          }).addCase(LoginUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
          })
    }
})

export {RegisteUser,LoginUser}
export default userSlice.reducer;
