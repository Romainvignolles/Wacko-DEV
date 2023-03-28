import * as React from "react";
import { Routes, Route } from "react-router-dom";



import Login from "./pages/Login";
import LiensUtiles from "./pages/LiensUtiles";
import Administration from "./pages/Administration";
import ProfilPage from "./pages/ProfilPage";
import MembrePage from "./pages/MembrePage";
import HangarPage from "./pages/HangarPage";
import AdminWebsitePage from "./pages/AdminWebsite";
import AdminImagePage from "./pages/AdminImagePage";
import ErrorPage from "./pages/ErrorPage";
import EventPage from "./pages/event/Event";
import CreateEventPage from "./pages/event/CreateEvent";
import DisplayEventPage from "./pages/event/DisplayEvent";
import ModifyEvent from "./pages/event/ModifyEvent";

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
          <Route path="/AdminImagePage" element={<AdminImagePage />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/createEvent" element={<CreateEventPage />} />
          <Route path="/displayEvent" element={<DisplayEventPage />} />
          <Route path="/modifyEvent" element={<ModifyEvent />} />
        </Route>

        <Route path="/" element={<Login />} />
        <Route path="/404" element={<ErrorPage />} />

      </Routes>


    </div>
  );
}

export default App;
