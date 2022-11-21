import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export function MisAtaques() {
  let [renderedResponsea, setRenderedResponsea] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [friends, setFriends] = useState([]);
  let [boolError, setBoolError] = useState(false);
  let [idUsuario, setidUsuario] = useState();
  const idCharacter = searchParams.get("idCharacter");
  let idUser = searchParams.get("idUser");

  const getResponse = async () => {
    const response = await fetch(`/draw`);
    const body = await response.json();

    setRenderedResponsea(body);
    setFriends(body);
    if (response.status !== 200) throw Error(body.message);
  };
  const ErrorNotFound = (source) => {
    if (!source) {
      return (
        <div class="container text-center">
          <h1 style={{ color: "white" }}>NO HA REALIZADO ATAQUES</h1>
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

  async function ModeEdit(
    Mode,
    textBox,
    textBox2,
    buttonText,
    buttonTextEditar1,
    buttonTextEditar2,
    textboxFinal,
    textboxFinal2
  ) {
    if (Mode) {
      document.getElementById(textBox).style.display = "inline";
      document.getElementById(textBox2).style.display = "inline";
      document.getElementById(buttonText).style.display = "inline";
      document.getElementById(buttonTextEditar1).style.display = "inline";
      document.getElementById(buttonTextEditar2).style.display = "none";
      document.getElementById(textboxFinal).style.display = "none";
      document.getElementById(textboxFinal2).style.display = "none";
    } else {
      document.getElementById(textBox).style.display = "none";
      document.getElementById(textBox2).style.display = "none";
      document.getElementById(buttonText).style.display = "none";
      document.getElementById(buttonTextEditar1).style.display = "none";
      document.getElementById(buttonTextEditar2).style.display = "inline";
      document.getElementById(textboxFinal).style.display = "inline";
      document.getElementById(textboxFinal2).style.display = "inline";
    }
  }

  async function PatchCommit(id, contentTitle, contentDescription) {
    ModeEdit(
      false,
      id + "1",
      id + "2",
      id + "3",
      id + "4",
      id + "5",
      id + "6",
      id + "7"
    );

    const finalTitle = document.getElementById(contentTitle).value;
    const finalDescription = document.getElementById(contentDescription).value;

    console.log(finalTitle);
    console.log(finalDescription);

    const body = {
      title: finalTitle,
      descripcion: finalDescription,
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

  useEffect(() => {
    getResponse();
  }, []);

  const compararID = () => {
    if (!idUser) {
      return (
        <div className="one">
          <h1 style={{ color: "white" }}>ATAQUES RECIBIDOS</h1>
        </div>
      );
    } else if (!idCharacter) {
      return (
        <div className="one">
          <h1 style={{ color: "white" }}>ATAQUES</h1>
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
        console.log(idUser);
        console.log(character.cartoonist);
        if (
          character.title !== character.character &&
          character.cartoonist === idUser
        ) {
          
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
                          style={{ display: "none" }}
                          name="firstname"
                          id={character._id + "1"}
                          defaultValue={character.title}
                        ></input>

                        <input
                          className="form-control"
                          type="text"
                          name="firstname"
                          disabled
                          id={character._id + "6"}
                          value={character.title}
                        ></input>
                      </div>

                      <div>
                        <p style={{ color: estiloLetras }}>Descripcion:</p>
                        <input
                          className="form-control"
                          type="text"
                          style={{ display: "none" }}
                          name="firstname"
                          id={character._id + "2"}
                          defaultValue={character.descripcion}
                        ></input>

                        <input
                          className="form-control"
                          type="text"
                          name="firstname"
                          disabled
                          id={character._id + "7"}
                          value={character.descripcion}
                        ></input>
                      </div>
                      <button
                        class="btn"
                        id={character._id + "3"}
                        name="saveButton"
                        style={{
                          display: "none",
                          border: "2px solid",
                          marginTop: "18px",
                          width: "90px",
                          height: "60px",
                          color: "rgba(255,255,255,0.50)",
                          background: "rgba(0,0,0,0.20)",
                        }}
                        onClick={async () =>
                          PatchCommit(
                            character._id,
                            character._id + "1",
                            character._id + "2"
                          )
                        }
                        value="Guardar"
                      >
                        <span
                          style={{
                            color: "white",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          Guardar
                        </span>
                      </button>
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
                  <button
                    class="btn"
                    id={character._id + "4"}
                    name="editButton"
                    style={{
                      border: "2px solid",
                      color: "rgba(255,255,255,0.50)",
                      background: "rgba(0,0,0,0.20)",
                      display: "none",
                    }}
                    onClick={async () =>
                      ModeEdit(
                        false,
                        character._id + "1",
                        character._id + "2",
                        character._id + "3",
                        character._id + "4",
                        character._id + "5",
                        character._id + "6",
                        character._id + "7"
                      )
                    }
                    value="Editar"
                  >
                    <p style={{ color: "white" }}>Editar</p>
                  </button>

                  <button
                    class="btn"
                    id={character._id + "5"}
                    name="editButton"
                    style={{
                      border: "2px solid",
                      color: "rgba(255,255,255,0.50)",
                      background: "rgba(0,0,0,0.20)",
                    }}
                    onClick={async () =>
                      ModeEdit(
                        true,
                        character._id + "1",
                        character._id + "2",
                        character._id + "3",
                        character._id + "4",
                        character._id + "5",
                        character._id + "6",
                        character._id + "7"
                      )
                    }
                    value="Editar"
                  >
                    <p style={{ color: "white" }}>Editar</p>
                  </button>
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
