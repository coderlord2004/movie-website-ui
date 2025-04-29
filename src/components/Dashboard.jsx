import React, { useState, useEffect } from 'react';
import MovieViewsChart from './MovieViewsChart/MovieViewsChart';
import PieChartComponent from './MovieViewsChart/PieChart';
import { useNotification } from '../context/NotificationContext';
import { FaFilter } from "react-icons/fa";

const website_base_url = import.meta.env.VITE_WEBSITE_BASE_URL;

export default function Dashboard({ newUserData, onUpdateType, topFilm, userWatchingHourly }) {
    const [animateLineChart, setAnimateLineChart] = useState(false)

    useEffect(() => {
        const handleSCroll = () => {
            const scrollValue = window.scrollY
            if (scrollValue > 140) {
                setAnimateLineChart(true)
            }
        }
        window.addEventListener('scroll', handleSCroll)

        return () => {
            window.removeEventListener('scroll', handleSCroll)
        }
    }, [])

    return (
        <>
            <div className="w-full h-auto block sm:flex justify-center items-center gap-[10px] mt-[10px]">
                <MovieViewsChart
                    title={"Total number of users watching movies on the system through the months"}
                    viewData={""}
                    obj={{
                        valueX: "date",
                        valueY: "watching_hour"
                    }}
                    animation={animateLineChart}
                />
                <MovieViewsChart title={"Total number of new users registered on the system through the months"}
                    viewData={newUserData}
                    obj={{
                        valueX: "month",
                        valueY: "total_users"
                    }}
                    animation={animateLineChart}
                />
            </div>

            <div className="w-full h-[300px] flex justify-center items-center gap-[10px] my-[20px]">
                <div className="w-[50%] h-full border-[1px] border-solid border-[#fff] rounded-[10px] flex flex-col relative p-[10px]">
                    <div className='flex items-center gap-x-[10px] w-full'>
                        <select className="w-[100px] h-[37px] text-center bg-black/70 text-white p-[5px] rounded-[6px] cursor-pointer outline-none border-[1px] border-solid border-white" onChange={() => onUpdateType()}>
                            <option value="Top view">Top view</option>
                            <option value="Top like">Top like</option>
                        </select>
                        <input type="number" name="limit" className='outline-none text-white w-[70px] h-[37px] rounded-[5px] border-[2px] border-solid border-slate-600 bg-black p-[7px]' placeholder='limit' />
                        <FaFilter style={{
                            fontSize: '130%',
                            cursor: 'pointer',
                            color: 'gray'
                        }} />
                    </div>
                    <div className='w-full'>

                    </div>
                </div>
            </div>
        </>
    )
}