import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import $, { get } from "jquery";

export function DashBoardCharacter() {
  let [renderedResponsea, setRenderedResponsea] = useState({});
  const [friends, setFriends] = useState([]);

  const getResponse = async () => {
    const response = await fetch(`/draw`);
    const body = await response.json();

    setRenderedResponsea(body);
    setFriends(body);

    if (response.status !== 200) throw Error(body.message);
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
            <h1 style={{ color: "white" }}>Personajes</h1>
          </div>
        </div>
        <br></br>
        <br></br>
      </div>

      <div class="container text-center">
        <div class="row">
          {friends.map((character) => {
            let estilo;
            let estiloLetras;

            if (character.title === character.character) {
              if (character.team == 0) {
                estilo = "rgb(199, 97, 140)";
                estiloLetras = "rgb(77, 22, 77)";
              }
              if (character.team == 1) {
                estilo = "rgb(150, 57, 57)";
                estiloLetras = "rgb(77, 22, 22)";
              }
              return (
                <div class="col-6 col-md-3 col-lg-2">
                  <div
                    class="card p-1 mb-3 text-center mw-100 mh-100 clearfix"
                    style={{
                      border: "3px solid",
                      color: estiloLetras,
                      background: estilo,
                    }}
                  >
                    <a href={"/ProfileCharacter?idCharacter=" + character._id}>
                      <img
                        alt=" "
                        style={{
                          width: "140px",
                          height: "140px",
                          border: "4px solid",
                          color: "rgba(255,255,255,0.50)",
                        }}
                        src={character.image.path}
                      ></img>
                    </a>
                    <div class="h4 text-truncate">
                      <p style={{ color: "rgba(255, 255, 255, 0.65)" }}>
                        {character.title}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          })}{" "}
        </div>
      </div>
    </>
  );
}
