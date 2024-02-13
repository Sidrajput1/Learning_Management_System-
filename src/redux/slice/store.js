import {configureStore} from '@reduxjs/toolkit'
import authSliceReducer from './authSlice';
import courseSliceReducer from './courseSlice';
import razorpaySliceReducer from './RazorpaySlice';
import lectureSliceReducer from './lectureSlice';

const store = configureStore({
    reducer:{
        auth:authSliceReducer,
        course:courseSliceReducer,
        razorpay:razorpaySliceReducer,
        lecture:lectureSliceReducer,

    },
    devTools:true

});

export default store;