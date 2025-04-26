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

    const updateStore = () => {
        useCartStore.persist.rehydrate()
    };

    useEffect(() => {
        if (!categoriesList) {
            callListCategories(6)
        };

        window.addEventListener('focus', updateStore);
    }, []);

    return (
        <div ref={containEl} className={`navbar relative w-full px-4 sm:px-6 h-16 flex items-center justify-center bg-white shadow-md text-gray-800`}>

            <div className="w-full max-w-7xl flex items-center justify-between">

                <div className="flex items-center gap-6">
                    <div className="text-xl font-bold text-blue-600">
                        <Link to={'/main'}>LOGO</Link>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <div className="text-nav hover:text-blue-600">
                            <Link to={'/main'}>
                                <span className="sm:text-sm"><i className="fa-solid fa-house me-1"></i></span>
                                <span className="hidden sm:inline">หน้าหลัก</span>
                            </Link>
                        </div>
                        <div className="text-nav relative z-20">
                            <button 
                                className="flex items-center hover:text-blue-600"
                                onClick={() => setCategoriesBox(!categoriesBox)}
                            >
                                <span className="sm:text-sm"><i className="fa-solid fa-layer-group me-1"></i></span>
                                <span className="hidden sm:inline">หมวดหมู่</span>
                            </button>
                            {categoriesBox &&
                                <div 
                                    className="absolute left-0 mt-2 z-30 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-2 px-4 w-max max-w-md" 
                                    onMouseLeave={() => setCategoriesBox(false)}
                                >
                                    <ul className="text-sm text-gray-700 columns-2 md:columns-3 gap-x-6">
                                        {
                                            [
                                                'Monitor Screen', 'Personal Computer / PC', 'Case', 'Laptop / Notebook',
                                                'Taplet', 'Mobile Phone', 'Gadget', 'Graphic Card', 'Accessories',
                                                'Storage', 'Memory', 'Mainboard'
                                            ].map((category, index) => (
                                                <li key={index} className="break-inside-avoid-column mb-1">
                                                    <button 
                                                        className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
                                                        onClick={() => { 
                                                            console.log(`Clicked static category: ${category}`); 
                                                            setCategoriesBox(false);
                                                        }}
                                                    >
                                                        {category}
                                                    </button>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            }
                        </div>
                        <div className="w-[250px] hidden lg:block">
                            <NavSearch />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="lg:hidden">
                        <NavSearch />
                    </div>
                    <div className="relative">
                        <button 
                            className="text-nav hover:text-blue-600 flex relative" 
                            onClick={(e) => { 
                                e.preventDefault(); 
                                setBasketBox(!basketBox);
                            }}
                            aria-label="Toggle cart dropdown"
                        >
                            <i className="fa-solid fa-cart-shopping fa-lg"></i>
                            {cart.length > 0 && (
                                <div className="absolute -top-1 -right-2 bg-red-500 rounded-full text-xs text-white h-4 w-4 flex justify-center items-center">
                                    {cart.length}
                                </div>
                            )}
                        </button>
                        
                        {basketBox && (
                             <div className="absolute right-0 mt-2 z-30" onMouseLeave={() => setBasketBox(false)}>
                                <BoxCart cart={cart} />
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        {profile
                            ?
                            <div className="relative flex items-center">
                                <button className="flex gap-2 items-center" onClick={() => setProfileBox(!profileBox)}>
                                    <div className="text-nav bg-white w-8 h-8 overflow-hidden rounded-full border border-gray-300 flex items-center justify-center">
                                        {profile.ProfileImage?.url
                                            ? <img src={profile.ProfileImage.url} className="w-full h-full object-cover"></img>
                                            : <i class="fa-solid fa-user text-gray-400"></i>
                                        }
                                    </div>
                                    <div className="text-nav w-max max-w-[100px] truncate hidden lg:inline hover:text-blue-600">{profile.email}</div>
                                </button>
                                {profileBox &&
                                    <div className="absolute right-0 mt-2 z-30" onMouseLeave={() => setProfileBox(false)}>
                                        <BoxProfileMenu />
                                    </div>
                                }
                            </div>
                            : <Link to={'/auth/signin'} className="text-nav hover:text-blue-600 flex items-center gap-1">
                                <i className="fa-solid fa-right-to-bracket"></i>
                                <span className="hidden sm:inline">Sign-in</span>
                            </Link>
                        }
                    </div>

                    <div className="md:hidden">
                        <button className="text-gray-600 hover:text-blue-600">
                            <i className="fa-solid fa-bars fa-lg"></i>
                        </button>
                    </div>

                </div>

            </div>

        </div>
    )
};