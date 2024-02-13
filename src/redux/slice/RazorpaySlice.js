import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {toast} from 'react-hot-toast';
import axiosInstance from '../../Helpers/axiosInstance'
const initialState = {
    key:"",
    subscriptionId:"",
    isPaymentVerified:false,
    allPayments:{},
    finalMonths:{},
    monthlySalesRecord:[]

}

export const getRazorpayId = createAsyncThunk("/razorpay/getId",async()=>{
    try {
        const response = await axiosInstance.get("/payment/razorpay-key")
        return response.data;
        
    } catch (error) {
        toast.error('failed to laod data');
        //throw error;
        console.log('razorpay id failed',error);
        
    }
});

// Purchase Course

export const purchaseCourseBundle = createAsyncThunk("/purchaseCourse",async()=>{
    try {
        const response = await axiosInstance.post("/payment/subscribe")
        return response.data
        
    } catch (error) {
        toast.error("error?.response?.data?.message");       
    }
})

// for payment verify

export const verifyUserPayment = createAsyncThunk("/payments/verify",async(data)=>{
    try {
        const response = await axiosInstance.post("/payment/verify",{
            razorpay_payment_id:data.razorpay_payment_id,
            razorpay_subscription_id:data.razorpay_subscription_id,
            razorpay_signature:data.razorpay_signature
        });
        return response.data;
        
    } catch (error) {
        toast.error(error?.response?.data?.message);
        
    }
});

export const getPaymentRecord = createAsyncThunk("/payments/record",async(data)=>{
    try {

        const response = axiosInstance.get("/payment?count=100")
        toast.promise(response,{
            loading:"Getting the payments records,wait",
            success: (data)=>{
                return data?.data?.message;
            },
            error:"failed to get payments",
        })
        return (await response).data;
        
    } catch (error) {
        toast.error("operation failed");
        
    }   

});

// cancel course

export const cancelCourseBundle = createAsyncThunk("/payments/cancel",async(data)=>{
    try {

        const response = axiosInstance.post("/payment/unsubscribe")
        toast.promise(response,{
            loading:"Unsubscribe the course",
            success: (data)=>{
                return data?.data?.message;
            },
            error:"failed to Unsubscribe",
        })
        return (await response).data;
        
    } catch (error) {
        toast.error(error?.response?.data?.message);
        
    }   

});

const razorpaySlice = createSlice({
    name:"razorpay",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getRazorpayId.fulfilled,(state,action)=>{
            state.key = action?.payload?.key;
        })
        .addCase(purchaseCourseBundle.fulfilled,(state,action) => {
            state.subscriptionId = action?.payload?.subscriptionId;
        })
        .addCase(verifyUserPayment.fulfilled,(state,action)=>{
            toast.success(action?.payload?.message)
            state.isPaymentVerified = action?.payload?.success;
        })
        .addCase(verifyUserPayment.rejected,(state,action)=>{
            toast.error(action?.payload?.message)
            state.isPaymentVerified = action?.payload?.success;
        })
        .addCase(getPaymentRecord.fulfilled,(state,action)=>{
            state.allPayments = action?.payload?.allPayments
            state.finalMonths = action?.payload?.finalMonths
            state.monthlySalesRecord = action?.payload?.monthlySalesRecord
        })

    }

})


export const {} = razorpaySlice.actions;
export default razorpaySlice.reducer;