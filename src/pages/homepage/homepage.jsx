import { Outlet } from "react-router-dom"
import { tokenExpire } from "../auth/components/jwtValidate"
import { useEffect, useState } from "react";
import HomepageCover from "./homepageCover";
import { useAuthStore } from "../../ecomStore/authStore";
import { useShallow } from "zustand/react/shallow";
import { useCartStore } from "../../ecomStore/useCartStore";
import NavBar from "./navbar";
import MainFooter from "./components/mainFooter";
import { signOut } from "../auth/components/signout";

export default function Homepage() {
    const { uId, token, actionRefreshToken } = useAuthStore(useShallow(s => ({
        uId: s.user?.sub,
        token: s.token,
        actionRefreshToken: s.actionRefreshToken,
    })));
    const path = window.location.pathname;
    const scrollRestoration = history.scrollRestoration;
    const [homeCoverClose, setHomeCoverClose] = useState(false);
    const [titleName, setTitleName] = useState('Ecom-121167');

    const hdlSignOut = () => {
        signOut({ isReload: true });
    };

    const tokenValid = async () => {
        if (!token) return;

        const tokenExp = tokenExpire(token);

        const min = Math.floor(tokenExp.expIn / 60);

        if (min < 1) {
            const res = await actionRefreshToken();

            if (res.error) {
                hdlSignOut();
            };
        };
    };

    useEffect(() => {
        // ไม่ต้องให้คืนค่า scroll อัตโนมัติ เมื่อมีการรีโหลดหน้าเพจ เพื่อให้จัดการ scrollTop ด้วยตนเอง
        if (scrollRestoration === "auto") {
            history.scrollRestoration = "manual";
        };

        window.document.documentElement.scrollTop = 0;

        syncUserCart();

        window.addEventListener('focus', checkMultiTab);

        window.addEventListener('click', tokenValid);

        // Add a scroll handler specifically for closing the cover
        const handleScrollToCloseCover = () => {
            // Only run if the cover is currently visible and on the root path
            if (window.location.pathname === '/' && !homeCoverClose) {
                // Use the same state setter as the click handler
                setHomeCoverClose(true);
                // Remove this specific listener once the cover is closed
                window.removeEventListener('scroll', handleScrollToCloseCover);
            }
        };

        // Attach the scroll listener only if on the root path and cover is visible
        if (path === '/' && !homeCoverClose) {
            window.addEventListener('scroll', handleScrollToCloseCover);
        }

        // Cleanup function
        return () => {
            window.removeEventListener('click', tokenValid);
            window.removeEventListener('focus', checkMultiTab);
            // Ensure the scroll listener is also removed on unmount/cleanup
            window.removeEventListener('scroll', handleScrollToCloseCover);
        };
    }, [token, path, homeCoverClose]); // Add path and homeCoverClose to dependency array

    const syncUserCart = () => {
        // ตรวจสอบไอดียูส กับตะกร้าต้องตรงกัน
        const localName = useCartStore.persist.getOptions().name;
        if (uId && !localName[localName.search(uId)]) {
            return location.reload();
        };
    };

    // checkMultiTab กรณีเปิดหลายแท็ป
    const checkMultiTab = () => {
        // ตรวจสอบไอดีในlocal กับใน state ถ้าไม่ตรงกันให้ reload เกิดขึ้นในกรณีที่ออกจากระบบหรือเข้าสู่ระบบจากแท็ปอื่น
        const local = localStorage.getItem(useAuthStore.persist.getOptions().name);
        const sub = JSON.parse(local)?.state.user.sub;
        if (uId !== sub) {
            return location.reload();
        };
    };

    const hdlCoverClose = (data) => {
        setHomeCoverClose(data);
    };

    const coverHidden = () => {
        if (homeCoverClose) return "hidden";
        return "";
    };

    const hdlOutletContext = (data) => {
        setTitleName(data);
    };

    document.title = 'Ecom-121167 ' + titleName;

    return (
        <div className="relative w-full min-h-screen p-0 m-0 flex flex-col bg-main">

            {path === '/' &&
                <div className={`h-screen w-full fixed top-0 z-50 transition-transform duration-500 ease-in-out ${homeCoverClose ? '-translate-y-full' : 'translate-y-0'}`}>
                    <HomepageCover close={hdlCoverClose} onClose={token ? true : false} />
                </div>
            }

            <div className="sticky top-0 w-full z-40">
                <NavBar />
            </div>

            <div className="z-10 flex-1">
                <Outlet context={hdlOutletContext} />
            </div>

            <MainFooter />

        </div>
    )
}