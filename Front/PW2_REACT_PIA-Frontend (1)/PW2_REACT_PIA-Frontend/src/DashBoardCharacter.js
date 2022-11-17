import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import $, { get } from "jquery";

export function DashBoardCharacter() {
  let [renderedResponsea, setRenderedResponsea] = useState({});
  const [friends, setFriends] = useState([]);

  const myImageStyle = { width: "140px", height: "140px" };

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
        style={{ marginTop: "30px", marginLeft: "50px" }}
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
            if ( character.title === character.character) {
              return (
                <div class="col-6 col-md-3 col-lg-2">
                  <div class="card p-1 mb-3 text-center mw-100 mh-100 clearfix">
                    <div>
                      <a
                        href={"/ProfileCharacter?idCharacter=" + character._id}
                        class="card p-1 m-1 thumb-attack character-thumb thumbnail"
                      >
                        <img
                          className="form-img__img-preview"
                          alt=" "
                          style={myImageStyle}
                          src={character.image.path}
                        ></img>
                      </a>
                    </div>
                    <div class="h4 text-truncate">
                      <i style={{ color: "#553e8c" }}>{character.character}</i>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}
