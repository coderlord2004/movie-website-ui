import React, { useEffect, useState } from "react";
import { useNotification } from '../context/NotificationContext'

const FilmHistory = () => {
    const [systemFilms, setSystemFilms] = useState([]);
    const [tmdbFilms, setTmdbFilms] = useState([]);
    const { showNotification } = useNotification();
    const TMDB_API_KEY = import.meta.env.VITE_API_KEY;

    const fetchSystemFilmHistory = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_WEBSITE_BASE_URL}/api/watching/get-watching-history/system-film`, {
                credentials: 'include'
            });
            const data = await res.json();
            setSystemFilms(data.results || []);
        } catch (err) {
            showNotification('error', 'Failed to fetch system film history.');
        }
    };

    const fetchTmdbFilmHistory = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_WEBSITE_BASE_URL}/api/watching/get-watching-history/tmdb-film`, {
                credentials: 'include'
            });
            const data = await res.json();

            const tmdbData = await Promise.all(
                (data.results || []).map(async (film) => {
                    try {
                        const tmdbRes = await fetch(`https://api.themoviedb.org/3/movie/${film.tmdbId}?api_key=${TMDB_API_KEY}`);
                        const tmdbInfo = await tmdbRes.json();
                        return {
                            ...film,
                            posterPath: `https://image.tmdb.org/t/p/w500${tmdbInfo.poster_path}`,
                            title: tmdbInfo.title,
                            releaseDate: tmdbInfo.release_date,
                        };
                    } catch {
                        return { ...film, posterPath: '', title: 'Unknown', releaseDate: 'N/A' };
                    }
                })
            );

            setTmdbFilms(tmdbData);
        } catch (err) {
            showNotification('error', 'Failed to fetch TMDB film history.');
        }
    };

    useEffect(() => {
        fetchSystemFilmHistory();
        fetchTmdbFilmHistory();
    }, []);

    return (
        <div className="w-full min-h-screen bg-gray-900 text-white p-8">
            <h2 className="text-3xl font-bold mb-6">Your Watch History</h2>

            <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-4">Hot movies and Free</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                    {systemFilms.map((film) => (
                        <div key={film.filmId} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                            <img
                                src={film.posterPath || film.backdropPath}
                                alt={film.title}
                                className="w-full h-64 object-cover rounded"
                            />
                            <h4 className="text-lg font-semibold mt-2">{film.title}</h4>
                            <p className="text-sm text-gray-400">Watched on: {film.watchingDate}</p>
                            <p className="text-sm text-gray-400">Watched Duration: {Math.floor(film.watchedDuration / 60)} mins</p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-green-400 mb-4">Theatrical movies</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {tmdbFilms.map((film) => (
                        <div key={film.tmdbId} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                            {film.posterPath ? (
                                <img
                                    src={film.posterPath}
                                    alt={film.title}
                                    className="w-full h-64 object-cover rounded"
                                />
                            ) : (
                                <div className="w-full h-64 bg-gray-700 flex items-center justify-center text-gray-400">
                                    No Image
                                </div>
                            )}
                            <h4 className="text-lg font-semibold mt-2">{film.title}</h4>
                            <p className="text-sm text-gray-400">Release: {film.releaseDate}</p>
                            <p className="text-sm text-gray-400">Watched Duration: {Math.floor(film.watchedDuration / 60)} mins</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilmHistory;
