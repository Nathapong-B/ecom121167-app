import { useShallow } from "zustand/react/shallow";
import { useEcomStore } from "../../ecomStore/useEcomStore"
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../ecomStore/authStore";
import BoxCategories from "./components/boxCategories";
import BoxProfileMenu from "./components/boxProfileMenu";
import BoxCart from "./components/boxCart";
import { Link } from "react-router-dom";
import { useCartStore } from "../../ecomStore/useCartStore";
import NavSearch from "./components/navSearch";

export default function NavBar() {
    const { profile } = useAuthStore(useShallow(s => ({
        profile: s.profile,
    })));
    const { categoriesList, callListCategories } = useEcomStore(useShallow(s => ({
        categoriesList: s.categories,
        callListCategories: s.actionCallListCategoriesOnHome,
    })));
    const { cart, actionTest } = useCartStore(useShallow(s => ({
        cart: s.cart,
        actionTest: s.actionTest,
    })));
    const [categoriesBox, setCategoriesBox] = useState(false);
    const [basketBox, setBasketBox] = useState(false);
    const [profileBox, setProfileBox] = useState(false);
    const containEl = useRef();
    const colorDefault = "bg-gradient-to-r from-gray-200/90 from-20% via-gray-200/50 to-gray-200/90 to-80%";
    const colorTextDefault = "text-gray-500 shadow-sm";
    const colorTextWhite = "text-gray-200";
    const [scrollTop, setScrollTop] = useState(0);
    const [clientHeight, setClientHeight] = useState(0);

    const navBlur = () => {
        const path = location.pathname;
        if (path === '/' || path === '/main') {
            if (scrollTop > clientHeight) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        };
    };

    const changeColor = () => {
        if (navBlur()) {
            return colorTextDefault;
        } else {
            return colorTextWhite;
        }
    };

    const updateStore = () => {
        useCartStore.persist.rehydrate()
    };

    useEffect(() => {
        if (!categoriesList) {
            callListCategories(6)
        };

        window.addEventListener('scroll', () => {
            const {
                scrollTop,
                clientHeight
            } = document.documentElement;
            setClientHeight(() => clientHeight);
            setScrollTop(() => scrollTop);
        });

        window.addEventListener('focus', updateStore);
    }, []);

    return (
        <div ref={containEl} className={`navbar relative w-full px-6 h-10 flex justify-center ${changeColor()}`}>

            {navBlur() && <div className="absolute bg-gray-200/10 w-full h-full backdrop-blur-sm z-10"></div>}

            <div className="w-full max-w-6xl flex flex-wrap items-center justify-between z-50">

                <div className="flex flex-wrap items-center gap-4 mt-2">
                    <div className="text-nav w-max overflow-hidden">
                        <Link to={'/main'}>
                            <span className="sm:text-sm"><i className="fa-solid fa-house me-1"></i></span>
                            <span className="hidden sm:inline">หน้าหลัก</span>
                        </Link>
                    </div>

                    <div className="text-nav relative w-max z-20" onMouseOver={() => setCategoriesBox(true)} onMouseOut={() => setCategoriesBox(false)}>
                        <span className="sm:text-sm"><i className="fa-solid fa-boxes-stacked me-1"></i></span>
                        <div className="text-nav hidden sm:inline">หมวดหมู่</div>
                        {categoriesBox
                            ? <div onMouseOver={() => setCategoriesBox(true)} onMouseOut={() => setCategoriesBox(false)}>
                                <BoxCategories categoriesList={categoriesList} />
                            </div>
                            : <></>
                        }
                    </div>

                    <div className="w-[200px] hidden sm:block">
                        <NavSearch />
                    </div>

                </div>

                <div className="flex gap-6 mt-2">

                    <div>
                        {profile
                            ?
                            <div className="relative w-max justify-items-end">
                                <div className="flex gap-2 items-center" onMouseOver={() => setProfileBox(true)} onMouseOut={() => setProfileBox(false)}>
                                    <div className="text-nav bg-white w-6 h-6 overflow-hidden rounded rounded-full">
                                        {profile.ProfileImage?.url
                                            ? <img src={profile.ProfileImage.url} className="w-full h-full"></img>
                                            : <div className="w-full h-full flex flex-col items-center justify-end">
                                                <div className="bg-gray-300 w-2/5 h-2/5 rounded rounded-full"></div>
                                                <div className="bg-gray-300 w-4/5 h-1/2 rounded-t-full"></div>
                                            </div>
                                        }
                                    </div>
                                    <div className="text-nav w-max max-w-[100px] truncate hidden sm:block">{profile.email}</div>
                                </div>

                                {profileBox
                                    ? <div onMouseOver={() => setProfileBox(true)} onMouseOut={() => setProfileBox(false)}>
                                        <BoxProfileMenu />
                                    </div>
                                    : <></>
                                }

                            </div>
                            : <div className="text-nav w-max justify-items-end">
                                <Link to={'/auth/signin'}>
                                    <span className="sm:text-sm"><i className="fa-solid fa-right-to-bracket me-1"></i></span>
                                    <span className="hidden sm:inline">Sign-in</span>
                                </Link>
                            </div>
                        }
                    </div>

                    <div className="relative w-[10px] max-w-[10px] justify-items-end">
                        <div className="text-nav flex " onMouseOver={() => setBasketBox(true)} onMouseOut={() => setBasketBox(false)}>
                            <Link to={'main/cart'}>
                                <div>
                                    <i className="fa-solid fa-cart-shopping fa-lg"></i>
                                </div>
                                <div className="absolute -top-1 -right-2 bg-red-500 rounded rounded-full text-xs text-gray-200 h-4 w-4 flex justify-center items-center">
                                    <div>
                                        {cart.length}
                                    </div>
                                </div>
                            </Link>
                        </div>
                        {basketBox
                            ? <div onMouseOver={() => setBasketBox(true)} onMouseOut={() => setBasketBox(false)}>
                                <BoxCart cart={cart} />
                            </div>
                            : <></>
                        }
                    </div>
                </div>

                <div className="w-full mt-3 sm:hidden">
                    <NavSearch />
                </div>

            </div>

        </div>
    )
};