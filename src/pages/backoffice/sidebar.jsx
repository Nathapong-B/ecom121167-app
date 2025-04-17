import { Link, NavLink } from "react-router-dom";
import { signOut } from "../auth/components/signout";
import LoadingCover from "../loadingCover";
import { useState } from "react";

export default function SideBar() {
    const [isLoadingCoverPage, setIsLoadingCoverPage] = useState(false);

    const hdlSignout = () => {
        setIsLoadingCoverPage(true)
        setTimeout(() => {
            setIsLoadingCoverPage(false);
            signOut({ isReload: true });
        }, 2000);
    };

    return (
        <div>
            <LoadingCover title={'Processing please wait.'} isLoading={isLoadingCoverPage} />

            <div className="min-w-max w-max md:w-full m-auto text-gray-400 font-bold">

                <div className="mt-10 mb-16 mx-2">
                    <div className="w-max m-auto">

                        {/* <div className="text-end text-10px relative top-2 hidden md:block"> */}
                        <div className="text-end text-10px relative top-2 invisible md:visible w-[0px] md:w-full truncate">
                            <Link to={'/'} title="Home page">
                                <span className="italic text-gray-500">goto</span>Home page
                            </Link>
                        </div>

                        <div className="text-2xl block md:hidden">
                            <Link to={'/'} title="Home page">
                                AP
                            </Link>
                        </div>
                        <div className="text-2xl hidden md:block">ADMIN PANEL</div>

                    </div>
                </div>

                <div className="text-center md:text-start md:pl-10 flex flex-col">

                    <NavLink to={'dashboard'} title="Dashboard" className={({ isActive }) => isActive ? 'active-menu-sidebar' : 'menu-sidebar'}>
                        <button>
                            <span className="me-1 inline md:hidden"><i className="fa-solid fa-chart-line"></i></span>
                            <span className="hidden md:inline">Dashboard</span>
                        </button>
                    </NavLink>

                    <NavLink to={'categories'} title="Categories" className={({ isActive }) => isActive ? 'active-menu-sidebar' : 'menu-sidebar'}>
                        <button>
                            <span className="me-1 inline md:hidden"><i className="fa-solid fa-layer-group"></i></span>
                            <span className="hidden md:inline">Categories</span>
                        </button>
                    </NavLink>

                    <NavLink to={'product'} title="Products" className={({ isActive }) => isActive ? 'active-menu-sidebar' : 'menu-sidebar'}>
                        <button>
                            <span className="me-1 inline md:hidden"><i className="fa-solid fa-boxes-stacked"></i></span>
                            <span className="hidden md:inline">Products</span>
                        </button>
                    </NavLink>

                    <NavLink to={'order'} title="Orders" className={({ isActive }) => isActive ? 'active-menu-sidebar' : 'menu-sidebar'}>
                        <button>
                            <span className="me-1 inline md:hidden"><i className="fa-solid fa-box"></i></span>
                            <span className="hidden md:inline">Orders</span>
                        </button>
                    </NavLink>

                    <NavLink to={'user'} title="Users" className={({ isActive }) => isActive ? 'active-menu-sidebar' : 'menu-sidebar'}>
                        <button>
                            <span className="me-1 inline md:hidden"><i className="fa-solid fa-users"></i></span>
                            <span className="hidden md:inline">Users</span>
                        </button>
                    </NavLink>

                    <NavLink to={'profile'} title="Profile" className={({ isActive }) => isActive ? 'active-menu-sidebar mt-4' : 'menu-sidebar mt-4'}>
                        <button>
                            <span className="me-1 inline md:hidden"><i className="fa-solid fa-user"></i></span>
                            <span className="hidden md:inline">Profile</span>
                        </button>
                    </NavLink>

                </div>
                <hr className="m-5 border-gray-400"></hr>
                <div>
                    <button title="Sign out" className="hover:text-gray-50" onClick={hdlSignout}>
                        <span className="me-1 inline md:hidden"><i className="fa-solid fa-right-from-bracket"></i></span>
                        <span className="hidden md:inline">Sign out</span>
                    </button>
                </div>
            </div>
        </div>
    );
};