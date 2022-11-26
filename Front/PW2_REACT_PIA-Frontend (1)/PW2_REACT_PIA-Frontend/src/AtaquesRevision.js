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
  let idUser = searchParams.get("idUser");
  let [teams, setTeams] = useState();

  const cookiesNew = new Cookies();
  const idUserCookies = cookiesNew.get("idUser");

  const getResponse = async () => {
    const response = await fetch(`/users/${idUser}`);
    const body = await response.json();
    const response2 = await fetch(`/draw/Attack`);
    const body2 = await response2.json();

    setFriends(body2);
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

  async function deleteDrawContent(id, team, points, cartoonist) {
    const response = await fetch(`http://localhost:5000/draw/${id}`, {
      method: "DELETE",
    });
    const respJson = await response.json();
    console.log(respJson);
    if (respJson.error == "Bad Request") {
      return console.log("NO JALO");
    }

    let body2;
    if (team == "0") {
      const response2 = await fetch(`/teams/6375936aad8bffc948b4d770`);
      body2 = await response2.json();
    } else {
      const response2 = await fetch(`/teams/63759398ad8bffc948b4d778`);
      body2 = await response2.json();
    }

    let puntosteam = parseInt(body2.points);
    let TotalPoints = puntosteam - points;
    let stringpoints = TotalPoints.toString();

    const bodyTeam = {
      points: stringpoints,
    };

    const response3 = await fetch(`/teams/${body2._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyTeam),
    });
    const respJson2 = await response3.json();
    console.log(respJson2);
    if (respJson2.error == "Bad Request") {
      return console.log("NO JALO");
    }

    ////////////////////////////USER

    const response2 = await fetch(`/users/${cartoonist}`);
    body2 = await response2.json();

    let puntosUsers = parseInt(body2.points);
    let userPoints = puntosUsers - points;
    stringpoints = userPoints.toString();

    const bodyUser = {
      points: stringpoints,
    };

    const response4 = await fetch(`/users/${cartoonist}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyUser),
    });
    const respJso3 = await response4.json();
    console.log(respJso3);
    if (respJso3.error == "Bad Request") {
      return console.log("NO JALO");
    }

    window.location.assign("/AtaquesRevision?idUser=" + idUser);
  }

  async function DeleteCharacter(id, team, points, cartoonist) {
    swal({
      title: "AVISO",
      text: "Esta seguro que desea eliminar este dibujo",
      icon: "error",
      buttons: ["Cancelar", "OK"],
    }).then((respuesta) => {
      if (respuesta) {
        deleteDrawContent(id, team, points, cartoonist);
      }
    });
  }

  async function characterPatched(id) {
    const body = {
      isActive: true,
    };

    const response = await fetch(`http://localhost:5000/draw/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const respJson = await response.json();
    console.log(respJson);
    if (respJson.error == "Bad Request") {
      return console.log("NO JALO");
    }

    window.location.assign("/AtaquesRevision?idUser=" + idUser);
  }

  async function patchCharacter(id) {
    swal({
      title: "AVISO",
      text: "Este Ataque sera aceptado y mandado a la página",
      icon: "warning",
      buttons: ["Cancelar", "OK"],
    }).then((respuesta) => {
      if (respuesta) {
        characterPatched(id);
      }
    });
  }

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
                    <h1 style={{ color: estiloLetras }}>{character.title} </h1>
                    <div className="col-md-4">
                      <div className="p-10">
                        <p style={{ color: estiloLetras }}>Miniatura </p>
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
                        <p style={{ color: estiloLetras }}>Ataque </p>
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
                          src={character.image.path}
                        ></img>
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
                              disabled
                              value={character.title}
                            ></input>

                            <p style={{ color: estiloLetras }}>Descripcion:</p>
                            <input
                              className="form-control"
                              type="text"
                              name="firstname"
                              disabled
                              value={character.descripcion}
                            ></input>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <br></br>
                          <table style={{ float: "left" }}>
                            <tr>
                              <td>
                                <p style={{ color: estiloLetras }}>Body: </p>
                              </td>
                              <td>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="firstname"
                                  style={{ textAlign: "center" }}
                                  disabled
                                  value={character.body}
                                ></input>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <p style={{ color: estiloLetras }}>Lineart: </p>
                              </td>
                              <td>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="firstname"
                                  disabled
                                  style={{ textAlign: "center" }}
                                  value={character.lineart}
                                ></input>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <p style={{ color: estiloLetras }}>Detail: </p>
                              </td>
                              <td>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="firstname"
                                  style={{ textAlign: "center" }}
                                  disabled
                                  value={character.detail}
                                ></input>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <p style={{ color: estiloLetras }}>
                                  Background:{" "}
                                </p>
                              </td>
                              <td>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="firstname"
                                  style={{ textAlign: "center" }}
                                  disabled
                                  value={character.background}
                                ></input>
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <p style={{ color: estiloLetras }}>
                                  Puntos Recibidos:
                                </p>
                              </td>
                              <td>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="firstname"
                                  style={{ textAlign: "center" }}
                                  disabled
                                  value={character.points}
                                ></input>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>

                      <hr></hr>
                      <button
                        class="btn"
                        name="okButton"
                        style={{
                          border: "2px solid",
                          marginRight: "20px",
                          color: "rgba(255,255,255,0.50)",
                          background: "rgba(0,0,0,0.20)",
                        }}
                        onClick={async () => patchCharacter(character._id)}
                        value="OK"
                      >
                        <p style={{ color: "white" }}>Todo Ok</p>
                      </button>

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
                        onClick={async () =>
                          DeleteCharacter(
                            character._id,
                            character.team,
                            character.points,
                            character.cartoonist
                          )
                        }
                        value="Delete"
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

  return <>{AttackRevision()}</>;
}

export default AtaquesRevision;
