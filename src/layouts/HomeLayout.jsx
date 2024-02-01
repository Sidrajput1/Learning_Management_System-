import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

import Footer from '../components/Footer'

function HomeLayout({children}) {

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
                        <li>
                            <Link to="/courses">All Coursed</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contacts</Link>
                        </li>
                        <li>
                            <Link to="/about">About Us</Link>
                        </li>


                    </ul>
                </div>

            </div>

            {children}
            <Footer />

        </div>
    );

}

export default HomeLayout;