import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./sidebar";
import { useAuthStore } from "../../ecomStore/authStore";
import { useShallow } from "zustand/react/shallow";

export default function BackOfficeLayout() {
    const { uId } = useAuthStore(useShallow(s => ({
        uId: s.user?.sub,
    })));
    const navigate = useNavigate();
    const [expand, setExpand] = useState(true);

    document.title = 'Back office';

    const hdlUnloadPage = () => {
        localStorage.removeItem('ecomStore-121167');
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

    useEffect(() => {
        const path = window.location.pathname;
        const backoffice = ['/backoffice', '/backoffice/'];

        // หาก pathname มีค่าเท่ากับ backoffice ให้ไปที่หน้า dashboard หากไม่ใช่ เมื่อทำการรีเฟรซ ให้อยู่ที่ path เดิม
        if (backoffice.includes(path)) navigate('dashboard');

        window.addEventListener('focus', checkMultiTab);

        window.addEventListener('beforeunload', hdlUnloadPage);
    }, []);

    const sidebarExpand = () => {
        const expTrue = "left-0 w-max md:w-1/5 min-w-min";
        const expFalse = "-left-[100%] w-0";
        return expand ? expTrue : expFalse;
    };

    return (
        <div className="flex bg-main gap-0">

            <div title="ซ่อน/แสดง แถบเมนู" onClick={() => setExpand(!expand)} className={`absolute top-[25px] left-0 px-4 text-end text-xl text-gray-400 hover:text-gray-50 bg-gray-900 rounded-r rounded-r-full cursor-pointer z-50`}>
                <div className={expand ? "" : "rotate-180"}><i className="fa-solid fa-caret-left"></i></div>
            </div>

            {/* side bar */}
            <div className={`relative bg-gray-900 text-center pt-5 pb-5 h-screen overflow-y-auto transition-all duration-1000 ease-[cubic-bezier(1,0,0,1)] ${sidebarExpand()} z-40`}>
                <SideBar />
            </div>

            {/* content */}
            <div className={`w-full h-screen overflow-y-auto p-5 transition-all duration-2000 ease-out z-10 `}>
                <Outlet />
            </div>

        </div>
    )
};