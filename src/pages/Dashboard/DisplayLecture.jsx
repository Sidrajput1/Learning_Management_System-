import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeLayout from '../../layouts/HomeLayout';
import { deleteCourseLecture, getCourseLecture } from '../../redux/slice/lectureSlice';

function DisplayLecture() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //const {state} = useLocation();

    const courseDetails = useLocation().state;
    const { lectures } = useSelector((state) => state.lecture);
    const { role } = useSelector((state) => state.auth);
    console.log("role is:",role);

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const handleLectureDelete = async (courseId, lectureId) => {
        const data = { courseId, lectureId }
        await dispatch(deleteCourseLecture(data))
        await dispatch(getCourseLecture(courseDetails._id))

    }

    useEffect(() => {
        console.log(courseDetails);
        if (!courseDetails) navigate("/courses")
        dispatch(getCourseLecture(courseDetails._id));
    }, [])


    return (
        <HomeLayout>

            <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
                <h1 className="text-center text-2xl font-semibold text-yellow-500">
                    Course Name : {courseDetails?.title}
                </h1>

                <div className="flex justify-center gap-10 w-full">
                    <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                        <video
                            className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                            src={lectures && lectures[currentVideoIndex]?.lecture?.secure_url}
                            controls
                            disablePictureInPicture
                            muted
                            controlsList="nodownload"
                        ></video>

                        <div>

                            <h1>
                                <span className="text-yellow-500">Title:{courseDetails.title} </span>
                                {lectures && lectures[currentVideoIndex]?.title}
                            </h1>
                            <p>
                                {" "}
                                <span className="text-yellow-500 line-clamp-4">
                                    Description :{courseDetails.description}
                                </span>
                                {lectures && lectures[currentVideoIndex]?.description}
                            </p>

                        </div>

                    </div>


                    {/* right side of lecture */}
            <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
                <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                    <p>Lectures Title</p>
                    {role === 'ADMIN' && (
                        <button onClick={() => navigate("/course/addlecture", {
                            state: { ...courseDetails }
                        })
                        }
                            className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
                        >
                            Add new Lecture

                        </button>
                    )}

                </li>
                {lectures && lectures.map((lecture, index) => {
                    return (
                        <li className="space-y-2" key={element._id}>
                            <p className='cursor-pointer' onClick={() => setCurrentVideoIndex(index)}>
                                <span className="text-yellow-500">
                                    {" "}
                                    Lecture {index + 1} :{" "}
                                </span>
                                {lecture?.title}

                            </p>
                            {role === 'ADMIN' && (
                                <button onClick={() => handleLectureDelete(courseDetails?._id, element?._id)}
                                    className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
                                >
                                    Delete Lecture

                                </button>
                            )}

                        </li>
                    )

                })
                }


            </ul>





            </div>

            </div>
            

        </HomeLayout>



    );
};

export default DisplayLecture;