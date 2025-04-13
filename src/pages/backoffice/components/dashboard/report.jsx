import { useEffect, useState } from "react"
import { useEcomStore } from "../../../../ecomStore/useEcomStore";
import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "../../../../ecomStore/authStore";
import { toast } from "react-toastify";
import LineChart from "./components/lineChart";
import { fulfillTwoDigit, getDayoneuptoToday, getToDay, hdlTimeDuration } from "../../../util/utilDateTime";
import { reportPerDay } from "../../../../api/reportApi";
import { arrForChartData, dataChart } from "../../../util/utilChart";
import { sumCost } from "../../../util/utilReport";

// format "YYYY-MM-DD"
export default function Report() {
    const { token } = useAuthStore(useShallow(s => ({
        token: s.token,
    })));
    const { reportThisMonth, actionReportThisMonth } = useEcomStore(useShallow(s => ({
        reportThisMonth: s.reportThisMonth,
        actionReportThisMonth: s.actionReportThisMonth,
    })));
    const [chartData, setChartData] = useState();
    const [month, setMonth] = useState(() => {
        const dt = new Date().getMonth();
        switch (dt) {
            case 0:
                return "มกราคม";
            case 1:
                return "กุมภาพันธ์";
            case 2:
                return "มีนาคม";
            case 3:
                return "เมษายน";
            case 4:
                return "พฤษภาคม";
            case 5:
                return "มิถุนายน";
            case 6:
                return "กรกฏาคม";
            case 7:
                return "สิงหาคม";
            case 8:
                return "กันยายน";
            case 9:
                return "ตุลาคม";
            case 10:
                return "พฤศจิกายน";
            case 11:
                return "ธันวาคม";
            default:
                return "Somthing wrong";
        }
    });
    const [today, setToday] = useState();
    const [dataInput, setDataInput] = useState({ dayStart: '', dayEnd: '' });
    const [sumTotal, setSumTotal] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [cost, setCost] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async (dayStart, dayEnd, status) => {
        const payload = { dayStart, dayEnd };

        if (status === 'custom') {
            const res = await actionReportThisMonth(payload, token);
            if (res.error) return toast.error(res.error.message);
            return res;
        } else {
            const res = await actionReportThisMonth(payload, token);
            if (res.error) return toast.error(res.error.message);
            return res;
        };
    };

    const hdlDateInput = (data) => {
        const { name, value } = data.target;
        setDataInput(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const hdlPreData = async (input_data) => {
        if (!input_data) {
            //------------- init time duration
            const { dayStart, dayEnd } = getDayoneuptoToday();

            // dS , dE (milliseconds)
            const { dS, dE, dRange, error } = hdlTimeDuration(dayStart, dayEnd);
            if (error) return toast.warning('Incomplete data');

            return arrForChartData({ dS, dRange, dataApi: reportThisMonth });
        } else {
            //------------- custom time duration
            const { dayStart, dayEnd } = input_data;
            if (!dayStart || !dayEnd) return toast.warning('Incomplete data');

            // dS , dE (milliseconds)
            const { dS, dE, dRange, error } = hdlTimeDuration(dayStart, dayEnd);
            if (error) return toast.warning('Incomplete data');

            return arrForChartData({ dS, dRange, dataApi: reportThisMonth });
        };

    };

    const hdlChartData = async () => {
        const { dayStart, dayEnd } = dataInput;
        let arrData;

        if (!dayStart || !dayEnd) {
            arrData = await hdlPreData();
        } else {
            arrData = await hdlPreData(dataInput);
        };
        setSumTotal(() => arrData.reduce((acc, cur) => acc += cur.sum, 0));
        setChartData(() => dataChart({ arrData, bgcolor: 'white', bdcolor: 'red' }));
    };

    const calNetRevenue = (total, cost) => {
        return total - cost;
    };

    const hdlWatch = async () => {
        const { dayStart, dayEnd } = dataInput;
        if (!dayStart || !dayEnd) return toast.warning('Incomplete data');

        // dS , dE (milliseconds)
        const { dS, dE, dRange, error } = hdlTimeDuration(dayStart, dayEnd);
        if (error) return toast.warning('Incomplete data');

        setIsLoading(true);
        // ดึงข้อมูลจากเซิร์ฟเวอร์
        const res = await fetchData(dayStart, dayEnd, 'custom');
        if (res.error) return toast.error(res.error.message);

        if (res.success) {
            setIsLoading(false);
            return arrForChartData({ dS, dRange, dataApi: reportThisMonth });
        } else {
            // console.log(res.message);
            toast.error(res.message);
        };
        setIsLoading(false);
    };

    const hdlSetState = () => {
        setCost(() => reportThisMonth.reduce((acc, cur) => acc += sumCost(cur), 0));
        setTotalOrders(() => reportThisMonth.length);
    };

    useEffect(() => {
        if (!reportThisMonth) {
            const { dayStart, dayEnd } = getDayoneuptoToday();
            fetchData(dayStart, dayEnd);
        } else {
            hdlChartData();
        };

        setToday(() => {
            const { nowDate, nowMonth, nowYear } = getToDay();
            return nowYear + '-' + fulfillTwoDigit(nowMonth) + '-' + fulfillTwoDigit(nowDate);
        });

        reportThisMonth && hdlSetState();
    }, [reportThisMonth]);

    return (
        <div className="w-full">
            <div className="font-bold text-xl text-green-600 block lg:hidden">
                <i className="fa-solid fa-coins me-2"></i>
                รายงานยอดขาย
            </div>

            <div className="bg-gradient-to-r from-white/0 from-0% sm:from-30% to-white to-20% sm:to-50% p-2 pe-8 mb-2 flex justify-between">
                <div className="font-bold text-xl text-green-600 hidden lg:block">
                    <i className="fa-solid fa-coins me-2"></i>
                    รายงานยอดขาย
                </div>
                <div className="grow flex items-center justify-end flex-wrap">
                    <span className="me-2 text-xs text-gray-500 text-center w-full mb-2 sm:mb-0 sm:w-max">เลือกดูตามช่วงเวลา</span>

                    <div className="flex items-center justify-center flex-wrap sm:ms-2 w-full sm:w-max">
                        <input type="date" name="dayStart" max={today} className="px-2 border hover:border-sky-500 rounded" onChange={e => hdlDateInput(e)}></input>

                        <span className="w-full sm:w-max sm:mx-4 text-center text-gray-500">to</span>

                        <input type="date" name="dayEnd" max={today} className="px-2 border hover:border-sky-500 rounded" onChange={e => hdlDateInput(e)}></input>

                        <div className="ms-0 sm:ms-4 mt-2 sm:mt-0 lg:mt-0 w-full sm:w-max">

                            <div className="relative bg-white p-[2px] w-full max-w-36 sm:w-max mx-auto sm:w-max h-max rounded rounded-full overflow-hidden">
                                {isLoading && <div className="animate-spin absolute top-[50%] left-[-25%] w-[150%] h-2 bg-sky-500 z-0"></div>}
                                <button disabled={isLoading} className="relative w-full sm:w-7 h-7 bg-sky-100 rounded rounded-full border border-sky-500 text-sky-500 hover:text-white hover:bg-sky-500 hover:border-white btn-disabled z-20" onClick={hdlWatch}>
                                    <i className="fa-solid fa-magnifying-glass fa-xs"></i>
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <div className="w-full flex flex-col xl:flex-row gap-2">
                <div className="w-full xl:w-2/12 flex flex-wrap gap-2">

                    <div className="flex flex-col justify-center bg-white pb-2 pt-1 xl:pt-0 xl:pb-0 shadow-lg grow xl:shrink xl:w-full border-s-4 border-s-green-500">
                        <div className="ps-2 me-2 text-xs text-gray-500">ยอดรวม</div>
                        <div className="text-center text-green-600 mx-2">
                            <i className="relative -top-2 fa-solid fa-baht-sign me-1"></i>
                            <span className="text-3xl">
                                {sumTotal.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center bg-white pb-2 pt-1 xl:pt-0 xl:pb-0 shadow-lg grow xl:shrink xl:w-full border-s-4 border-s-sky-500">
                        <div className="ps-2 me-2 text-xs text-gray-500">คำสั่งซื้อ</div>
                        <div className="text-center text-sky-600 text-3xl mx-2">
                            {totalOrders.toLocaleString()}
                        </div>
                    </div>

                    <div className="flex flex-col justify-center bg-white pb-2 pt-1 xl:pt-0 xl:pb-0  shadow-lg grow xl:shrink xl:w-full border-s-4 border-s-red-500">
                        <div className="ps-2 me-2 text-xs text-gray-500">ต้นทุน</div>
                        <div className="text-center text-red-500 mx-2">
                            <i className="relative -top-2 fa-solid fa-baht-sign me-1"></i>
                            <span className="text-3xl">
                                {cost.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center bg-white pb-2 pt-1 xl:pt-0 xl:pb-0  shadow-lg grow xl:shrink xl:w-full border-s-4 border-s-green-600">
                        <div className="ps-2 me-2 text-xs text-gray-500">กำไร</div>
                        <div className="text-center text-green-600 mx-2">
                            <i className="relative -top-2 fa-solid fa-baht-sign me-1"></i>
                            <span className="text-3xl">
                                {calNetRevenue(sumTotal, cost).toLocaleString()}
                            </span>
                        </div>
                    </div>

                </div>

                <div className="w-full xl:w-10/12 bg-white shadow-lg p-4">
                    <div className="w-full h-max">
                        {chartData && <LineChart chartData={chartData} desc={`รายงานยอดขาย`} />}
                    </div>
                </div>
            </div>

        </div>
    )
}