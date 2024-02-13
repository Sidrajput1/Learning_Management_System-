import HomeLayout from '../../layouts/HomeLayout'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../redux/slice/courseSlice";
import CourseCard from '../../components/CourseCard';
function CourseList() {

    const dispatch = useDispatch();
    const { coursesData } = useSelector((state) => state.course);
    console.log(coursesData);



    async function loadCourses() {
        await dispatch(getAllCourses());

    }

    useEffect(() => {
        loadCourses();

    }, [])


    return (
        <HomeLayout>
            <div className='min-h-[90vh] pt-12 pl-20 flex flex-col flex-wrap gap-10 text-white'>
                <h1 className="text-center text-3xl font-semibold">
                    Explore the Courses made by
                    <span className='font-bold text-yellow-500'>
                        Industry experts
                    </span>

                </h1>
                <div className='mb-10 flex flex-wrap gap-14'>
                    {coursesData?.map((element) => {
                        return <CourseCard key={element._id} data={element} />;
                    })}

                </div>
                <h1>All Courses is here</h1>

            </div>

        </HomeLayout>
    )
}

export default CourseList;