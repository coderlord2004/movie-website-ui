import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import Login from "./Pages/Login/Login.jsx";
import Signup from "./Pages/Singup/Signup.jsx";
import "./index.css";
import UserDetail from "./Pages/UserDetail/UserDetail.jsx";
import MovieDetail from "./Pages/MovieDetail/MovieDetail.jsx";
import DemoPage from "./Pages/DemoPage/DemoPage.jsx";
import WatchFilm from "./Pages/WatchFilm/WatchFilm.jsx";
import Admin from "./Pages/Admin/Admin.jsx";
import UploadFilm from "./Pages/UploadFilm/UploadFilm.jsx";
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
          path="/watch-detail/:type/:typeDetail/:movieId"
          element={<MovieDetail />}
        />
        <Route
          path="/watch-detail/:systemFilmId"
          element={<SystemFilmDetail />}
        />
        <Route path="/watch/:videoKey" element={<WatchFilm />} />
        <Route path="/admin/upload-film" element={<UploadFilm />} />
        <Route path="/admin/update-film/:systemFilmId" element={<UpdateSystemFilm />} />
      </Routes>
    </>
  );
}

export default App;
