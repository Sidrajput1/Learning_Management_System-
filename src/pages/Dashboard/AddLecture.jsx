import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addCourseLecture } from "../../redux/slice/lectureSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

function AddLecture(){

    const courseDetails = useLocation().state;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput,setUserInput] = useState({
        id: courseDetails?._id,
        lecture:undefined,
        title:"",
        description:"",
        videosrc:""
    });

    function handleInputChange(e){
        const {name,value} = e.target;
        setUserInput({
            ...userInput,
            [name]:value
        })
    }

    function handleVedio(e){
        const video = e.target.files[0]
        const source = window.URL.createObjectURL(video);
        setUserInput({
            ...userInput,
            lecture:video,
            videosrc:source
        })
    };

    async function onSubmit(e){
        e.preventDefault();
        if(!userInput.lecture || !userInput.title || !userInput.description){
            toast.error('All fields are mandatory')
            return;

        }
        const response = await dispatch(addCourseLecture(userInput));
        if(response?.payload?.success){
            setUserInput({
                id: courseDetails?._id,
                lecture:undefined,
                title:"",
                description:"",
                videosrc:""

            })
        }
    }

    useEffect( ()=>{
        if(!courseDetails) navigate("/courses")
    },[])

    return(
        <HomeLayout>
            <div className="text-white flex flex-col items-center justify-center gap-10 mx-16 min-h-[90vh]">
                <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
                    <header className="flex items-center justify-center relative">
                        <button 
                         className="absolute left-2 text-xl text-green-500"
                         onClick={() => navigate(-1)}
                        >
                             <AiOutlineArrowLeft/>

                        </button>
                        <h1 className="text-xl text-yellow-500 font-semibold">
                            Add your new Lecture
                        </h1>

                    </header>
                    <form
                        className="flex flex-col gap-3"
                        onSubmit={onSubmit}
                        
                    >
                        <input 
                            type="text" 
                            name="title"
                            value={userInput.title}
                            onChange={handleInputChange}
                            placeholder="Enter the title for lecture"
                            className="bg-transparent px-3 py-1 border"
                        />
                        <textarea 
                            name="description" 
                            value={userInput.description}
                            onChange={handleInputChange}
                            placeholder="Enter the description for lecture"
                            className="resize-none overflow-y-scroll h-24 bg-transparent px-3 py-1 border"
                        />
                        {
                            userInput.videosrc ? (
                                <video 
                                    src={userInput.videosrc}
                                    muted
                                    controls
                                    controlsList="nodownload nofullscreen"
                                    disablePictureInPicture
                                    className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                                >

                                </video>

                            ):(
                                <div className="h-48 border flex items-center justify-center cursor-pointer">
                                    <label htmlFor="lecture"
                                        className="font-semibold text-xl cursor-pointer"
                                    > Choose Your vedio
                                    </label>
                                    <input 
                                        type="file"
                                        id="lecture"
                                        name="lecture"
                                        onChange={handleVedio} 
                                        accept="video/mp4,video/x-m4v,video/*"
                                        className="hidden"
                                    />

                                </div>

                            )
                        }
                        <button className="btn-primary py-1 font-semibold text-lg rounded">
                            Add Lecture

                        </button>
                    </form>

                </div>

            </div>

        </HomeLayout>
    )

}

export default AddLecture;