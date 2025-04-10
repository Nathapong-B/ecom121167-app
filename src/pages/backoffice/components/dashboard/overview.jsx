import { useShallow } from "zustand/react/shallow"
import { useEcomStore } from "../../../../ecomStore/useEcomStore"
import { useAuthStore } from "../../../../ecomStore/authStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Overview() {
    const { token } = useAuthStore(useShallow(s => ({
        token: s.token,
    })));
    const { countuser, countproduct, countcategory, actionCountModel } = useEcomStore(useShallow(s => ({
        countuser: s.countuser,
        countproduct: s.countproduct,
        countcategory: s.countcategory,
        actionCountModel: s.actionCountModel,
    })));

    useEffect(() => {
        if (!countuser) actionCountModel('user', token);
        if (!countproduct) actionCountModel('product', token);
        if (!countcategory) actionCountModel('category', token);
    }, []);

    return (
        <>
            <div className="flex gap-4">
                {/* overview */}
                <div className="group grow shadow-lg bg-white text-center py-4 border-t-4 rounded rounded-xl hover:border-t-4 hover:border-t-red-500 hover:text-red-500 hover:shadow-none">
                    <Link to={'/backoffice/categories'}>
                        <div className="text-gray-500 text-sm group-hover:text-red-500">
                            <i className="fa-solid fa-layer-group"></i>
                            <span className="hidden ms-2 sm:inline">All categories</span>
                        </div>
                        <div className="text-3xl">{countcategory?.toLocaleString()}</div>
                    </Link>
                </div>
                <div className="group grow shadow-lg bg-white text-center py-4 border-t-4 rounded rounded-xl hover:border-t-4 hover:border-t-red-500 hover:text-red-500 hover:shadow-none">
                    <Link to={'/backoffice/product'}>
                        <div className="text-gray-500 text-sm group-hover:text-red-500">
                            <i className="fa-solid fa-boxes-stacked"></i>
                            <span className="hidden ms-2 sm:inline">All products</span>
                        </div>
                        <div className="text-3xl">{countproduct?.toLocaleString()}</div>
                    </Link>
                </div>
                <div className="group grow shadow-lg bg-white text-center py-4 border-t-4 rounded rounded-xl hover:border-t-4 hover:border-t-red-500 hover:text-red-500 hover:shadow-none">
                    <Link to={'/backoffice/user'}>
                        <div className="text-gray-500 text-sm text-center group-hover:text-red-500">
                            <i className="fa-solid fa-users"></i>
                            <span className="hidden ms-2 sm:inline">All member</span>
                        </div>
                        <div className="text-3xl">{countuser?.toLocaleString()}</div>
                    </Link>
                </div>
                {/* <div className="grow bg-white">1</div> */}
            </div>
        </>
    )
};