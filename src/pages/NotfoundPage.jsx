import { useNavigate } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";

function NotfoundPage() {

    const navigate = useNavigate();


    return (
        <HomeLayout>
            <div className="bg-indigo-900 relative overflow-hidden h-screen">
                <img src="https://external-preview.redd.it/4MddL-315mp40uH18BgGL2-5b6NIPHcDMBSWuN11ynM.jpg?width=960&crop=smart&auto=webp&s=b98d54a43b3dac555df398588a2c791e0f3076d9" className="absolute h-full w-full object-cover" />
                <div className="inset-0 bg-black opacity-25 absolute">
                </div>
                <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
                    <div className="w-full font-mono flex flex-col items-center relative z-10">
                        <h1 className="font-extrabold text-5xl text-center text-white leading-tight mt-4">
                            You are all alone here
                        </h1>
                        <p className="font-extrabold text-8xl my-44 text-white animate-bounce">
                            404
                        </p>
                        <button className="mt-1 bg-black">
                            <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring">
                                <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0 text-2xl"/>
                                   <span 
                                     className="relative block px-8 py-3 bg-[#1A2238] border border-current"
                                     onClick={ () => navigate(-1)}
                                   >
                                    Go back

                                   </span>

                                

                            </a>

                        </button>
                    </div>
                </div>
            </div>


        </HomeLayout>
    )

}

export default NotfoundPage;