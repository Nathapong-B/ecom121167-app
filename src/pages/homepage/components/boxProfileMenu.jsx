import { Link } from "react-router-dom";
import { signOut } from "../../auth/components/signout";
import { useAuthStore } from "../../../ecomStore/authStore";

export default function BoxProfileMenu() {
    const user = useAuthStore(s => s.user);

    const hdlSignOut = () => {
        signOut({ isReload: true });
    };

    return (
        <div className="box-float right-0">
            <Link to={'/profile/my-profile'}>
                <div className="p-2 hover:bg-gray-300 cursor-pointer">
                    <i class="fa-solid fa-user-gear me-2"></i>
                    Profile
                </div>
            </Link>
            <Link to={'/profile/my-purchase'}>
                <div className="p-2 hover:bg-gray-300 cursor-pointer">
                    <i class="fa-solid fa-basket-shopping me-2"></i>
                    My purchase
                </div>
            </Link>
            {user?.role === 'admin' &&
                <Link to={'/backoffice'}>
                    <div className="p-2 hover:bg-gray-300 cursor-pointer">
                        <i class="fa-solid fa-store me-2"></i>
                        Back office
                    </div>
                </Link>
            }
            <hr className="my-1"></hr>
            <div className="p-2 hover:bg-gray-300 cursor-pointer" onClick={() => hdlSignOut()}>
                <i class="fa-solid fa-right-from-bracket me-2"></i>
                Sign out
            </div>
        </div>
    )
};