import HomeLayout from "../layouts/HomeLayout";
import { Link } from "react-router-dom";
import homePage  from '../assets/homePage.png'
function HomePage(){

    return(
        <HomeLayout>
            <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
                <div className="w-1/2 space-y-6">
                    <h1 className="text-5xl font-semibold">
                        Find out best
                        <span className="text-yellow-500 font-bold">
                            online Course
                        </span>
                    </h1>
                    <p className="text-xl text-gray-200">
                        We have a large library of courses taught by highly skilled and qualified faculties
                        at a very affordable rate. 
                    </p>
                    {/* for butons */}
                    <div className="space-x-6">
                        <Link to={"/courses"}>
                            <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-blue-600 ease-in-out transition-all duration-300">
                              Explore Course
                            </button>
                        </Link>
                        <Link to={"/contact"}>
                            <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-300 ease-in-out transition-all duration-300">
                              Contact Us
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="w-1/2 flex items-center justify-center">
                    <img src={homePage} alt="homepage_image" />

                </div>

            </div>

        </HomeLayout>
    )
}

export default HomePage;