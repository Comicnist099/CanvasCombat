import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import $, { get } from "jquery";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export function MisPersonajes() {
  const cookiesNew = new Cookies();
  const idUserCookies = cookiesNew.get("idUser");

  let [boolError, setBoolError] = useState(false);
  let [edit, setedit] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [friends, setFriends] = useState([]);

  const idUser = searchParams.get("idUser");

  const getResponse = async () => {
    const response = await fetch(`/draw/MisPersonajes/${idUser}`);
    const body = await response.json();
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

  const editMode = (e) => {
    setedit(true);
  };

  const staticMode = (e) => {
    setedit(false);
  };

  useEffect(() => {
    getResponse();
  }, []);

  const renderMultimedia = (source) => {
    if (source) {
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
                className="container profileCharacter profile-view"
                data-aos="fade-up"
                id="profile"
                style={{
                  border: "10px solid",
                  color: estiloLetras,
                  marginTop: "50px",
                  background: estilo,
                }}
              >
                <div className="row center">
                  <a
                    href={
                      "/ProfileCharacter?idCharacter=" +
                      character._id +
                      "&idUser=" +
                      idUser
                    }
                  >
                    <h1 style={{ color: estiloLetras }}>{character.title} </h1>
                  </a>
                  <div className="col-md-4">
                    <div className="p-10">
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
                            width: "3090px",
                            maxHeight: "4400",
                            border: "5px solid",
                            color: "rgba(255,255,255,0.50)",
                            marginBottom: "30px",
                            marginTop: "20px",
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
                    <hr></hr>

                    <div className="row">
                      <div className="col-sm-12">
                        <div>
                          <p style={{ color: estiloLetras }}>Titulo:</p>
                          <input
                            className="form-control"
                            type="text"
                            name="firstname"
                            value={character.title}
                            disabled
                          ></input>
                        </div>
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
                    <br></br>
                    <input
                      className="form-control"
                      type="hidden"
                      name="idCharacter"
                      id="idCharacter"
                      value={character._id}
                    ></input>
                    <hr></hr>
                    <a
                      href={"/Editar?idCharacter=" + friends._id}
                      class="btn"
                      style={{
                        border: "2px solid",
                        color: "rgba(255,255,255,0.50)",
                        background: "rgba(0,0,0,0.70)",
                      }}
                    >
                      <small
                        class="fas fa-trash-alt"
                        style={{ color: "white" }}
                      >
                        {" "}
                        Eliminar
                      </small>
                    </a>
                    <a
                      href={"/Editar?idCharacter=" + friends._id}
                      class="btn"
                      style={{
                        border: "2px solid",
                        color: "rgba(255,255,255,0.50)",
                        background: "rgba(0,0,0,0.20)",
                      }}
                    >
                      <small class="fas fa-pen" style={{ color: "white" }}>
                        {" "}
                        Editar
                      </small>
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
  };

  return (
    <>
      {" "}
      <form onSubmit={UpdateProfile}>{NotFoundProfile(edit)}</form>
    </>
  );

}
