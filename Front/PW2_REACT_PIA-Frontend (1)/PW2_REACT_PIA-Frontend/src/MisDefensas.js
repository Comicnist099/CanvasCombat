import React, { useEffect, useState } from "react";
import $, { get } from "jquery";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";
import swal from "sweetalert";

export function MisDefensas() {
  const cookiesNew = new Cookies();
  const idUserCookies = cookiesNew.get("idUser");

  const [searchParams, setSearchParams] = useSearchParams();
  const [friends, setFriends] = useState([]);
  let [boolError, setBoolError] = useState(false);
  let [idUsuario, setidUsuario] = useState();
  const idCharacter = searchParams.get("idCharacter");
  let idUser = searchParams.get("idUser");

  async function ReportValidate(id) {

    swal({
      title: "AVISO",
      text: "¿Deseas reportar este Ataque? Si reportas un ataque que te han realizado este se pondrá en revisión por los administradores de la pagina",
      icon: "error",
      buttons: ["Cancelar", "OK"],
    }).then((respuesta) => {
      if (respuesta) {
        ReportValidateMake(id);
      }
    });
  }

  async function ReportValidateMake(id) {
    const body = {
      isActive: false,
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

    getResponse();
  }

  const getResponse = async () => {
    const response = await fetch(`/draw/Defensas/${idUser}`);
    const body = await response.json();
    const response2 = await fetch(`/draw/${idCharacter}`);
    const body2 = await response2.json();

    setFriends(body);
    setidUsuario(body2.owner);

    if (response.status !== 200) {
      throw Error(body.message);
    }

    if (response2.status !== 200) {
      setBoolError(false);
      throw Error(body2.message);
    }
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

  const compararID = () => {
    if (!idUser) {
      return (
        <div className="one">
          <h1 style={{ color: "white" }}>DEFENSAS</h1>
        </div>
      );
    } else if (!idCharacter) {
      return (
        <div className="one">
          <h1 style={{ color: "white" }}>DEFENSAS</h1>
        </div>
      );
    }
  };

  return (
    <>
      <div
        className="col-11 center"
        style={{
          marginTop: "30px",
          marginLeft: "50px",
        }}
      >
        <div className="row">{compararID()}</div>
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
        if (character.owner == idUserCookies) {
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
                          disabled
                          value={character.descripcion}
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
                </div>{" "}
              </div>
              <button
                style={{ float: "right" }}
                className="fas fa-exclamation-triangle"
                name="idCharacter"
                id="idCharacter"
                onClick={async () => ReportValidate(character._id)}
              >
                Reportar
              </button>
              <div className="row" style={{ margin: "10px" }}></div>
            </div>
          );
        } else {
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
                          disabled
                          value={character.descripcion}
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
                </div>{" "}
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
