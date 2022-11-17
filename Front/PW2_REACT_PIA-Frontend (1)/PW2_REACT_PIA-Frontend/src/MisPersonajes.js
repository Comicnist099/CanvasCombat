import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import $, { get } from "jquery";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export function MisPersonajes() {
  const cookiesNew = new Cookies();
  const idUserCookies = cookiesNew.get("idUser");
  const navigate = useNavigate();

  let [renderedResponsea, setRenderedResponsea] = useState({});
  let [boolError, setBoolError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [friends, setFriends] = useState([]);

  const idUser = searchParams.get("idUser");

  const getResponse = async () => {
    const response = await fetch(`/draw`);
    const body = await response.json();

    setRenderedResponsea(body);
    setFriends(body);

    if (response.status !== 200) throw Error(body.message);
  };
  const ErrorNotFound = (source) => {
    if (!source)
      return (
        <div class="container text-center">
          <h1 style={{ color: "white" }}>NO HA SUBIDO PERSONAJES</h1>
          <img
            style={{
              width: 300,
              maxHeight: 600,
            }}
            alt=" "
            src="https://cdn.discordapp.com/attachments/921926176484773909/1042250822240714823/Sad-Drawing-PNG-HD-Isolated.png"
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
        <div className="row">
          <div className="one">
            <h1 style={{ color: "white" }}>MIS PERSONAJES</h1>
          </div>
        </div>
      </div>
      {/* tarjeta de personajes  */}
      {friends.map((character) => {
        let estilo;
        let estiloLetras;
        if (
          character.owner === character.cartoonist &&
          character.owner === idUser
        ) {
          if (!boolError) {
            setBoolError(true);
          }
          if (character.team == 0) {
            estilo = "rgb(227, 89, 169)";
            estiloLetras = "rgb(77, 22, 77)";
          }
          if (character.team == 1) {
            estilo = "rgb(156, 43, 28)";
            estiloLetras = "rgb(77, 22, 22)";
          }

          return (
            <div
              className="container profile profile-view"
              data-aos="fade-up"
              id="profile"
              style={{
                border: "15px solid",
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
                        src={character.image.path}
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
                  <h1 style={{ color: estiloLetras }}> {character.title} </h1>
                  <hr></hr>

                  <div className="row">
                    <div className="col-sm-12 col-md-6">
                      <div className="form-group mb-3">
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
                    style={{ background: estiloLetras, float: "right" }}
                  >
                    <p style={{ color: "white" }}> Ir a</p>
                  </a>
                </div>
              </div>
              <div className="row" style={{ margin: "10px" }}></div>
            </div>
          );
        }
      })}
      {ErrorNotFound(boolError)}
      {/* tarjeta de personajes  */}{" "}
    </>
  );
}
