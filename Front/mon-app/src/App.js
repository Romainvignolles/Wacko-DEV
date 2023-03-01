import * as React from "react";
import { Routes, Route, Outlet } from "react-router-dom";


import Login from "./pages/Login";
import LiensUtiles from "./pages/LiensUtiles";
import Administration from "./pages/Administration";
import ProfilPage from "./pages/ProfilPage";
import MembrePage from "./pages/MembrePage";
import HangarPage from "./pages/HangarPage";
import AdminWebsitePage from "./pages/AdminWebsite";
import ErrorPage from "./pages/ErrorPage";

import PrivateRoutes from "./utils/PrivateRoutes";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/LiensUtiles" element={<LiensUtiles />} />
          <Route path="/Profil" element={<ProfilPage />} />
          <Route path="/Membre" element={<MembrePage />} />
          <Route path="/Hangar" element={<HangarPage />} />
          <Route path="/Administration" element={<Administration />} />
          <Route path="/AdminWebsite" element={<AdminWebsitePage />} />
        </Route>

        <Route path="/" element={<Login />} />
        <Route path="/404" element={<ErrorPage />} />

      </Routes>


    </div>
  );
}

export default App;