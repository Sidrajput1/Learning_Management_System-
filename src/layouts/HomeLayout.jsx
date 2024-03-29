import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import { Link, useNavigate} from "react-router-dom";

import Footer from '../components/Footer'
import { logout } from "../redux/slice/authSlice";

function HomeLayout({children}) {

        const dispatch = useDispatch();
        const navigate = useNavigate();

        //for checking login or not 
        const isLoggedIn = useSelector((state)=> state?.auth?.isLoggedIn);

        // for dispaying the options, according to user role
        const role = useSelector((state)=> state?.auth?.role);


    const changeWidth = () => {    
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = "auto";
      };
      const hideDrawer = () => {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;

        //changeWidth();
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = "0";
    }  

    const handleLogout = async(e) =>{
        e.preventDefault()

        const res = await dispatch(logout());

        if(res?.payload?.success){
            navigate("/");
        }else{
            console.error("Registration failed:", res.payload);
        }
        //navigate("/");
    }

    return (
        <div className="min-h-[90vh] bg-slate-900">
            <div className="drawer absolute left-0 z-50 w-fit">
                <input className="drawer-toggle" id="my-drawer" type="checkbox" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="cursor-pointer relative">
                        <FiMenu
                            onClick={changeWidth}
                            size={"32px"}
                            className="font-bold text-white m-4"
                        />
                    </label>
                </div>

                <div className="drawer-side w-0">
                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-48 sm:w-80 bg-base-100 text-base-content relative">
                        {/* close button for drawer */}
                        <li className="w-fit absolute right-2 z-50">
                            <button onClick={hideDrawer}>
                              <AiFillCloseCircle size={24} />
                            </button>
                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        {/* if user logged in */}
                        {isLoggedIn && role==='ADMIN' &&(
                            <li>
                                <Link to={"/admin/dasboard"}>Admin Dashboard</Link>
                                <Link to={"/course/create"}>Create Course</Link>
                            </li>
                            // <li>
                            //     <Link to={"/course/create"}>Create Course</Link>
                            // </li>
                        )}
                        <li>
                            <Link to="/courses">All Coursed</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contacts</Link>
                        </li>
                        <li>
                            <Link to="/about">About Us</Link>
                        </li>
                        {!isLoggedIn&& (
                            <li className="absolute top-44  w-[90%] ">
                                <div className="w-full flex items-center justify-center mt-[30rem]">
                                    <button className="btn-primary px-4 py-1 font-extrabold rounded-md w-full bg-pink-700  ">
                                        <Link to={'/login'}>Login</Link>
                                    </button>
                                    <button className="btn-secondary px-4 py-1 font-bold rounded-md w-full bg-green-800">
                                        <Link to={'/signup'}>Signup</Link>
                                    </button>
                                </div>
                            </li>
                        )}

                        {isLoggedIn && (
                            <li className="absolute top-44  w-[90%] ">
                            <div className="w-full flex items-center justify-center mt-[30rem]">
                                <button className="btn-primary px-4 py-1 font-extrabold rounded-md w-full bg-pink-700  ">
                                    <Link to={'/user/profile'}>Profile</Link>
                                </button>
                                <button className="btn-secondary px-4 py-1 font-bold rounded-md w-full bg-green-800">
                                    <Link onClick={handleLogout}>Logout</Link>
                                </button>
                            </div>
                        </li>

                        )}
                    </ul>
                </div>

            </div>

            {children}
            <Footer />

        </div>
    );

}

export default HomeLayout;