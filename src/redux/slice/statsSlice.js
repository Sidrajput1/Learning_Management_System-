import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    alluserCount:0,
    subscribedCount: 0
};

export const getStatsData = createAsyncThunk("stats/get",async()=>{
    try {

        
    } catch (error) {
        toast.error(error?.response?.data?.message)       
    }
})

const statSlice = createSlice({
    name:"state",
    initialState,
    reducers:{},
    extraReducers:()=>{}

});

export default statSlice.reducer;

