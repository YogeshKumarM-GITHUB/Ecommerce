import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState={
    UserDetails:{},
    loading:false,
    error:"",
    success:false,
    token:""
}

const BASEURL = process.env.BASEURLS

const RegisteUser=createAsyncThunk(
    'User/RegisterUser',async(userData)=>{
              try{
                     const response=await axios.post(`${BASEURL}/api/admin/AddUser`,userData);
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
                //debugger;
                    const {Email,Password}=userData;
                     const response=await axios.post(`${BASEURL}/api/admin/Login`,{
                        Email,
                        Password
                     },{
                        headers:{
                            "Content-Type": "application/json"
                        }
                     });
                    // console.log(response)
                     localStorage.setItem("token",response.data.token);
                     return response.data;
              }
              catch(error){
                console.log(error.response?.data || error.message)
              }
    }
)

const Logout=createAsyncThunk(
    'User/LogOut',async()=>{
        try{
                    localStorage.removeItem('token');
                    return {success:true};
        }
        catch(error){
            console.log(error.response?.data || error.message)
        }
    }
)

const GetUserDetails=createAsyncThunk(
    'User/GetUserDetails',
    async({Email})=>{
        try{
               // console.log(_id);
               //debugger;
                const response=await axios.get(`${BASEURL}/api/Adminuserdetails/getAdminuserdetails/${Email}`,{headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            });
               return  response.data;
        }
        catch(error){
            console.log(error.response?.data||error.message)
        }
    }
)


const userSlice=createSlice({
     name: 'admin',
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
          }).addCase(LoginUser.fulfilled,(state,action)=>{
            state.loading=false,
            state.success=true
            state.token=action.payload.token;
            //state.UserDetails=action.payload.data;
           // console.log(action.payload.data,'data');
          }).addCase(LoginUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
          }).addCase(Logout.pending,(state)=>{
            state.loading=true;
            state.error=""
          }).addCase(Logout.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=action.payload;
            state.UserDetails="";
          }).addCase(Logout.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
          }).addCase(GetUserDetails.pending,(state)=>{
            state.loading=true;
            state.error=""
          }).addCase(GetUserDetails.fulfilled,(state,action)=>{
            state.UserDetails=action.payload.data;
            state.loading=false;
            state.error=""
            console.log(action.payload,"User444");
          }).addCase(GetUserDetails.rejected,(state,action)=>{
            state.UserDetails="",
            state.loading=false,
            state.error=action.payload
          })
    }
})

export {RegisteUser,LoginUser,Logout,GetUserDetails}
export default userSlice.reducer;
