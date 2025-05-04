import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import Bookmark from '../Bookmark';

const image_base_url = import.meta.env.VITE_TMDB_BASE_IMAGE_URL;

function SpecialMovie({ id, movieData, belongTo }) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  if (isError) return null;
  return (
    <div
      key={id}
      className={`movie-item${id} w-full h-full rounded-[10px] transform flex items-center overflow-hidden`}
    >
      <div className={`relative overflow-hidden w-full h-full`}>
        <div
          className="w-full h-full rounded-[10px] animate-skeleton overflow-hidden flex justify-center items-center"
        >
          <img
            src={belongTo === "TMDB_FILM" ? `${image_base_url}original${movieData.backdrop_path}` : `${movieData.posterPath}`}
            alt="No movie!"
            onLoad={() => setLoading(false)}
            onError={() => {
              setIsError(true);
            }}
            className={`w-full h-full rounded-[10px] cursor-pointer absolute object-cover`}
            loading="lazy"
          />
        </div>

        <div
          className={`watchNowButton w-auto h-auto p-[5px] bg-[yellow] text-black text-center absolute top-[55%] left-[40px] rounded-[4px] transition-all duration-200 ease-linear flex justify-center items-center hover:shadow-[2px_2px_2px_2px_red] active:shadow-none active:transform active:translate-y-[5px] active:duration-0`}
        >
          <Link
            to={belongTo === 'TMDB_FILM' ? `/watch-detail/theatrical-movie/${movieData.id}/` : `/watch-detail/hot-movies/${movieData.systemFilmId}/`}
            className="w-full h-full flex justify-center items-center truncate"
          >
            Watch detail!
          </Link>
        </div>
      </div>
      <div
        className={`flex px-[3px] mt-[4px] absolute top-[50%px] left-[40px] transform translate-y-[-50%] justify-between items-center bg-black/50 shadow-[0_0_3px_3px_black]`}
      >
        <p
          className={`w-[80%] mr-[18px] text-[160%] font-medium`}
        >
          {movieData.title || movieData.name}
        </p>
        <Bookmark filmId={movieData.id || movieData.systemFilmId} belongTo={belongTo} />
      </div>
    </div>
  );
}

export default SpecialMovie;
