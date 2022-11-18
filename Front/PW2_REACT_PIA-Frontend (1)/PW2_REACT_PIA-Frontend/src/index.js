import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HeadingDeclaration } from "./HeadingDeclaration";
import { FooterInclude } from "./FooterInclude";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SplashPage } from "./SplashPage";
import { AboutUs } from "./AboutUs";
import { LoginRegister } from "./LoginRegister";
import { Profile } from "./Profile";
import { MisPersonajes } from "./MisPersonajes";
import { ProfileCharacter } from "./ProfileCharacter";
import { Logros } from "./Logros";
import { SubirPersonaje } from "./SubirPersonaje";
import { SubirAtaque } from "./SubirAtaque";
import { DashBoardCharacter } from "./DashBoardCharacter";
import { DashBoardAttacks } from "./DashBoardAttacks";
import { MisAtaques } from "./MisAtaques";
import { MisDefensas } from "./MisDefensas";

import "./App.css";
import "./fonts/fontawesome-all.min.css";
import "./fonts/font-awesome.min.css";
import "./fonts/fontawesome5-overrides.min.css";
import "./css/-Filterable-Gallery-with-Lightbox-BS4-.css";
import "./css/-Login-form-Page-BS4-.css";
import "./css/best-carousel-slide.css";
import "./css/Pretty-Footer.css";
import "./css/Profile-Edit-Form.css";
import "./css/Standard-Picture-Header.css";
import "./css/styles.css";
import "./css/Timeline.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Router,
  NavLink,
  Routes,
  BrowserRouter,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

function Metadata() {}

root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="aboutUs" element={<AboutUs />} />
      <Route path="LoginRegister" element={<LoginRegister />} />
      <Route path="Profile" element={<Profile />} />
      <Route path="MisPersonajes" element={<MisPersonajes />} />
      <Route path="Logros" element={<Logros />} />
      <Route path="SubirPersonaje" element={<SubirPersonaje />} />
      <Route path="SubirAtaque" element={<SubirAtaque />} />
      <Route path="ProfileCharacter" element={<ProfileCharacter />} />
      <Route path="DashBoardCharacter" element={<DashBoardCharacter />} />
      <Route path="DashBoardAttacks" element={<DashBoardAttacks />} />
      <Route path="MisAtaques" element={<MisAtaques />} />
      <Route path="MisDefensas" element={<MisDefensas />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

/*
  <React.StrictMode>
    <App />
  </React.StrictMode>
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
