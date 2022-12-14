
import AOS from "aos";
import Cookies from "universal-cookie";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function Navbar() {
  let [renderedResponsea, setRenderedResponsea] = useState();
  let [renderedResponsea2, setRenderedResponsea2] = useState();
  let [typeUser, setTypeUser] = useState(" ");

  const getResponse = async () => {
    const response = await fetch(`/teams/`);
    const body = await response.json();

    const response2 = await fetch(`/users/${idUserCookies}`);
    const body2 = await response2.json();
    setTypeUser(body2.typeUser);

    setRenderedResponsea(body[0].points);
    setRenderedResponsea2(body[1].points);
    console.log(body);

    const bufferCookies = "";
    console.log(idUserCookies);
    if (idUserCookies == bufferCookies) {
      console.log("si entro");
    }

    if (response.status !== 200) throw Error(body.message);
  };

  useEffect(() => {
    getResponse();
  }, []);

  const cookiesNew = new Cookies();
  const idUserCookies = cookiesNew.get("idUser");

  const ProfileID = (source) => {

    if (source != "") {
      return (
        <li className="nav-item" id="profile">
          <a
            className="nav-link active"
            data-bss-hover-animate="pulse"
            href={"profile?idUser=" + idUserCookies}
            style={{
              color: "rgb(255,255,255)",
              marginRight: "0px",
            }}
          >
            <i className="fas fa-user" style={{ color: "rgb(0,255,10)" }}></i>
            &nbsp;PERFIL
          </a>
        </li>
      );
    } else {
      return (
        <li className="nav-item" id="loginNavbar">
          <a
            className="nav-link active"
            data-bss-hover-animate="pulse"
            id="login"
            href="LoginRegister"
            style={{
              color: "rgb(255,255,255)",
              marginRight: "0px",
            }}
          >
            <i className="fas fa-key" style={{ color: "rgb(0,240,255)" }}></i>
            &nbsp;INGRESAR
          </a>
        </li>
      );
    }
  };

  AOS.init({});

  return (
    <>
      <nav
        className="navbar navbar-light navbar-expand-md sticky-top"
        style={{
          background: "rgba(0,0,0,0.69)",
          position: "relative",
          display: "-ms-flexbox",
          display: "flex",
          paddingTop: "1.5rem",
          paddingBottom: "1.5rem",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div className="container">
          <img
            style={{
              width: "80px",
              height: "80px",
              marginRight: "20px",
            }}
            alt=" "
            src="https://cdn.discordapp.com/attachments/921926176484773909/1042324661100367882/canvascombat.png"
          ></img>
          <a
            className="navbar-brand"
            href="/"
            style={{
              color: "rgb(255,255,255)",
              fontWeight: "bold",
              letterSpacing: "1px",
              borderStyle: "double",
            }}
          >
            &nbsp;CANVAS COMBAT&nbsp;
          </a>
          <button
            data-bs-toggle="collapse"
            className="navbar-toggler"
            data-bs-target="#navcol-1"
          >
            <span className="visually-hidden">Toggle navigation</span>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navcol-1">
            <ul className="navbar-nav" style={{ marginLeft: "0px" }}>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-bss-hover-animate="pulse"
                  href="/DashBoardCharacter"
                  style={{
                    color: "rgb(82, 194, 222)",
                    marginRight: "0",
                  }}
                >
                  <i className="fas fa-users "></i>&nbsp;Characters
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-bss-hover-animate="pulse"
                  href="/DashBoardAttacks"
                  style={{
                    color: "rgb(255,0,0)",
                    marginRight: "0",
                  }}
                >
                  <i className="fa fa-pencil"></i>&nbsp;Ataques
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-bss-hover-animate="pulse"
                  href="Help"
                  style={{
                    color: "white",
                    marginRight: "0px",
                  }}
                >
                  <i className="fas fa-search"></i>&nbsp;AYUDA
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-bss-hover-animate="pulse"
                  href="AboutUs"
                  style={{
                    color: "rgb(241, 210, 92)",
                    marginRight: "0px",
                  }}
                >
                  <i className="fa fa-id-card"></i>&nbsp;NOSOTROS
                </a>
              </li>
              {ProfileID(idUserCookies)}
            </ul>
          </div>
        </div>
      </nav>

      <nav
        className="navbar navbar-light navbar-expand-md sticky-top"
        style={{
          background: "rgba(0,0,0,0.69)",
          position: "relative",
          display: "-ms-flexbox",
          display: "flex",
          paddingTop: "1.5rem",
          paddingBottom: "1.5rem",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div class="container text-center">
          <img
            class="rounded-circle mt-2"
            style={{ width: "160px" }}
            alt=" "
            src="https://cdn.discordapp.com/attachments/921926176484773909/1042613734205562961/SweetFont.png"
          ></img>

          <img
            class="rounded-circle mt-2"
            style={{ width: "100px" }}
            alt=" "
            src="https://cdn.discordapp.com/attachments/921926176484773909/1042600953070755841/SweetTeam.png"
          ></img>

          <h1>{renderedResponsea}</h1>
          <img
            style={{ width: "50px" }}
            alt=" "
            src="https://i.pinimg.com/originals/03/ca/85/03ca852c2d14b703a883ba22209f0b71.png"
          ></img>
          <h1>{renderedResponsea2}</h1>
          <img
            class="rounded-circle mt-2"
            style={{ width: "100px" }}
            alt=" "
            src="https://cdn.discordapp.com/attachments/921926176484773909/1042600953574084648/SpicyTeam.png"
          ></img>

          <img
            class="rounded-circle mt-2"
            style={{ width: "160px" }}
            alt=" "
            src="https://cdn.discordapp.com/attachments/921926176484773909/1042613733844865146/SpicyFont.png"
          ></img>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
