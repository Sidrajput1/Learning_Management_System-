
import './App.css'
import { Route, Routes } from 'react-router-dom'
// import HomeLayout from './layouts/HomeLayout';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import NotfoundPage from './pages/NotfoundPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CourseList from './pages/courses/courseList';
import Contacts from './pages/Contacts';
import CourseDescription from './pages/courses/CourseDescription';
import RequireAuth from './components/auth/RequireAuth';
import CreateCourse from './pages/courses/CreateCourse';
import DeniedPage from './pages/DeniedPage';
import Profile from './pages/user/Profile';
import EditProfile from './pages/user/EditProfile';
import Checkout from './pages/payments/Checkout';
import CheckoutSuccess from './pages/payments/CheckoutSuccess';
import DisplayLecture from './pages/Dashboard/DisplayLecture';
import AddLecture from './pages/Dashboard/AddLecture';



function App() {
 

  return (
   <>
      <Routes>
        <Route path='/' element={<HomePage/>} ></Route>
        <Route path='/about' element={<AboutUs/>} ></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/courses' element={<CourseList/>}></Route>
        <Route path='/contact' element={<Contacts/>}></Route>
        <Route path='/course/description' element={<CourseDescription/>}></Route>

        <Route path='/denied' element={<DeniedPage/>}></Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
          <Route path='/course/create' element={<CreateCourse/>}></Route>
          <Route path='/course/addlecture' element={<AddLecture/>}></Route>

        </Route>
        
        <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]}/>}>
            <Route path='/user/profile' element={<Profile/>}></Route>
            <Route path='/user/editprofile' element={<EditProfile/>}></Route>
            <Route path='/checkout' element={<Checkout/>}></Route>
            <Route path='/checkout/success' element={<CheckoutSuccess/>}></Route>
            <Route path='/course/displaylecture' element={<DisplayLecture/>}></Route>

        </Route>
        

        <Route path='/*' element={<NotfoundPage/>}></Route>
      </Routes>
     
      
   </>
  )
}

export default App
