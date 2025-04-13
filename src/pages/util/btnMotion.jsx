export default function BtnMotionSlice({ index = 0, data = '', start = 'right-[100%]', stop = 'right-[15%]', btnmain = 'main', btnsecond = 'second', colmain = 'bg-green-500', colsecond = 'bg-gray-500', returndata }) {
    const hdlBtnActHover = (inx, act) => {
        const el = document.getElementsByName(`${inx}`);

        if (act) {
            el[0].classList.replace(start, stop);
        } else {
            el[0].classList.replace(stop, start);
        };

    };

    const hdlClick = (d) => {
        returndata(d);
    };

    return (
        <button className={`relative bo-btn-add overflow-hidden ${colmain}`} onMouseOver={() => hdlBtnActHover(index, true)} onMouseLeave={() => hdlBtnActHover(index, false)} onClick={() => hdlClick(data)}>
            <div name={index} className={`absolute ${start} ${colsecond} top-0 w-full px-2 rounded rounded-full overflow-hidden transition-all duration-100 ease-linear`}>{btnsecond}</div>
            <div>{btnmain}</div>
        </button>
    )
};