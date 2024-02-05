
import './App.css'
import { Route, Routes } from 'react-router-dom'
// import HomeLayout from './layouts/HomeLayout';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import NotfoundPage from './pages/NotfoundPage';
import Signup from './pages/Signup';
import Login from './pages/Login';


function App() {
 

  return (
   <>
      <Routes>
        <Route path='/' element={<HomePage/>} ></Route>
        <Route path='/about' element={<AboutUs/>} ></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>

        <Route path='/*' element={<NotfoundPage/>}></Route>
      </Routes>
     
      
   </>
  )
}

export default App
