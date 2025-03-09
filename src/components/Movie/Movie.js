import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Movie.module.css'
import BookMarkIcon from '../BookMarkIcon/BookMarkIcon'
import HeartIcon from '../HeartIcon/HeartIcon'
import MoveToRightAnimation from '../LoadingAnimation/MoveToRightAnimation/MoveToRightAnimation'

function Movie({ id, movieImageUrl, movieData, type, typeDetail }) {
    const [isError, setIsError] = useState(false)
    const [isLoading, setLoading] = useState(true)
    
    if (isError)
        return null
    
    return (
        <div 
            key={id} 
            className={`movie-item${id} w-[calc(25%-9px)] sm:w-[calc(20%-7px)] h-auto transform hover:scale-[1.07] transition-all duration-200 relative group overflow-hidden rounded-[10px]`}
        >
            <div className={`relative overflow-hidden w-full h-auto`}>
                <div className={`w-full aspect-[2/3] rounded-[10px] ${isLoading ? "bg-slate-800" : ""}`}>
                    <MoveToRightAnimation />
                    <img 
                        src={movieImageUrl} 
                        alt="No movie!" 
                        onLoad={() => {
                            setLoading(false)
                        }} 
                        onError={() => {
                            setIsError(true)
                        }}
                        className={`w-full h-full rounded-[10px] cursor-pointer absolute`}
                        loading="lazy"   
                    />
                </div>
                
                <div
                    className={`watchNowButton w-[60%] h-auto p-[5px] bg-[yellow] text-black text-center absolute top-[100%] group-hover:top-[77%] left-[50%] transform translate-x-[-50%] rounded-[4px] transition-all duration-200 ease-linear flex justify-center items-center hover:shadow-boxShadow-red text-[90%] font-normal`}
                >
                    <Link 
                        to={`/watch-detail/${type}/${typeDetail}/${movieData.id}/`}
                        className="w-full h-full flex justify-start sm:justify-center items-center truncate"
                    >
                        Watch detail!
                    </Link>
                </div>
            </div>
            <div className={`flex px-[3px] mt-[4px] justify-between mb-[13px]`}>
                <p className={`w-[80%] mr-[6px] bg-black/50`}>{movieData.title || movieData.name}
                </p>
                <BookMarkIcon />
                <HeartIcon />
            </div>
        </div>
    )
}

export default Movie