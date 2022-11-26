import React, { useEffect, useState } from "react";
import $, { get } from "jquery";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";
import swal from "sweetalert";

export function AtaquesRevision() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [friends, setFriends] = useState([]);
  let [typeUser, setTypeUser] = useState();
  let [boolError, setBoolError] = useState(false);
  const idCharacter = searchParams.get("idCharacter");
  let idUser = searchParams.get("idUser");

  const cookiesNew = new Cookies();
  const idUserCookies = cookiesNew.get("idUser");

  const getResponse = async () => {
    const response = await fetch(`/users/${idUser}`);
    const body = await response.json();
    const response2 = await fetch(`/draw/${idCharacter}`);
    const body2 = await response2.json();

    setFriends(body);
    setTypeUser(body.typeUser);

    if (response.status !== 200) throw Error(body.message);

    if (response2.status !== 200) throw Error(body2.message);

  };
  const ErrorNotFound = (source) => {
    if (!source) {
      return (
        <div class="container text-center">
          <h1 style={{ color: "white" }}>NO HAY ATAQUES PARA REVISAR</h1>

          <br></br>
          <br></br>
          <img
            style={{
              width: 300,
              maxHeight: 600,
            }}
            alt=" "
            src="https://cdn-icons-png.flaticon.com/512/5230/5230483.png"
          ></img>

          <a
            class="btn btn-danger"
            id="myProducts"
            href={"profile?idUser=" + idUserCookies}
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

  const AttackRevision = () => {
    if (typeUser === "2") {
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
              <h1 style={{ color: "white" }}>REVISION</h1>
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
              <>
                <div
                  className="col-11 center"
                  style={{
                    marginTop: "30px",
                    marginLeft: "50px",
                  }}
                ></div>
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
                      <h1 style={{ color: estiloLetras }}>
                        {character.title}{" "}
                      </h1>
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
                              id={character._id + "1"}
                              defaultValue={character.title}
                            ></input>

                            <input
                              className="form-control"
                              type="text"
                              name="firstname"
                              disabled
                              value={character.title}
                            ></input>
                          </div>

                          <div>
                            <p style={{ color: estiloLetras }}>Descripcion:</p>
                            <input
                              className="form-control"
                              type="text"
                              name="firstname"
                              defaultValue={character.descripcion}
                            ></input>

                            <input
                              className="form-control"
                              type="text"
                              name="firstname"
                              disabled
                              value={character.descripcion}
                            ></input>
                          </div>
                          <button
                            class="btn"
                            name="okButton"
                            style={{
                              border: "2px solid",
                              marginTop: "18px",
                              width: "90px",
                              height: "60px",
                              color: "rgba(255,255,255,0.50)",
                              background: "rgba(0,0,0,0.20)",
                            }}
                            value="OK"
                          >
                            <span
                              style={{
                                color: "white",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              Todo Ok
                            </span>
                          </button>
                        </div>
                      </div>

                      <hr></hr>

                      <button
                        type="button"
                        class=" btn btn-danger btn-xs"
                        id="deleteButton"
                        name="deleteButton"
                        style={{
                          border: "2px solid",
                          color: "rgba(255,255,255,0.50)",
                          background: "rgba(0,0,0,0.70)",
                        }}
                      >
                        <p style={{ color: "white" }}>ELIMINAR</p>
                      </button>
                    </div>
                  </div>
                  <div className="row" style={{ margin: "10px" }}></div>
                </div>
              </>
            );
          })}
          {ErrorNotFound(boolError)}
        </>
      );
    } else {
      return (
        <div class="container text-center">
          <h1 style={{ color: "white" }}>ERROR 404</h1>
          <h1 style={{ color: "white" }}>NO PUEDES ENTRAR A ESTA PAGINA</h1>

          <br></br>
          <br></br>
          <img
            style={{
              width: 300,
              maxHeight: 600,
            }}
            alt=" "
            src="https://media.discordapp.net/attachments/921926176484773909/1045926021544816730/OJO.png?width=461&height=676"
          ></img>

          <a
            class="btn btn-danger"
            id="myProducts"
            href={"/"}
            style={{ textAlign: "center" }}
          >
            Regresar al inicio
          </a>
        </div>
      );
    }
  };

  return (
    <>
    {AttackRevision()}
    </>
  );
}

export default AtaquesRevision;
