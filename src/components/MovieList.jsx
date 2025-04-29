import React from 'react'
import SpecialMovie from '../components/SpecialMovie/SpecialMovie'
import Movie from './Movie/Movie'
import PageTransition from './PageTransition'
import { cinemaMenu, cinemaMap } from '../constants/menu'
export default function MovieList({ movies, menuState, onSetMenuState }) {
    return (
        <div key={menuState.activeMenu} className="w-full h-full relative rounded-[10px] flex  flex-wrap gap-x-[8px] gap-y-[12px]">
            <div className="menuOnMobile absolute top-0 left-0 text-white w-[20px] h-[20px] text-center block sm:hidden">
                X
            </div>
            <div className="w-full h-[300px] bg-slate-800 rounded-[10px]">
                {movies && (
                    <SpecialMovie
                        id={"movie0"}
                        movieData={movies}
                        typeDetail={
                            menuState.cinemaType ? menuState.cinemaType.toLowerCase() : ""
                        }
                        belongTo={movies.belong_to}
                    />
                )}
            </div>

            {cinemaMap[menuState.activeMenu] ? (
                <div className="w-full h-auto flex justify-end p-0">
                    <select
                        id="movieTypeSelection"
                        value={menuState.cinemaType}
                        onChange={(e) =>
                            onSetMenuState((prev) => ({
                                activeMenu: prev.activeMenu,
                                cinemaType: e.target.value,
                            }))
                        }
                        className="w-[100px] text-white bg-black cursor-pointer border-[1px] border-solid border-[white] rounded-[4px]"
                    >
                        {cinemaMap[menuState.activeMenu].map((type, index) => (
                            <option
                                key={type}
                                value={type}
                                className="rounded-[10px] cursor-pointer"
                            >
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
            ) : (
                ""
            )}

            {movies && (
                movies.results.slice(1).map((data, index) => (
                    <Movie
                        id={`movie${index + 1}`}
                        movieData={data}
                        type={movies.type ? movies.type.toLowerCase().split(" ")[0] : ""}
                        typeDetail={
                            menuState.cinemaType
                                ? menuState.cinemaType.toLowerCase()
                                : ""
                        }
                        belongTo={movies.belong_to}
                    />
                ))
            )}

            <PageTransition />
        </div>
    )
}