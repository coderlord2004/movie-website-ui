import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Home from "./Pages/Home/Home.js";
import Login from "./Pages/Login/Login.js";
import Signup from "./Pages/Singup/Signup.js";
import "./index.css";
import UserDetail from "./Pages/UserDetail/UserDetail.js";
import MovieDetail from "./Pages/MovieDetail/MovieDetail.js";
import DemoPage from "./Pages/DemoPage/DemoPage.js";
import WatchFilm from "./Pages/WatchFilm/WatchFilm.js";
import Admin from "./Pages/Admin/Admin.js";
import UploadFilm from "./Pages/UploadFilm/UploadFilm.js";

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/" element={<DemoPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/myinfo" element={<UserDetail />} />
      <Route
        path="/watch-detail/:type/:typeDetail/:movieId"
        element={<MovieDetail />}
      />
      <Route path="/watch/:videoKey" element={<WatchFilm />} />
      <Route path="/admin/upload-film" element={<UploadFilm />} />
    </Routes>
  );
}

export default App;
