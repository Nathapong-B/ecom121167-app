import { useEffect, useState } from "react";
import { useAuthStore } from "../../../ecomStore/authStore";
import { useEcomStore } from "../../../ecomStore/useEcomStore";
import { useShallow } from "zustand/react/shallow";
import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import BtnMotionSlice from "../../util/btnMotion";
import LoadingCover from "../../loadingCover";

export default function ListCategoriesInactive() {
    const token = useAuthStore(s => s.token);
    const { callListCategories, updateStatus, removeCategory, inactiveCategories } = useEcomStore(
        useShallow((s) => ({
            inactiveCategories: s.inactiveCategories,
            updateStatus: s.actionUpdateStatusCategory,
            callListCategories: s.actionCallListCategories,
            updateCategory: s.actionUpdateCategory,
            removeCategory: s.actionRemoveCategory,
        }))
    );
    const [isLoadingCoverPage, setIsLoadingCoverPage] = useState(false);

    const hdlUpdateStatusCategory = async (item) => {
        const event = await Swal.fire({
            title: 'Change to Active Category ?',
            icon: 'question',
            text: `${item.category_name}`,
            showCancelButton: 'true'
        });

        if (event.isConfirmed) {
            setIsLoadingCoverPage(true);
            const res = await updateStatus(item, token);

            if (res.status === 200) {
                toast.success(`${res.data.message}`);
            } else if (res.error) {
                toast.error(`${res.error.message}`);
                console.log(res.error.message)
            };

            setIsLoadingCoverPage(false);
        };
    };

    const hdlRemoveCategory = async (item) => {
        const even = await Swal.fire({
            title: 'Remove Category ?',
            icon: 'warning',
            text: `${item.category_name}`,
            showCancelButton: 'true'
        });

        if (even.isConfirmed) {
            setIsLoadingCoverPage(true);
            const id = item.id;
            const res = await removeCategory(id, token);

            if (res.status === 200) {
                toast.success(`${res.data.message}`);
            } else if (res.error) {
                toast.error(`${res.error.message}`);
                console.log(res.error.message)
            };

            setIsLoadingCoverPage(false);
        };
    };

    useEffect(() => {
        if (!inactiveCategories) {
            callListCategories('inactive', token);
        }
    }, []);

    return (
        <div>
            <LoadingCover title={'Processing please wait.'} isLoading={isLoadingCoverPage} />
            <div>

                <table className="bo-tb">
                    <thead>
                        <tr>
                            <th className="w-3/4">Catagories</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        {inactiveCategories
                            ? inactiveCategories.map((e, i) => (
                                <tr key={i} className="tb-tr">
                                    <td>
                                        <div className="relative w-max">
                                            <div>
                                                {e.category_name}
                                            </div>
                                            <div className="absolute top-0 -right-5 h-4 bg-yellow-200 flex items-center px-1 text-8px border border-orange-300 rounded-full">{e.Product.length}</div>
                                        </div>
                                    </td>

                                    <td className="text-center">
                                        <BtnMotionSlice index={i} data={e} start={'right-[100%]'} stop={'right-[15%]'} btnmain={'Inactive'} btnsecond={'Active'} colmain={'bg-gray-500'} colsecond={'bg-green-500'} returndata={hdlUpdateStatusCategory} />
                                        <button className="bo-btn-add bg-red-500 ms-2" onClick={() => hdlRemoveCategory(e)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                            : <></>
                        }

                    </tbody>
                </table>

            </div>
        </div>
    )
};