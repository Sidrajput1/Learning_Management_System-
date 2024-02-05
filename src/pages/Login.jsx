import { useDispatch } from "react-redux";
import HomeLayout from "../layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { login } from "../redux/slice/authSlice";

function Login(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const [loginData,setLoginData] = useState({
        email:"",
        password:"",
    })

    const handleUserInput = (e) => {
        const {name,value} = e.target;
        setLoginData({
            ...loginData,
            [name]:value,
        });

    }

    const handleLogin = async (event) => {
        event.preventDefault();

        if(!loginData.email || !loginData.password){
            toast.error('Please fill all the feilds')
            return;
        }
        //Now call the login function
        const res = await dispatch(login(loginData));

        console.log(res);


        //check if true,then redirect to home page
        if(res && res.payload && res?.payload?.success){
            navigate('/')
        }else{
            console.log("Failed!!",res && res.payload);
        } 

        setLoginData({
            email:"",
            password:"",
        });

    };



    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh] bg-slate-700">
                <form 
                    onSubmit={handleLogin}
                    className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>
                    <h1 className="text-center text-4xl font-bold text-red-700">Login</h1>

                    <div>
                        <label htmlFor="email" className="font-semibold">Email</label>
                    </div>
                    <input
                        required
                        type="text"
                        id ="email"
                        name="email"
                        placeholder="Enter Your Emailid" 
                        className='bg-transparent px-2 py-1 border'
                        value={loginData.email}
                        onChange={handleUserInput}
                    />
                    <div>
                        <label htmlFor="password" className="font-semibold">
                            Password
                        </label>
                    </div>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        className="bg-transparent px-2 py-1 border"
                        value={loginData.password}
                        onChange={handleUserInput}

                    />
                     <button 
                     className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
                     type='submit'
                    
                    >LogIn</button>

                    <p>do not have an Account ? {" "}
                       <Link to={"/signup"} className="link text-accent cursor-pointer">Signup</Link>
                    </p>
                    
                </form>
            
            </div>

        </HomeLayout>

    )
    
}

export default Login;