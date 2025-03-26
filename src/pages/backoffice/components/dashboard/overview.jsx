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
                <div className="grow bg-white text-center py-4 border-t-4 hover:border-t-4 hover:border-t-red-500 cursor-pointer">
                    <Link to={'/backoffice/categories'}>
                        <div className="text-gray-500">All categories</div>
                        <div className="text-3xl">{countcategory?.toLocaleString()}</div>
                    </Link>
                </div>
                <div className="grow bg-white text-center py-4 border-t-4 hover:border-t-4 hover:border-t-red-500">
                    <Link to={'/backoffice/product'}>
                        <div className="text-gray-500">All products</div>
                        <div className="text-3xl">{countproduct?.toLocaleString()}</div>
                    </Link>
                </div>
                <div className="grow bg-white text-center py-4 border-t-4 hover:border-t-4 hover:border-t-red-500">
                    <Link to={'/backoffice/user'}>
                        <div className="text-gray-500">All member</div>
                        <div className="text-3xl">{countuser?.toLocaleString()}</div>
                    </Link>
                </div>
                {/* <div className="grow bg-white">1</div> */}
            </div>
        </>
    )
};