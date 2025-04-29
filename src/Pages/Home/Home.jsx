import { useRef, useEffect, useState } from "react";
import React from "react";
import Header from "../../components/Header/Header.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import PulseAnimation from "../../components/LoadingAnimation/PulseAnimation/PulseAnimation.jsx";
import {
  fetchApiWithParams,
} from "../../services/api_service/FetchMoviesApi.jsx";
import { useNotification } from "../../context/NotificationContext.jsx";
import SpecialMovie from "../../components/SpecialMovie/SpecialMovie.jsx";
import Movie from "../../components/Movie/Movie.jsx";
import MovieList from '../../components/MovieList.jsx';
import Playlist from '../../components/Playlist.jsx';
import FilmHistory from '../../components/FilmHistory.jsx';
import { cinemaMenu, cinemaMap } from "../../constants/menu.jsx";
import { urlTemplates } from "../../constants/TmdbUrls.jsx";
import { menuSystemApiMap } from '../../constants/SystemUrls.jsx'
import PageTransition from "../../components/PageTransition.jsx";
import { usePageTransition } from "../../context/PageTransitionContext.jsx";

const api_key = import.meta.env.VITE_API_KEY;
const access_token = import.meta.env.VITE_API_READ_ACCESS_TOKEN;

const image_base_url = import.meta.env.VITE_TMDB_BASE_IMAGE_URL;
const tmdb_base_url = import.meta.env.VITE_TMDB_BASE_URL;
const website_base_url = import.meta.env.VITE_WEBSITE_BASE_URL;


function Home() {
  const [movies, setMovies] = useState();
  const [loading, setLoading] = useState(false);
  const { pageNumber } = usePageTransition()
  const [menuState, setMenuState] = useState({
    activeMenu: 'HotMoviesAndFree',
    cinemaType: null,
  });
  const [playlist, setPlaylist] = useState({
    systemFilm: [],
    tmdbFilm: []
  })
  const [filmHistory, setFilmHistory] = useState([])
  console.log('playlist:', playlist)

  const movieListBox = useRef(null);
  const { showNotification } = useNotification();
  let initialMovie = useRef(null);

  const updateActiveMenu = (newActiveMenu) => {
    setMenuState({
      activeMenu: newActiveMenu,
      cinemaType: cinemaMap[newActiveMenu] ? cinemaMap[newActiveMenu][0] : null,
    });
  };
  useEffect(() => {
    const fetchTmdbMovie = async () => {
      setLoading(true);
      try {
        const params = {
          api_key: api_key,
          page: pageNumber,
        };
        const url = urlTemplates[menuState.activeMenu][menuState.cinemaType];
        const data = await fetchApiWithParams(url, params);
        data.type = menuState.activeMenu;
        data.belong_to = 'TMDB_FILM'
        initialMovie.current = data;
        setMovies(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        showNotification("error", err.message);
      }
    };

    const fetchSystemMovie = async () => {
      setLoading(true);
      try {
        const res = await fetch(import.meta.env.VITE_WEBSITE_BASE_URL + "/api/system-films/summary-list?page=" + pageNumber, {
          credentials: "include"
        })
        if (!res.ok) {
          throw new Error("Failed to fetch data from the server.");
        }
        const data = await res.json();
        console.log('system data: ', data)
        data.belong_to = 'SYSTEM_FILM'
        initialMovie.current = data;
        setMovies(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        showNotification("error", err.message);
      }
    }

    if (menuState.cinemaType) {
      fetchTmdbMovie();
    } else if (!menuState.cinemaType && menuState.activeMenu === 'HotMoviesAndFree') {
      fetchSystemMovie();
    }

  }, [menuState, pageNumber]);

  useEffect(() => {
    const fetchFilmPlaylist = async () => {
      setLoading(true);
      try {
        const options = {
          method: 'GET',
          credentials: 'include'
        };

        const [systemFilmRes, tmdbFilmRes] = await Promise.all([
          fetch(`${website_base_url}/api/users/get-user-playlist/system-film`, options),
          fetch(`${website_base_url}/api/users/get-user-playlist/tmdb-film`, options)
        ]);

        const [systemFilmData, tmdbFilmData] = await Promise.all([
          systemFilmRes.json(),
          tmdbFilmRes.json()
        ]);

        setPlaylist({
          systemFilm: systemFilmData.results,
          tmdbFilm: tmdbFilmData.results
        })

      } catch (err) {
        showNotification("error", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (menuState.activeMenu === 'Playlist') {
      fetchFilmPlaylist();
    }
  }, [menuState.activeMenu]);


  const handleSearching = (searchValue) => {
    if (searchValue === "") return;
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    };

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        data.type = menuState.activeMenu;
        data.belong_to = 'TMDB_FILM'
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const resetMovies = () => {
    setMovies(initialMovie.current);
  };

  return (
    <>
      <Header
        onSearching={handleSearching}
        onReset={resetMovies}
        additionalHeaderStyles={{
          borderBottom: '1px solid gray',
          borderRadius: '8px'
        }}
      />
      <div className="body flex relative mt-[50px] min-h-screen z-10">
        <SideBar onUpdateActiveMenu={updateActiveMenu} />

        <div
          className="movie-list-box flex w-full sm:w-[calc(100%-230px)] sm:ml-[230px] min-h-screen rounded-[10px] box-border bg-gradient-to-b px-[3px] from-[#0f0f0f] to-[#1a1a1a] text-white transition-all duration-400 ease-linear relative"
          ref={movieListBox}
        >
          {menuState.activeMenu === 'Playlist' ? (
            <Playlist systemFilm={playlist.systemFilm} tmdbFilm={playlist.tmdbFilm} />
          ) : (
            menuState.activeMenu === 'History' ? (
              <FilmHistory />
            ) : (
              <MovieList movies={movies} menuState={menuState} onSetMenuState={setMenuState} />
            )
          )}

          {loading && (
            <div className="absolute top-0 left-0 right-0 h-screen ">
              <PulseAnimation onLoading={loading} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;

{
  /* <iframe width="560" height="315" src="https://www.youtube.com/embed/gGmaZCZz48g?si=cDLDTXRavMIN83RE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */
}

//https://api.rophim.tv/v1/movie/casts/yydqspwR

//https://api.rophim.tv/v1/movie/filterV2?countries=&genres=QriAOn&years=&type=&status=&versions=&rating=&networks=&productions=&sort=updated_at&page=1

//https://api.rophim.tv/v1/movie/filterV2?page=1

//https://static.nutscdn.com/vimg/300-0/371719b10c674ec7230ed1583c1c452f.jpg
