import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PulseAnimation from './LoadingAnimation/PulseAnimation/PulseAnimation';
import Image from './Image/Image';
import PageTransition from './PageTransition';
import { IoIosAddCircleOutline } from "react-icons/io";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiDetail } from "react-icons/bi";
import { useNotification } from '../context/NotificationContext';

const website_base_url = import.meta.env.VITE_WEBSITE_BASE_URL;

export default function MovieStat({ movies, loading, setLoading }) {

    const { showNotification } = useNotification()
    const handleDeleteFilm = async (systemFilmId) => {
        setLoading(true);
        try {
            const response = await fetch(`${website_base_url}/admin/delete/system-film/${systemFilmId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            const data = await response.json();
            showNotification('success', data.message)
        } catch (error) {
            showNotification('success', error.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={"relative w-full min-h-screen " + (loading ? " bg-slate-600" : "")}>
            <div className="w-full font-bold text-[130%] pl-[30px] py-[20px] pr-[20px] flex justify-between items-center">
                <h1>Movies are uploaded.</h1>
                <Link to="/admin/upload-film" className='flex justify-center items-center gap-x-[5px] cursor-pointer hover:scale-[1.04] transition-all duration-200 ease-in-out'>
                    <IoIosAddCircleOutline style={{
                        fontSize: "30px",
                    }} />
                    <span className="text-[80%]">Add Movie</span>
                </Link>
            </div>

            <div className='flex items-center w-full h-full gap-[7px] flex-wrap'>
                {movies.length > 0 ? (
                    movies.map((movie, index) => (
                        <div
                            key={movie.id}
                            className="min-w-[calc(100%/3-7px)] h-[200px] flex justify-between items-center bg-gray-800 rounded-[10px]  mb-[20px] cursor-pointer hover:scale-[1.04] transition-all duration-200 ease-in-out relative group"
                        >
                            <Image id={movie.systemFilmId} title={movie.title} src={movie.posterPath} />
                            <div className='absolute top-[15px] right-[15px] w-auto flex gap-[4px] text-[140%] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out'>
                                <Link to={`/watch-detail/${movie.systemFilmId}/`}>
                                    <BiDetail title='watch detail' />
                                </Link>

                                <RiDeleteBin6Line title='delete movie' onClick={() => handleDeleteFilm(movie.systemFilmId)} />

                                <Link to={`/admin/update-film/${movie.systemFilmId}`}>
                                    <LuPencilLine title='update movie' />
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex justify-center items-center text-gray-500">
                        No movies uploaded yet.
                    </div>
                )}
            </div>

            <PageTransition />
        </div>
    )
}