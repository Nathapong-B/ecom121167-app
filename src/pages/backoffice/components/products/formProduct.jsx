import { useEffect, useState } from "react"
import { useEcomStore } from "../../../../ecomStore/useEcomStore";
import { hdlClickInput, hdlInputOnBlur, cssSetting } from "../../../util/animateInputForm";
import { useShallow } from "zustand/shallow";

export default function FormProduct(props) {
    const [data, setData] = useState(props.data ? props.data : null);
    const { categories,callListCategories } = useEcomStore(useShallow(s => ({
        categories: s.categories,
        callListCategories: s.actionCallListCategoriesOnHome,
    })));
    const { cssTopNag, cssTopNagDes } = cssSetting;

    const hdlInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        return setData(prev => ({ ...prev, [name]: value }));
    };

    const hdlCallListCategories = async() => {
        await callListCategories();
    };

    useEffect(() => {
        props.returnData(data ?? {});

        if (!categories) {
            hdlCallListCategories();
        };
    }, [data]);

    return (
        <div>
            <form className="my-4">
                <div className="relative flex items-center py-4">
                    <label name="product_name" id="label_product_name" htmlFor="product_name" className={data?.product_name ? `label-input-animate ${cssTopNag}` : `label-input-animate`} onClick={(e) => hdlClickInput(e)}>Product name</label>
                    <input name="product_name" id="product_name" value={data?.product_name ?? ''} onChange={e => hdlInputChange(e)} className="frm-input w-full" onClick={(e) => hdlClickInput(e)} onBlur={e => hdlInputOnBlur(e)}></input>
                </div>

                <div className="relative flex items-center py-4">
                    <label name="category_id" id="label_category_id" htmlFor="category_id" className={data?.category_id ? `label-input-animate z-20 ${cssTopNag}` : `label-input-animate z-0`} onClick={(e) => hdlClickInput(e)}>Category</label>
                    <select name="category_id" id="category_id" value={data?.category_id ?? ''} onChange={e => hdlInputChange(e)} className="frm-input z-10" onClick={(e) => hdlClickInput(e)} onBlur={e => hdlInputOnBlur(e)}>
                        <option value='' disabled>Select Categories</option>
                        {categories
                            ?
                            categories.map((e, i) => (<option key={i} value={e.id}>{e.category_name}</option>))
                            : <></>
                        }
                    </select>
                </div>

                <div className="flex">
                    <div className="relative flex items-center py-4 w-1/3">
                        <label id="label_stock" name="stock" htmlFor="stock" className={data?.stock ? `label-input-animate ${cssTopNag}` : `label-input-animate`} onClick={(e) => hdlClickInput(e)}>Stock</label>
                        <input id="stock" name="stock" value={data?.stock ?? ''} onChange={e => hdlInputChange(e)} className="frm-input w-2/3" onClick={(e) => hdlClickInput(e)} onBlur={e => hdlInputOnBlur(e)}></input>
                    </div>

                    <div className="relative flex items-center py-4 w-1/3">
                        <label id="label_cost" name="cost" htmlFor="cost" className={data?.cost ? `label-input-animate ${cssTopNag}` : `label-input-animate`} onClick={(e) => hdlClickInput(e)}>Cost</label>
                        <input id="cost" name="cost" value={data?.cost ?? ''} onChange={e => hdlInputChange(e)} className="frm-input w-2/3" onClick={(e) => hdlClickInput(e)} onBlur={e => hdlInputOnBlur(e)}></input>
                    </div>

                    <div className="relative flex items-center py-4 w-1/3">
                        <label id="label_price" htmlFor="price" name="price" className={data?.price ? `label-input-animate ${cssTopNag}` : `label-input-animate`} onClick={(e) => hdlClickInput(e)}>Price</label>
                        <input id="price" name="price" value={data?.price ?? ''} onChange={e => hdlInputChange(e)} className="frm-input w-2/3" onClick={(e) => hdlClickInput(e)} onBlur={e => hdlInputOnBlur(e)}></input>
                    </div>
                </div>

                <div className="relative py-4">
                    <label id="label_description" htmlFor="description" name="description" className={data?.description ? `label-input-animate ${cssTopNagDes}` : `label-input-animate`} onClick={(e) => hdlClickInput(e)}>Description</label>
                    <textarea id="description" name="description" value={data?.description ?? ''} onChange={e => hdlInputChange(e)} className="frm-input w-full" onClick={(e) => hdlClickInput(e)} onBlur={e => hdlInputOnBlur(e)} ></textarea>
                </div>
            </form >

        </div >
    )
};