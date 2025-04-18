import React, { useState } from "react";
import { Link } from "react-router-dom";
import BookMarkIcon from "../BookMarkIcon/BookMarkIcon";
import HeartIcon from "../HeartIcon/HeartIcon";

function SpecialMovie({ id, movieImageUrl, movieData, type, typeDetail }) {
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
          className="w-full h-full rounded-[10px] bg-slate-800 overflow-hidden flex justify-center items-center before:content-[''] before:block before:w-[70px] before:h-[160%] before:bg-black/30 before:transform before:rotate-[20deg] before:absolute animate-moveToRight"
        >
          <img
            src={movieImageUrl}
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
          className={`watchNowButton w-auto h-auto p-[5px] bg-[yellow] text-black text-center absolute top-[55%] left-[40px] rounded-[4px] transition-all duration-200 ease-linear flex justify-center items-center hover:shadow-boxShadow-red`}
        >
          <Link
            to={`/watch-detail/${type}/${typeDetail}/${movieData.id}/`}
            className="w-full h-full flex justify-center items-center truncate"
          >
            Watch detail!
          </Link>
        </div>
      </div>
      <div
        className={`flex px-[3px] mt-[4px] absolute top-[50%px] left-[40px] transform translate-y-[-50%] justify-between items-center`}
      >
        <p
          className={`w-[80%] mr-[18px] bg-black/50 text-[160%] font-medium shadow-[0_0_3px_3px_black]`}
        >
          {movieData.title || movieData.name}
        </p>
        <BookMarkIcon />
        <HeartIcon />
      </div>
    </div>
  );
}

export default SpecialMovie;
