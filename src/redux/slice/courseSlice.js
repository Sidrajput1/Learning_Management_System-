import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {toast} from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"
const initialState = {
    coursesData:[],

}
    
export const getAllCourses = createAsyncThunk("/course/get",async()=>{
    try {

        const response = axiosInstance.get("/courses");
        toast.promise(response,{
            loading:'fetching course data...',
            success:'course fetched successfully',
            error:'failed to fetch course details',
        })
        return (await response).data.courses
        
    } catch (error) {

        toast.error(error?.response?.data?.message);
        console.log("failed to course details",error);
        
    }
});

export const createNewCourse = createAsyncThunk("/get/courses", async(data)=>{
    try{

        let formData = new FormData();
        formData.append("title",data?.title)
        formData.append("description",data?.description);
        formData.append("category",data?.category);
        formData.append("createdBy",data?.createdBy);
        formData.append("thumbnail",data?.thumbnail);

        const res = axiosInstance.post("/courses",formData);

        toast.promise(res,{
            loading:"Creating the Course..",
            success:"Course Created Successfully",
            error:"failed to create course"
        });
        return (await response).data



    }catch(e){
        toast.error(error?.response?.data?.message);

    }

});







const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllCourses.fulfilled,(state,action)=>{
            if(action.payload){
                console.log(action.payload)
                state.coursesData = [...action.payload];
            }
        });

    },


});

export const {} = courseSlice.actions;

export default courseSlice.reducer;