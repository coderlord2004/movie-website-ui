import React, { useState, useEffect, useRef } from 'react';
import MovieViewsChart from './MovieViewsChart/MovieViewsChart';
import PopularHoursChart from './MovieViewsChart/PopularHoursChart';
import { useNotification } from '../context/NotificationContext';
import { FaFilter } from "react-icons/fa";
import TopFilm from './TopFilm'

const website_base_url = import.meta.env.VITE_WEBSITE_BASE_URL;
const tmdb_base_url = import.meta.env.VITE_TMDB_BASE_URL;
const api_key = import.meta.env.VITE_API_KEY;

export default function Dashboard({ newUserData, onUpdateType, onUpdateLimition, topFilm, popularHours }) {
    const [animateLineChart, setAnimateLineChart] = useState(false)
    const { showNotification } = useNotification()
    const [limitTemplate, setLimitTemplate] = useState(topFilm.limit)
    const limitInput = useRef(null)
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
                <MovieViewsChart title={"Total number of new users registered on the system through the months"}
                    viewData={newUserData}
                    obj={{
                        valueX: "month",
                        valueY: "total_users"
                    }}
                    animation={animateLineChart}
                />
            </div>

            <div className="w-full min-h-[300px] border-[1px] border-solid border-[#fff] rounded-[10px] flex flex-col gap-y-[10px] relative p-[10px] my-[20px]">
                <div className='flex items-center gap-x-[10px] w-full'>
                    <select
                        className="w-[100px] h-[37px] text-center bg-black/70 text-white p-[5px] rounded-[6px] cursor-pointer outline-none border-[1px] border-solid border-white"
                        onChange={(e) => onUpdateType(e.target.value)}
                    >
                        <option value="Top view">Top view</option>
                        <option value="Top like">Top like</option>
                    </select>
                    <input
                        ref={limitInput}
                        type="number"
                        name="limit"
                        value={limitTemplate}
                        onChange={(e) => setLimitTemplate(e.target.value)}
                        className='outline-none text-white w-[70px] h-[37px] rounded-[5px] border-[2px] border-solid border-slate-600 bg-black p-[7px]' placeholder='limit'
                    />
                    <div
                        onClick={() => onUpdateLimition(limitInput.current.value)}
                    >
                        <FaFilter style={{
                            fontSize: '130%',
                            cursor: 'pointer',
                            color: 'gray'
                        }} />
                    </div>
                </div>

                <div className='globalScrollStyle flex flex-wrap gap-x-[8px] w-full h-full overflow-x-scroll'>
                    {topFilm.topFilmData && topFilm.topFilmData.map((film, index) => (
                        <TopFilm
                            index={index}
                            id={film.tmdbId}
                            filmData={film}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}