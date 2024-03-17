import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import {toast} from "react-hot-toast";
import { useDispatch } from "react-redux";
import HomeLayout from "../../layouts/HomeLayout";
import { createNewCourse } from '../../redux/slice/courseSlice'

function CreateCourse() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //const { initialCourseData } = useLocation().state;
    const { state } = useLocation();
    const initialCourseData = state ? state.initialCourseData : {};


    const [isDisabled, setIsDisabled] = useState(!initialCourseData?.newCourse)

    const [userInput, setUserInput] = useState({
        title: initialCourseData?.title,
        category: initialCourseData?.category,
        createdBy: initialCourseData?.createdBy,
        description: initialCourseData?.description,
        thumbnail: null,
        previewImage: "description?.thumbnail?.secure_Url"
    });


    const getImage = (e) => {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        console.log(uploadedImage);

        if (uploadedImage) {
            setUserInput({ ...userInput, thumbnail: uploadedImage });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setUserInput({
                    ...userInput,
                    previewImage: this.result,
                    thumbnail: uploadedImage
                });
            });

        };
    };

    function handleUserInput(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value,
        });

    };

    async function handleFormSubmit(e) {
        e.preventDefault();

        let res = undefined;

        if (initialCourseData.newCourse) {
            //console.log(initialCourseData);

            if (!userInput.title || !userInput.category || !userInput.description || !userInput.createdBy || !userInput.thumbnail) {
                toast.error('All input feilds are mandatory')
                return;
            }

            res = await dispatch(createNewCourse(userInput));

        } else {
            if (
                !userInput.title ||
                !userInput.category ||
                !userInput.createdBy ||
                !userInput.description
            ) {
                toast.error("All fields are mandatory");
                return;
            }

            //for updated course
        }

        if (res?.payload?.success) {
            setUserInput({
                title: "",
                category: "",
                description: "",
                thumbnail: undefined,
                previewImage: ''
            });

            setIsDisabled(false);
            navigate('/admin/dashboard')
        }



    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form
                    onSubmit={handleFormSubmit}
                    className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] h-[450px] shadow-[0_0_10px_black] relative">
                    <Link to={"/admin/dashboard"} className="absolute top-8 text-2xl link text-accent cursor-pointer" >
                        <AiOutlineArrowLeft />
                    </Link>
                    <h1 className="text-center text-2xl font-bold">
                        {!initialCourseData.newCourse ? "update" : "Creat new"}
                        <span>Course</span>
                    </h1>

                    <main className="grid grid-cols-2 gap-x-10">
                        <div className="space-y-6">
                            <div onClick={() =>
                                !initialCourseData.newCourse ? toast.error("cannot update thumbnail Image") : ""
                            }>
                                <label className="cursor-pointer" htmlFor="image_uploads">
                                    {
                                        userInput.previewImage ? (
                                            <img
                                                className="w-full h-44 m-auto border"
                                                src={userInput.previewImage}
                                                alt="Preview Image"
                                            />

                                        ) : (
                                            <div className="w-full h-44 m-auto flex items-center justify-center border">
                                                <h1 className="font-bold text-lg">
                                                    Upload your course thumbnail
                                                </h1>

                                            </div>
                                        )
                                    }
                                </label>
                                <input
                                    className="hidden"
                                    onChange={getImage}
                                    type="file"
                                    id="image_uploads"
                                    name="image_uploads"
                                    accept=".jpg,.jpeg,.png"
                                    disabled={isDisabled}

                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="title">
                                    Course title

                                </label>
                                <input
                                    required
                                    type="name"
                                    id="name"
                                    name="name"
                                    
                                    placeholder="Enter the Course title"
                                    className="bg-transparent px-2 py-1 border"
                                    value={userInput.title}
                                    onChange={handleUserInput}
                                />

                            </div>
                        </div>

                        {/* for Course description */}
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="createdBy" className="text-lg font-semibold">
                                    Instructor Name
                                    
                                </label>
                                <input 
                                    type="name"
                                    id="createdBy"
                                    name="createdBy"
                                    placeholder="Enter the Instructor name"
                                    className="bg-transparent px-2 py-1 border"
                                    value={userInput.createdBy}
                                    onChange={handleUserInput}

                                />

                            </div>

                            <div className="flex flex-col gap-1">

                            <label className="text-lg font-semibold" htmlFor="category">
                                Course Category
                            </label>

                            <input 
                                required
                                type="text" 
                                name="category"
                                id="category"
                                placeholder="Enter a Category for Course"
                                className="bg-transparent px-2 py-1 border"
                                value={userInput.category}
                                onChange={handleUserInput}

                            />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="description">
                                Course Description
                                </label>
                                <textarea
                                required
                                type="text"
                                name="description"
                                id="description"
                                placeholder="Enter the course description"
                                className="bg-transparent px-2 py-1 border h-24 overflow-y-scroll resize-none"
                                value={userInput.description}
                                onChange={handleUserInput}
                                />
                            </div>

                        </div>

                    </main>

                    <button 
                       className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
                       type="submit"
                    >
                        {!initialCourseData.newCourse?"update Course" : "create course"}


                    </button>



                </form>

            </div>

        </HomeLayout>
    )



}

export default CreateCourse;