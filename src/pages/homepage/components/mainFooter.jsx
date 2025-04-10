import { useShallow } from "zustand/react/shallow"
import { useEcomStore } from "../../../ecomStore/useEcomStore"
import { createSearchParams, useNavigate } from "react-router-dom";

export default function MainFooter() {
    const { categories } = useEcomStore(useShallow(s => ({ categories: s.categories })));
    const nav = useNavigate();

    const hdlCatClick = (item) => {
        const { id } = item;

        const curPath = window.location.pathname
        const path = curPath === "/" ? 'main/view-by-group' : 'view-by-group';

        nav({
            pathname: path,
            search: createSearchParams({ category_id: `${id}` }).toString()
        });
    };

    return (
        <div className="flex flex-wrap gap-10 h-max lg:h-[130px]">

            {/* categories */}
            <div className="mx-auto px-2">
                <div className="mb-2">
                    categories
                </div>
                <ul className="h-[100px] flex flex-col flex-wrap text-sm">
                    {categories && categories.map(
                        (e, i) => <li key={i} onClick={() => hdlCatClick(e)} className="me-2 cursor-pointer">&#8226; {e.category_name}</li>)
                    }
                </ul>
            </div>

            {/* contact us */}
            <div className="flex flex-col gap-2 mx-auto px-2">
                <div>
                    <div className="mb-2">
                        contact us
                    </div>

                    <div className="text-sm">
                        <span>office: </span>
                        <span>123/30 bangkok 1234556</span>
                    </div>

                    <div className="text-sm">
                        <span>e-mail: </span>
                        <span>ecom-shop@mail.com</span>
                    </div>

                </div>

                <div>
                    <div className="text-sm">
                        social media
                    </div>

                    <div className="mt-1 flex gap-2 text-sm">
                        <i className="fa-brands fa-line"></i>
                        <i className="fa-brands fa-facebook-f"></i>
                    </div>
                </div>
            </div>

            {/* about */}
            <div className="mx-auto px-2">
                <div className="mb-2">
                    about
                </div>
                <div className="text-sm">
                    <span>This website description...</span>
                </div>
            </div>

        </div>
    )
};