import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "../../../ecomStore/authStore";
import { useEcomStore } from "../../../ecomStore/useEcomStore";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import BtnMotionSlice from "../../util/btnMotion";
import LoadingCover from "../../loadingCover";

export default function ListProductsInactive() {
    const token = useAuthStore(s => s.token);
    const { inactiveProducts, callInactiveData, updateStatus, removeProduct } = useEcomStore(
        useShallow((s) => ({
            inactiveProducts: s.inactiveProducts,
            callInactiveData: s.actionCallListInactiveProducts,
            updateStatus: s.actionUpdateStatusProduct,
            removeProduct: s.actionRemoveProduct,
        }))
    );
    const [isLoadingCoverPage, setIsLoadingCoverPage] = useState(false);

    const callInactive = async () => {
        const res = await callInactiveData(20, token)

        if (res.status === 200) {
            // console.log(res)
        } else if (res.error) {
            toast.error(res.error.message)
            console.log(res)
        }
    };

    const hdlChangeStatus = async (item) => {
        const event = await Swal.fire({
            title: 'Change to active product ?',
            icon: 'question',
            text: `${item.product_name}`,
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

    const hdlRemoveProduct = async (item) => {
        const even = await Swal.fire({
            title: 'Remove Product ?',
            icon: 'warning',
            text: `${item.product_name}`,
            showCancelButton: 'true'
        });

        if (even.isConfirmed) {
            setIsLoadingCoverPage(true);
            const id = item.id;
            const res = await removeProduct(id, token);

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
        if (!inactiveProducts) {
            callInactive();
        }
    }, []);

    return (
        <div>
            <LoadingCover title={'Processing please wait.'} isLoading={isLoadingCoverPage} />

            <table className="bo-tb">
                <thead>
                    <tr>
                        <th className="w-2/12">image</th>
                        <th className="w-4/12">Product name</th>
                        <th className="w-1/12">Stock</th>
                        <th className="w-1/12">Sold</th>
                        <th className="w-2/12">Status</th>
                        <th className="w-2/12">Delete</th>
                    </tr>
                </thead>

                <tbody>

                    {inactiveProducts
                        ? inactiveProducts.map((e, i) => (
                            <tr key={i} className="tb-tr-hover">
                                <td>
                                    {/* {e.Image[0]?.url} */}
                                    <img src={e.Image[0]?.url} className="img-list"></img>
                                </td>
                                <td>{e.product_name}</td>
                                <td className="text-center">{e.stock}</td>
                                <td className="text-center">{e.sold}</td>
                                <td className="text-center">
                                    <BtnMotionSlice index={i} data={e} start={'right-[100%]'} stop={'right-[15%]'} btnmain={'Inactive'} btnsecond={'Active'} colmain={'bg-gray-500'} colsecond={'bg-green-500'} returndata={hdlChangeStatus} />
                                </td>
                                <td className="text-center">
                                    <button className="bo-btn-add bg-red-500" onClick={() => hdlRemoveProduct(e)}>Delete</button>
                                </td>
                            </tr>
                        ))
                        : <></>
                    }

                </tbody>
            </table>
        </div>
    )
};