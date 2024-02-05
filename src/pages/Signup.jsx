import { BsPersonCircle } from 'react-icons/bs'
import HomeLayout from '../layouts/HomeLayout';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux';
//import authSlice from '../redux/slice/authSlice';
import { createAccount } from '../redux/slice/authSlice';
function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState();

    //for user input
    const [signupData,setSignupData] = useState({
         fullname : "",
         email : "",
         password:"",
         avatar: ""
    });

    const handleUserInput = (e) => {
        const {name,value} = e.target;
        setSignupData({
            ...signupData,
            [name]:value,
        });

    };

    const getImage = (e) => {
        e.preventDefault();

        const uploadedImage = e.target.files[0];

        if(uploadedImage){
            setSignupData({
                ...signupData,
                avatar:uploadedImage
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load",function(){
                setPreviewImage(this.result);
            });
        }
    };

    const createNewAccount = async(e) => {
        e.preventDefault();

        if(!signupData.avatar|| !signupData.fullname || !signupData.email || !signupData.password ){
            toast.error("please fill All feild");
            return;
        }
        if(signupData.fullname.length <5){
            toast.error('Name must be atleast Five char')
            return;
        }
        if(!signupData.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
             toast.error('please Enter a valid email')
             return;
        }

        if(!signupData.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)){
            toast.error('Minimum Password length should be atleast 8 characters with Uppercase,Number and a special character');
            return;
        };

        const formData = new FormData();
        formData.append("fullname",signupData.fullname)
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("avatar", signupData.avatar);

        try{
            const res =  await dispatch(createAccount(formData));
            console.log(res);

            if(res.payload && res.payload.success){
                navigate("/login");
            }else{
            console.error("Registration failed:", res.payload);
            toast.error("Registration failed. Please check the console for more details.");
        }

        }catch(e){
            console.error("Error during registration:", e);
        }finally{
            setSignupData({
                fullname: "",
                email: "",
                password: "",
                avatar: "",
              });
              setPreviewImage("");

        }

    };





    return (
        <HomeLayout>
            <div className='flex items-center justify-center h-[100vh]'>
                <form onSubmit={createNewAccount} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>

                    <h1 className='text-center text-2xl font-bold'>Registration Page</h1>

                    <label className='cursor-pointer' htmlFor='image_uploads'>
                        {previewImage ? (
                            <img src={previewImage}
                                alt="Image Preview"
                                className="w-24 h-24 rounded-full m-auto"
                            />
                        ) :
                            (
                                <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
                            )}
                    </label>
                    <input
                        onChange={getImage}
                        className='hidden'
                        type="file"
                        id='image_uploads'
                        name='image_uploads'
                        accept='.jpg,.jpeg,.png'
                    />
                    {/* input for name,email and password */}
                    <div>
                        <label htmlFor="fullname" className='font-semibold'>
                            Name
                        </label>
                    </div>
                    <input
                        required
                        type="text"
                        name='fullname'
                        id='fullname'
                        placeholder='Enter Your name'
                        className='bg-transparent px-2 py-1 border'
                        value={signupData.fullname}
                        onChange={handleUserInput}
                    />

                    <div>
                        <label htmlFor="email" className='font-semibold'>
                            Email
                        </label>
                    </div>
                    <input
                        required
                        type="text"
                        name='email'
                        id='email'
                        placeholder='Enter Your email'
                        className='bg-transparent px-2 py-1 border'
                        value={signupData.email}
                        onChange={handleUserInput}
                    />

                    <div>
                        <label htmlFor="password" className='font-semibold'>
                            PassWord
                        </label>
                    </div>
                    <input
                        required
                        type="password"
                        name='password'
                        id='password'
                        placeholder='Enter Your password'
                        className='bg-transparent px-2 py-1 border'
                        value={signupData.password}
                        onChange={handleUserInput}
                    />

                    <button 
                     className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
                     type='submit'
                    
                    > Create Account</button>

                    <p>Already have an Account ? {" "}
                        <Link to={"/login"} className="link text-accent cursor-pointer">Login</Link>
                    </p>

                </form>

            </div>

        </HomeLayout>
    )
}

export default Signup;