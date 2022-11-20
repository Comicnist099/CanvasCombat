import React, { useEffect, useState } from "react";
import $, { get } from "jquery";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export function MisDefensasCharacter() {
  let [renderedResponsea, setRenderedResponsea] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [friends, setFriends] = useState([]);
  let [boolError, setBoolError] = useState(false);
  let [idUsuario, setidUsuario] = useState();
  const idCharacter = searchParams.get("idCharacter");
  let idUser = searchParams.get("idUser");

  const getResponse = async () => {
    const response = await fetch(`/draw/profile/Defensas/${idCharacter}`);
    const body = await response.json();
    const response2 = await fetch(`/draw/${idUser}`);
    const body2 = await response2.json();

    setRenderedResponsea(body);
    setFriends(body);
    setidUsuario(body2.owner);

    console.log(body);

    if (response.status !== 200) throw Error(body.message);

    if (response2.status !== 200) throw Error(body2.message);
  };
  const ErrorNotFound = (source) => {
    if (!source) {
      if (!idUser) {
        idUser = idUsuario;
        console.log(idUser);
      }
      return (
        <div class="container text-center">
          <h1 style={{ color: "white" }}>NO HA RECIBIDO DEFENSAS</h1>
          <img
            style={{
              width: 300,
              maxHeight: 600,
            }}
            alt=" "
            src="https://images.shoutwiki.com/battlecraze/thumb/1/14/AjitFull.png/360px-AjitFull.png"
          ></img>

          <a
            class="btn btn-danger"
            id="myProducts"
            href={"profile?idUser=" + idUser}
            style={{ textAlign: "center" }}
          >
            Regresar al perfil
          </a>
        </div>
      );
    }
  };

  useEffect(() => {
    getResponse();
  }, []);

  return (
    <>
      <div
        className="col-11 center"
        style={{
          marginTop: "30px",
          marginLeft: "50px",
        }}
      >
        <div className="one">
          <h1 style={{ color: "white" }}>DEFENSAS</h1>
        </div>
      </div>
      {/* tarjeta de personajes  */}
      {friends.map((character) => {
        let estilo;
        let estiloLetras;

        if (!boolError) {
          setBoolError(true);
        }

        if (character.team == 0) {
          estilo = "rgb(199, 97, 140)";
          estiloLetras = "rgb(77, 22, 77)";
        }
        if (character.team == 1) {
          estilo = "rgb(150, 57, 57)";
          estiloLetras = "rgb(77, 22, 22)";
        }
        return (
          <div
            className="container profile profile-view"
            data-aos="fade-up"
            id="profile"
            style={{
              border: "10px solid",
              color: estiloLetras,
              marginTop: "50px",
              background: estilo,
            }}
          >
            <div className="row">
              <div className="col-md-4 center">
                <div className="p-5">
                  <a
                    href={
                      "/ProfileCharacter?idCharacter=" +
                      character._id +
                      "&idUser=" +
                      idUser
                    }
                  >
                    <img
                      style={{
                        width: "1090px",
                        maxHeight: "2400",
                        border: "8px solid",
                        color: "rgba(255,255,255,0.50)",
                      }}
                      className="img-fluid"
                      alt=" "
                      src={character.imageProfile.path}
                    ></img>
                  </a>
                </div>
              </div>

              <input
                className="form-control"
                type="hidden"
                name="idCharacter"
                id="idCharacter"
                value={character._id}
              ></input>

              <div className="col-md-8 center">
                <h1 style={{ color: estiloLetras }}>{character.title} </h1>
                <hr></hr>

                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <div className="form-group mb-3">
                      <div>
                        <p style={{ color: estiloLetras }}>Descripcion:</p>
                        <input
                          className="form-control"
                          type="text"
                          name="firstname"
                          value={character.descripcion}
                          disabled
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
                <input
                  className="form-control"
                  type="hidden"
                  name="idCharacter"
                  id="idCharacter"
                  value={character._id}
                ></input>

                <hr></hr>
                <a
                  href={
                    "/ProfileCharacter?idCharacter=" +
                    character._id +
                    "&idUser=" +
                    idUser
                  }
                  class="btn"
                  style={{
                    background: estiloLetras,
                    float: "right",
                  }}
                >
                  <p style={{ color: "white" }}>Ir a</p>
                </a>
              </div>
            </div>
            <div className="row" style={{ margin: "10px" }}></div>
          </div>
        );
      })}
      {ErrorNotFound(boolError)}
      {/* tarjeta de personajes  */}{" "}
    </>
  );
}
