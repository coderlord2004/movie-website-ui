import React from 'react'
import SpecialMovie from '../components/SpecialMovie/SpecialMovie'
import Movie from './Movie/Movie'
import PageTransition from './PageTransition'
import { cinemaMenu, cinemaMap } from '../constants/menu'
import { IoIosAddCircleOutline } from "react-icons/io";
import Image from './Image/Image'

export default function Playlist({ systemFilm, tmdbFilm }) {

    return (
        <div className="w-full h-full relative rounded-[10px] flex  flex-col gap-x-[8px] gap-y-[12px] overflow-hidden">

            <div className='w-full flex flex-col justify-between items-center p-[20px]'>
                <h1 className='text-[120%] font-bold py-[10px] bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent'>
                    Hot movies and Free
                </h1>
                <div className="w-full flex flex-col">
                    {systemFilm.map((playlist, index) => (
                        <div className='w-full'>
                            <h1 className='text-[120%] font-bold py-[10px]'>{playlist.playlistName}</h1>
                            <div className='w-full flex flex-wrap gap-[7px]'>
                                {playlist.systemFilms.map((film, index) => (
                                    <div
                                        key={film.systemFilmId}
                                        className='min-w-[calc(100%/3-7px)] h-[180px] animate-skeleton rounded-[8px]'
                                    >
                                        <Image id={film.systemFilmId} src={film.posterPath} title={film.title} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='w-full flex justify-between items-center px-[20px]'>
                <h1 className='text-[120%] font-bold py-[10px] bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent'>
                    Theatrical movies
                </h1>
                <div className="w-full flex flex-col">
                    {tmdbFilm.map((playlist, index) => (
                        <div className='w-full'>
                            <h1 className='text-[120%] font-bold py-[10px]'>{playlist.playlistName}</h1>
                            <div className='w-full flex flex-wrap gap-[7px]'>
                                {playlist.tmdbFilms.map((film, index) => (
                                    <div
                                        key={film.id}
                                        className='min-w-[calc(100%/3-7px)] h-[180px] animate-skeleton rounded-[8px]'
                                    >
                                        <Image id={film.id} src={film.posterPath} title={film.title} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}