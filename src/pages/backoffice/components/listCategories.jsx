import { useEffect, useState } from "react";
import { useAuthStore } from "../../../ecomStore/authStore";
import { useEcomStore } from "../../../ecomStore/useEcomStore";
import { useShallow } from "zustand/react/shallow";
import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import BtnMotionSlice from "../../util/btnMotion";
import LoadingCover from "../../loadingCover";

export default function ListCategories() {
    const token = useAuthStore(s => s.token);
    const { callListCategories, updateStatus, updateCategory, categories } = useEcomStore(
        useShallow((s) => ({
            categories: s.categories,
            updateStatus: s.actionUpdateStatusCategory,
            callListCategories: s.actionCallListCategories,
            updateCategory: s.actionUpdateCategory,
        }))
    );
    const [nameEdit, setNameEdit] = useState('');
    const [onEdit, setOnEdit] = useState();
    const [isLoadingCoverPage, setIsLoadingCoverPage] = useState(false);

    const hdlClickforEdit = (index, name) => {
        setOnEdit(index);
        setNameEdit(name);
    };

    const hdlEditName = (text) => {
        const newName = text.target.value;
        setNameEdit(newName);
    };

    const hdlSaveEdit = async (item) => {
        const id = item.id
        const data = { category_name: nameEdit };

        setIsLoadingCoverPage(true);
        const res = await updateCategory(id, data, token);

        if (res.status === 200) {
            setOnEdit();
            setNameEdit('');
            toast.success(`${res.data.message}`);
        } else if (res.error) {
            console.log(res.error.message)
            toast.error(`${res.error.message}`);
        };

        setIsLoadingCoverPage(false);
    };

    const hdlCancelEdit = () => {
        setOnEdit();
        setNameEdit('');
    };

    const hdlUpdateStatusCategory = async (item) => {
        const event = await Swal.fire({
            title: 'Change to Inactive Category ?',
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

    useEffect(() => {
        if (!categories) {
            callListCategories('active', token);
        }
    }, [])

    return (
        <div>
            <LoadingCover title={'Processing please wait.'} isLoading={isLoadingCoverPage} />
            <div>

                {/* table */}
                <table className="bo-tb">
                    <thead>
                        <tr>
                            <th className="w-3/4">Catagories</th>
                            <th className="w-1/4">Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        {categories
                            ? categories.map((e, i) => (
                                onEdit === i
                                    ?
                                    <tr key={i} className="tb-tr-hover">
                                        {/* <tr key={i} className="bg-gray-100 hover:font-medium hover:bg-gray-50"> */}

                                        <td className="font-normal">
                                            <input type="text" value={nameEdit} onChange={el => hdlEditName(el)} className="frm-input py-0" autoFocus></input>
                                        </td>
                                        <td className="text-center">
                                            <button className="bo-btn-add bg-sky-500" onClick={() => hdlSaveEdit(e)}>Save</button>
                                            <button className="bo-btn-add bg-gray-500 ms-2" onClick={hdlCancelEdit}>Cancel</button>
                                        </td>
                                    </tr>
                                    :
                                    <tr key={i} className="tb-tr-hover">
                                        <td className="cursor-pointer" onClick={() => hdlClickforEdit(i, e.category_name)}>
                                            <div className="relative w-max">
                                                <div>
                                                    {e.category_name}
                                                </div>
                                                <div className="absolute top-0 -right-5 h-4 bg-yellow-200 flex items-center px-1 text-8px border border-orange-300 rounded-full">{e.Product.length}</div>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <BtnMotionSlice index={i} data={e} start={'right-[100%]'} stop={'right-[15%]'} btnmain={'Active'} btnsecond={'Inactive'} returndata={hdlUpdateStatusCategory}/>
                                        </td>

                                    </tr>
                            ))
                            : <></>
                        }

                    </tbody>
                </table>

            </div>
        </div>
    );
};