import Overview from "./components/dashboard/overview";
import Report from "./components/dashboard/report";

export default function Dashboard() {
    return (
        <>
            <div className="bo-title">Dashboard</div>

            <div className="mb-8">
                <Overview />
            </div>

            <div>
                <Report />
            </div>
        </>
    )
};