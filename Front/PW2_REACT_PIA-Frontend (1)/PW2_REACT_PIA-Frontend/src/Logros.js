import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";

export function Logros() {
  let [renderedResponsea, setRenderedResponsea] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [friends, setFriends] = useState();
  let [error, setError] = useState(" ");
  let [styleTeam, setStyleTeam] = useState(" ");
  let [styleTeam2, setStyleTeam2] = useState(" ");
  let [styleTeam3, setStyleTeam3] = useState(" ");
  let [styleTeam4, setStyleTeam4] = useState(" ");
  let [opacityT, setOpacityT] = useState("0.2");
  let [opacityT2, setOpacity2T] = useState("0.2");
  let [opacityT3, setOpacity3T] = useState("0.2");
  let [opacityT4, setOpacity4T] = useState("0.2");

  const idUser = searchParams.get("idUser");

  const cookiesNew = new Cookies();
  const idUserCookies = cookiesNew.get("idUser");

  const getResponse = async () => {
    const response = await fetch(`/users/${idUser}`);
    const body = await response.json();
    setError(body.error);
    setRenderedResponsea(body);
    setFriends(body);

    if (response.status !== 200) throw Error(body.message);

    if (body.isActive) {
      // ///////////////////////VALIDAR ESTILOS
      if (body.achievements1) {
        setStyleTeam("rgb(150, 150, 150)");
        setOpacityT( "0.8");
      }
      if (body.achievements2) {
        setStyleTeam2("rgb(150, 150, 150)");
        setOpacity2T("0.8");
      }
      if (body.achievements3) {
        setStyleTeam3("rgb(150, 150, 150)");
        setOpacity3T("0.8");
      }
      if (body.achievements4) {
        setStyleTeam4("rgb(150, 150, 150)");
        setOpacity4T("0.8");
      }
    }
  };

  useEffect(() => {
    getResponse();
  }, []);

  return (
    <>
      <div
        className="col-11 center"
        style={{ marginTop: "30px", marginLeft: "50px" }}
      >
        <div className="row">
          <div className="one">
            <h1 style={{ color: "white" }}>L O G R O S</h1>
          </div>
        </div>
      </div>

      {/* ///////////////// CREASTE TU CUENTA /////////////////// */}
      <div
        className="container profile profile-view"
        data-aos="fade-up"
        id="profile"
        style={{ marginTop: "50px", color: styleTeam, background: styleTeam }}
      >
        <div className="row" style={{ background: "rgba(255,255,255,0.37)" }}>
          <div className="col-md-4 center">
            <div className="p-5">
              <img
                className="img-fluid"
                src="assets/img/trophy-42191.png"
                style={{opacity: opacityT}}
                alt=" "
              ></img>
            </div>
          </div>

          <div className="col-md-8 center">
            <br></br>
            <h1> CREA TU CUENTA </h1>
            <br></br>
            <hr></hr>
            <br></br>
            <form>
              <div className="row">
                <h3> Creaste una cuenta en CanvasCombat. </h3>
              </div>

              <hr></hr>
            </form>
          </div>
        </div>

        <div className="row" style={{ margin: "10px" }}></div>
      </div>

      {/* ///////////////// SUBISTE TU PRIMER DIBUJO /////////////////// */}
      <div
        className="container profile profile-view"
        data-aos="fade-up"
        id="profile"
        style={{ marginTop: "50px", color: styleTeam2, background: styleTeam2 }}
      >
        <div className="row" style={{ background: "rgba(255,255,255,0.37)" }}>
          <div className="col-md-4 center">
            <div className="p-5">
              <img
                className="img-fluid"
                src="assets/img/trophy-42191.png"
                style={{opacity: opacityT2}}
                alt=" "
              ></img>
            </div>
          </div>

          <div className="col-md-8 center">
            <br></br>
            <h1> SUBE TU PRIMER PERSONAJE </h1>
            <hr></hr>
            <br></br>
            <form>
              <div className="row">
                <h3>
                  Anímate y sube tu primer personaje para que pueda ser atacado.{" "}
                </h3>
              </div>

              <hr></hr>
            </form>
          </div>
        </div>

        <div className="row" style={{ margin: "10px" }}></div>
      </div>

      {/* ///////////////// ATACASTE POR PRIMERA VEZ /////////////////// */}
      <div
        className="container profile profile-view"
        data-aos="fade-up"
        id="profile"
        style={{ marginTop: "50px", color: styleTeam3, background: styleTeam3 }}
      >
        <div className="row" style={{ background: "rgba(255,255,255,0.37)" }}>
          <div className="col-md-4 center">
            <div className="p-5">
              <img
                className="img-fluid"
                src="assets/img/trophy-42191.png"
                style={{opacity: opacityT3}}
                alt=" "
              ></img>
            </div>
          </div>

          <div className="col-md-8 center">
            <br></br>
            <h1> ATACASTE A ALGUIEN POR PRIMERA VEZ </h1>
            <hr></hr>
            <br></br>
            <form>
              <div className="row">
                <h3>
                  Encuentra un dibujo del equipo contrario de tu agrado, y
                  atácalo.
                </h3>
              </div>

              <hr></hr>
            </form>
          </div>
        </div>

        <div className="row" style={{ margin: "10px" }}></div>
      </div>

      {/* ///////////////// TU EQUIPO GANA /////////////////// */}
      <div
        className="container profile profile-view"
        data-aos="fade-up"
        id="profile"
        style={{ marginTop: "50px", color: styleTeam4, background: styleTeam4 }}
      >
        <div className="row" style={{ background: "rgba(255,255,255,0.37)" }}>
          <div className="col-md-4 center">
            <div className="p-5">
              <img
                className="img-fluid"
                src="assets/img/trophy-42191.png"
                style={{opacity: opacityT4}}
                alt=" "
              ></img>
            </div>
          </div>

          <div className="col-md-8 center">
            <br></br>
            <h1> TU EQUIPO GANA </h1>
            <br></br>
            <hr></hr>
            <br></br>
            <form>
              <div className="row">
                <h3>Tu equipo ganó el enfrentamiento.</h3>
              </div>

              <hr></hr>
            </form>
          </div>
        </div>

        <div className="row" style={{ margin: "10px" }}></div>
      </div>
    </>
  );
}
