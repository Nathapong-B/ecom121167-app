import { useEffect, useState } from "react"
import { useEcomStore } from "../../../../ecomStore/useEcomStore";
import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "../../../../ecomStore/authStore";
import { toast } from "react-toastify";
import LineChart from "./components/lineChart";
import { fulfillTwoDigit, getDayoneuptoToday, getToDay, hdlTimeDuration } from "../../../util/utilDateTime";
import { reportPerDay } from "../../../../api/reportApi";
import { arrForChartData, dataChart } from "../../../util/utilChart";

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
    const [sumTotal, setSumTotal] = useState();
    const [totalOrders, setTotalOrders] = useState();

    const fetchData = async (dayStart, dayEnd, status) => {
        const payload = { dayStart, dayEnd };
        if (status === 'custom') {
            try {
                return await reportPerDay(payload, token);
            } catch (err) {
                if (err.code === "ERR_NETWORK") return { message: err.message };
                return { status: err.status, message: err.response.data.message };
            }
        } else {
            const res = await actionReportThisMonth(payload, token);
            if (res.error) return toast.error(res.error.message);
        };
    };

    //------------- init time duration
    const hdlInitData = async () => {
        const { nowDate, nowMonth, nowYear } = getToDay();
        const dayStart = nowYear + '-' + fulfillTwoDigit(nowMonth) + '-01';
        const dayEnd = nowYear + '-' + fulfillTwoDigit(nowMonth) + '-' + fulfillTwoDigit(nowDate);

        // dS , dE (milliseconds)
        const { dS, dE, dRange, error } = hdlTimeDuration(dayStart, dayEnd);
        if (error) return toast.warning('Incomplete data');
        setTotalOrders(() => reportThisMonth.length);
        return arrForChartData({ dS, dRange, dataApi: reportThisMonth });
    };

    //------------- custom time duration
    const hdlDateInput = (data) => {
        const { name, value } = data.target;
        setDataInput(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const hdlCustomData = async () => {
        const { dayStart, dayEnd } = dataInput;
        if (!dayStart || !dayEnd) return toast.warning('Incomplete data');

        // dS , dE (milliseconds)
        const { dS, dE, dRange, error } = hdlTimeDuration(dayStart, dayEnd);
        if (error) return toast.warning('Incomplete data');

        // ดึงข้อมูลจากเซิร์ฟเวอร์
        const res = await fetchData(dayStart, dayEnd, 'custom');

        if (res.status === 200) {
            const dataApi = res.data.result;
            setTotalOrders(() => dataApi.length);
            return arrForChartData({ dS, dRange, dataApi });
        } else {
            // console.log(res.message);
            toast.error(res.message);
        };
    };

    const hdlChartData = async () => {
        const { dayStart, dayEnd } = dataInput;
        let arrData;

        if (!dayStart || !dayEnd) {
            arrData = await hdlInitData();
        } else {
            arrData = await hdlCustomData();
        };
        setSumTotal(() => arrData.reduce((acc, cur) => acc += cur.sum, 0));
        setChartData(() => dataChart({ arrData, bgcolor: 'white', bdcolor: 'red' }));
    };

    useEffect(() => {
        if (!reportThisMonth) {
            const { dayStart, dayEnd } = getDayoneuptoToday();
            fetchData(dayStart, dayEnd);
            // hdlChartData();
        } else {
            hdlChartData();
        };

        setToday(() => {
            const { nowDate, nowMonth, nowYear } = getToDay();
            return nowYear + '-' + fulfillTwoDigit(nowMonth) + '-' + fulfillTwoDigit(nowDate);
        });
    }, [reportThisMonth]);
    // }, [reportThisMonth, dataInput]);

    const hdlWatch = () => {
        hdlChartData();
    };


    const debug = (value) => {
        console.log(sumTotal.toLocaleString())
    }

    return (
        <div className="w-full">
            <div className="bg-gradient-to-r from-white/0 from-30% to-white to-50% p-2 pe-8 mb-2 flex justify-between">
                <div className="font-bold text-xl text-green-600">
                    :: รายงานยอดขาย
                </div>
                <div className="flex items-center justify-end">
                    <span className="me-4 text-xs text-gray-500">เลือกดูตามช่วงเวลา</span>
                    {/* <label className="me-2">start</label> */}
                    <input type="date" name="dayStart" max={today} className="px-2 border border-sky-500 rounded" onChange={e => hdlDateInput(e)}></input>
                    <span className="mx-4">-</span>
                    {/* <label className="me-2">end</label> */}
                    <input type="date" name="dayEnd" max={today} className="px-2 border border-sky-500 rounded" onChange={e => hdlDateInput(e)}></input>

                    <button className="w-7 h-7 ms-4 bg-sky-400 rounded rounded-full hover:text-white hover:bg-sky-500" onClick={hdlWatch}>
                        <i className="fa-solid fa-magnifying-glass fa-xs"></i>
                    </button>
                </div>
                {/* <button className="bo-btn-add bg-green-500" onClick={debug}>debug</button> */}
            </div>

            <div className="w-full flex flex-col xl:flex-row gap-2">
                <div className="w-full xl:w-2/12 flex flex-wrap gap-2">
                    <div className="flex flex-col justify-center bg-white pb-2 pt-1 xl:pt-0 xl:pb-0 shadow-lg grow xl:shrink xl:w-full border-s-4 border-s-green-500">
                        <div className="ps-2 text-gray-500">ยอดรวม</div>
                        <div className="text-center text-3xl">
                            <i className="fa-solid fa-baht-sign me-2"></i>
                            {sumTotal?.toLocaleString()}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center bg-white pb-2 pt-1 xl:pt-0 xl:pb-0 shadow-lg grow xl:shrink xl:w-full border-s-4 border-s-yellow-500">
                        <div className="ps-2 text-gray-500">คำสั่งซื้อ</div>
                        <div className="text-center text-3xl">{totalOrders?.toLocaleString()}</div>
                    </div>
                    <div className="flex flex-col justify-center bg-white pb-2 pt-1 xl:pt-0 xl:pb-0  shadow-lg grow xl:shrink xl:w-full border-s-4 border-s-orange-500">
                        <div className="ps-2">-</div>
                        <div className="text-center text-3xl">-</div>
                    </div>
                    <div className="flex flex-col justify-center bg-white pb-2 pt-1 xl:pt-0 xl:pb-0  shadow-lg grow xl:shrink xl:w-full border-s-4 border-s-red-500">
                        <div className="ps-2">-</div>
                        <div className="text-center text-3xl">-</div>
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