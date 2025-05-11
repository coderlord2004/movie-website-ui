import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import Login from "./Pages/Login/Login.jsx";
import Signup from "./Pages/Signup/Signup.jsx";
import "./index.css";
import UserDetail from "./Pages/UserDetail/UserDetail.jsx";
import TmdbFilmDetail from "./Pages/TmdbFilmDetail/TmdbFilmDetail.jsx";
import DemoPage from "./Pages/DemoPage/DemoPage.jsx";
import WatchFilm from "./Pages/WatchFilm/WatchFilm.jsx";
import Admin from "./Pages/Admin/Admin.jsx";
import UploadSystemFilm from "./Pages/UploadSystemFilm.jsx";
import RouteTitleManager from "./RouteTitleManager.jsx";
import SystemFilmDetail from "./Pages/SystemFilmDetail.jsx";
import UpdateSystemFilm from "./Pages/UpdateSystemFilm.jsx";

function App() {
  return (
    <>
      <RouteTitleManager />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<DemoPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/my-info" element={<UserDetail />} />
        <Route
          path="/watch-detail/theatrical-movie/:tmdbFilmId"
          element={<TmdbFilmDetail />}
        />
        <Route
          path="/watch-detail/hot-movies/:systemFilmId"
          element={<SystemFilmDetail />}
        />
        <Route path="/watch/:videoKey" element={<WatchFilm />} />
        <Route path="/admin/upload-film" element={<UploadSystemFilm />} />
        <Route path="/admin/update-film/:systemFilmId" element={<UpdateSystemFilm />} />
      </Routes>
    </>
  );
}

export default App;
