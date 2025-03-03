import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function AuthLayout() {
    const [titleName, setTitleName] = useState('Ecom-121167');

    const hdlOutletContext = (data) => {
        setTitleName(data);
    };

    document.title = 'Ecom-121167 ' + titleName;

    return (
        <div className="w-full min-w-max h-screen bg-gray-200 flex flex-col items-center">
            <div className="w-full min-w-max m-auto">
                <div className="w-full min-w-max self-center">
                    <Outlet context={hdlOutletContext} />
                </div>
            </div>
        </div>
    )
}