import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import HomeLayout from '../../layouts/HomeLayout';
import { getUserData } from '../../redux/slice/authSlice';

function Profile() {

    const dispatch = useDispatch();
    const userData = useSelector((state)=>state?.auth?.data);

    async function handleCancelSubscription(){
        //await dispatch(cancelCourseBundle());
        await dispatch(getUserData());

    }


  return (
     <HomeLayout>
        <div className="min-h-[90vh] flex items-center justify-center">
            <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-80 shadow-[0_0_10px_black]">
                <img 
                    className="w-40 m-auto rounded-full border border-black"
                    src={userData?.avatar?.secure_url} 
                    alt="user profile image" 

                />
                <h3 className="text-xl font-semibold text-center capitalize">
                    {userData.fullname}
                </h3>
                <div className="grid grid-cols-2">
                    <p>Email:</p>
                    <p>{userData?.email}</p>
                    <p>Role:</p>
                    <p>{userData?.role}</p>
                    <p>Subscription:</p>
                    <p>
                        {userData?.subscription?.status==="active"
                          ? "ACTIVE":"INACTIVE"
                        }
                    </p>

                </div>

                {/* for button */}
                <div className="flex items-center justify-between gap-2">
                    <Link to={"/changepassword"} 
                       className="w-1/2 bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
                    >
                        <button>Change Password</button>
                        
                    </Link>

                    <Link to={"/user/editprofile"}
                      className="w-1/2 border border-yellow-600 hover:border-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
                    >
                        <button>Edit profile</button>

                    </Link>

                </div>

                {/* for cancel subscription */}
                {userData?.subscription?.status === "active" && (
                    <button onClick={handleCancelSubscription}
                    className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
                    >
                        Cancel Subscription


                    </button>
                )}

            </div>

        </div>

     </HomeLayout>
    
  )
}

export default Profile