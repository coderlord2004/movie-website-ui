import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";
import { useNotification } from "../../context/NotificationContext";
import { useUserContext } from "../../context/AuthUserContext";
import Skeleton from "../../components/LoadingAnimation/Skeleton";

const access_token = import.meta.env.VITE_API_READ_ACCESS_TOKEN;
const tmdb_image_base_url = import.meta.env.VITE_TMDB_BASE_IMAGE_URL;
const tmdb_base_url = import.meta.env.VITE_TMDB_BASE_URL;

export default function DemoPage() {
  const [trendingList, setTrendingList] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showNotification } = useNotification();
  const [trendingType, setTrendingType] = useState("day");
  const { authUser } = useUserContext();

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    };
    setIsLoading(true);
    fetch(`${tmdb_base_url}3/trending/all/${trendingType}`, options)
      .then((res) => res.json())
      .then((data) => {
        setTrendingList(data.results);
        setFeaturedMovie(data.results[0]);
      })
      .catch((err) => {
        showNotification("error", err.message);
      })
      .finally(() => setIsLoading(false));
  }, [trendingType, showNotification]);

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Header */}
      <Header
        onSearching={() => showNotification("error", "Please login or signup!")}
        onReset={() => showNotification("error", "Please login or signup!")}
      />

      <div className="relative h-screen mt-[50px]">
        <div className="absolute inset-0 z-0">
          {featuredMovie && (
            <img
              src={`${tmdb_image_base_url}original/${featuredMovie.backdrop_path || featuredMovie.poster_path}`}
              alt={featuredMovie.title || featuredMovie.name}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent"></div>
        </div>

        {/* Featured Movie Info */}

        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-20 animate-moveToTop">
          {isLoading ? (
            <div className="max-w-2xl">
              <Skeleton className="h-12 w-3/4 mb-4 rounded" />

              <div className="flex items-center space-x-4 mb-6">
                <Skeleton className="h-6 w-20 mb-4 rounded-full" />
                <Skeleton className="h-4 w-12 mb-4 rounded" />
              </div>

              <div className="space-y-2 mb-8">
                {[1, 2, 3].map((i) => (
                  <Skeleton
                    key={i}
                    className={`h-4 rounded ${i === 2 ? "w-5/6" : i === 3 ? "w-4/6" : "w-full"}`}
                  />
                ))}
              </div>

              <div className="flex space-x-4">
                {[1, 2].map((i) => (
                  <Skeleton className="h-12 w-32 rounded-lg" />
                ))}
              </div>
            </div>
          ) : (
            featuredMovie && (
              <div className="max-w-2xl">
                <h1 className="text-5xl font-bold mb-4 animate-fadeIn">
                  {featuredMovie?.title || featuredMovie?.name}
                </h1>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="px-3 py-1 bg-blue-600 rounded-full text-sm font-semibold">
                    {featuredMovie?.media_type === "movie"
                      ? "Movie"
                      : "TV Series"}
                  </span>
                  {featuredMovie?.release_date && (
                    <span className="text-gray-300">
                      {new Date(featuredMovie.release_date).getFullYear()}
                    </span>
                  )}
                </div>
                <p className="text-gray-300 mb-8 line-clamp-3">
                  {featuredMovie?.overview}
                </p>
                <div className="flex space-x-4">
                  <button
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    onClick={() => {
                      if (!authUser) {
                        showNotification(
                          "error",
                          "Please log in or sign up to continue!",
                        );
                      }
                    }}
                  >
                    Play Now
                  </button>
                  <a
                    href="#trending"
                    className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    + Watchlist
                  </a>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Trending Now Section */}
      <div className="py-16 bg-gray-900">
        <div className="flex flex-col justify-center items-start px-6">
          <div className="flex items-end gap-5 mb-8">
            <h2 className="specialColor w-auto font-bold  text-3xl">
              Trending Now
            </h2>
            <button
              className={`w-[80px] shadow-[2px_2px_2px_black] active:transform active:translate-y-[2px] active:shadow-none rounded-[5px] px-2 py-1 whitespace-nowrap ${trendingType === "day" ? "bg-blue-600 " : "bg-slate-700"}`}
              onClick={() => setTrendingType("day")}
            >
              By day
            </button>
            <button
              className={`w-[80px] shadow-[2px_2px_2px_black] active:transform active:translate-y-[2px] active:shadow-none rounded-[5px] px-2 py-1 whitespace-nowrap ${trendingType === "week" ? "bg-blue-600 " : "bg-slate-700"}`}
              onClick={() => setTrendingType("week")}
            >
              By week
            </button>
          </div>

          <div
            id="trending"
            className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[10px]"
          >
            {isLoading
              ? Array.from({ length: 10 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-[120px] rounded-[8px]" />
                ))
              : trendingList.map((movie, idx) => (
                  <div
                    key={movie.id}
                    className="group relative rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:z-10 cursor-pointer animate-moveToTop"
                    style={{
                      animationDelay: `${idx / 10}s`,
                    }}
                    onClick={() => {
                      setFeaturedMovie(movie);
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    <div className="aspect-w-2 aspect-h-3 animate-skeleton">
                      <img
                        src={`${tmdb_image_base_url}original/${movie.backdrop_path || movie.poster_path}`}
                        alt={movie.title || movie.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <h3 className="text-white font-semibold truncate">
                        {movie.title || movie.name}
                      </h3>
                      <div className="flex justify-between text-sm text-gray-300 mt-1">
                        <span>
                          {movie.media_type === "movie" ? "Movie" : "TV Series"}
                        </span>
                        {movie.release_date && (
                          <span>
                            {new Date(movie.release_date).getFullYear()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "Action",
              "Comedy",
              "Horror",
              "Romance",
              "Sci-Fi",
              "Thriller",
            ].map((category) => (
              <div
                key={category}
                className="bg-gray-800 rounded-lg p-6 text-center hover:bg-blue-600 transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                <span className="font-semibold">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
