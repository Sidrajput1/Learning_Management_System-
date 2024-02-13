import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import {toast} from "react-hot-toast";

const initialState = {
    isLoggedIn:localStorage.getItem('isLoggedIn') || false,
    //data: JSON.parse(localStorage.getItem("data")) || {},
    role: localStorage.getItem('role') || "",
    //data:(localStorage.getItem('data')) !== undefined ? JSON.parse(localStorage.getItem('data')) : {}
    data: (() => {
        const storedData = localStorage.getItem('data');
        if (storedData !== undefined) {
            try {
                return JSON.parse(storedData);
            } catch (error) {
                console.error("Error parsing JSON for 'data':", error);
                return {};
            }
        } else {
            return {};
        }
    })()
    
};

export const createAccount = createAsyncThunk("/auth/signup",async(data)=>{
     try{
            let res =  axiosInstance.post("user/register",data);
            toast.promise(res,{
                loading: "Please Wait! Creating your account",
                success:(data) => {
                    return data?.data?.message;
                },
                error:'failed to create account',
            });
            res = await res;
            return res.data;
        
     }catch(e){
        toast.error(error?.response?.data?.message)
        throw e;
     }
});

// export const login = createAsyncThunk("auth/login",async(data)=>{
//     try{
//         let res = axiosInstance.post("/user/login",data);
//         await toast.promise(res,{
//             loading:"Please wait,login is in process",
//             success:(data)=>{
//                 return data?.data?.message;
//             },
//             error:'failed to login',
//             // res = await res
//             // return res.data;
//         });

//     }catch(e){
//         toast.error(e.message);
//         throw e;

//     }
// });

                //--- Login method ---
export const login = createAsyncThunk("auth/login", async (data) => {
    try {
        // Use await to wait for the Promise to resolve
        const res = await axiosInstance.post("/user/login", data);

        // Check if the response was successful
        if (res.data && res.data.success) {
            toast.success(res.data.message); // Adjust this based on your response structure
            return res.data; // Return the response data
        } else {
            toast.error('Failed to login');
            return rejectWithValue(res.data); // If unsuccessful, you can use rejectWithValue to pass an error message
        }
    } catch (error) {
        toast.error(error.message);
        throw error;
    }
});

//-----Logout method implemented----

export const logout = createAsyncThunk("auth/logout", async () => {
    try{
        const res = axiosInstance.post("/user/logout");
        await toast.promise(res,{
            loading:"wait ! logout in progress",
            success:(data)=>{
                return data?.data?.message
            },
            error:'failed to logout'
        });
        return (await res).data;

    }catch(e){
        toast.error(error.message);
        throw error;
    }
});

//for update profile thunk

export const updateProfile = createAsyncThunk("/user/update/profile",async(data,id) =>{
    try {
        const res = axiosInstance.put(`user/update/${data[0]}`,data[1]); // {data[0]},data[1]
        toast.promise(res,{
            loading:'Wait, Profile update in progress',
            success:(data)=>{
                return data?.data?.message
            },
            error:'Failed to update profile'
        });
        return (await res).data;
        
    } catch (error) {
        toast.error(error?.response?.data?.message);
        
    }

});

export const getUserData = createAsyncThunk("/user/details/",async()=>{

    try {
        const res = await axiosInstance.get("/user/me");
        console.log(res);
        //return (await res).data
        return res?.data;


        
    } catch (error) {
        toast.error(error.message);
        
    }

});




const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(login.fulfilled,(state,action)=>{
            localStorage.setItem("data",JSON.stringify(action?.payload?.user))
            localStorage.setItem("isLoggedIn",true)
            localStorage.setItem("role",action?.payload?.user?.role)
            state.isLoggedIn = true;
            state.data = action?.payload?.user
            state.role = action?.payload?.user?.role;
        })
        .addCase(logout.fulfilled,(state)=>{
            localStorage.clear();
            state.data ={}
            state.isLoggedIn=false;
            state.role = "";
       
        })
        .addCase(getUserData.fulfilled,(state,action)=>{
            if(!action?.payload?.user) return;
            localStorage.setItem("data",JSON.stringify(action?.payload?.user))
            localStorage.setItem("isLoggedIn",true)
            localStorage.setItem("role",action?.payload?.user?.role)
            state.isLoggedIn = true;
            state.data = action?.payload?.user
            state.role = action?.payload?.user?.role;

        })
    }
});

export const {} = authSlice.actions;
export default authSlice.reducer;

