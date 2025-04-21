import { useEffect, useState } from "react";
import "./cssLoading.css"

export default function LoadingCover({ isLoading, title = 'loading.' }) {

    if (isLoading) {
        return (
            <div className="absolute top-0 left-0 z-50 h-full">
                <div className="h-full w-screen bg-gray-500/50 flex justify-center items-center">
                    <div className="w-full flex bg-white py-2">
                        <div className="flex-1 text-end font-bold">{title}</div>
                        {/* <div className="flex-1 font-bold">{mapDot()}</div> */}
                        <div className="flex-1 content-center relative">
                            <div className="dot1"></div>
                            <div className="dot2"></div>
                            <div className="dot3"></div>

                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <></>;
    }
};