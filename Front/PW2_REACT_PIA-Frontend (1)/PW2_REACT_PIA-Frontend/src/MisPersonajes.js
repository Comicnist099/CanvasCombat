import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import $, { get } from "jquery";

export function MisPersonajes() {
  const cookiesNew = new Cookies();
  const idUser = cookiesNew.get("idUser");

  let [renderedResponsea, setRenderedResponsea] = useState({});

  const getResponse = async () => {
    const response = await fetch(`/draw`);
    const body = await response.json();

    setRenderedResponsea(body);
    console.log(body);

    if (response.status !== 200) throw Error(body.message);
  };

  useEffect(() => {
    getResponse();
  }, []);

  for (let i = 0; i > renderedResponsea.length; i++) {


  }

  
  return (
    <>
      <div
        className="col-11 center"
        style={{ marginTop: "30px", marginLeft: "50px" }}
      >
        <div className="row">
          <div className="one">
            <h1 style={{ color: "white" }}>MIS PERSONAJES</h1>
          </div>
        </div>
      </div>

      <div
        className="container profile profile-view"
        data-aos="fade-up"
        id="profile"
        style={{ marginTop: "50px", background: "rgb(129, 129, 129)" }}
      >
        <div className="row" style={{ background: "rgba(255,255,255,0.37)" }}>
          <div className="col-md-4 center">
            <div className="p-5">
              <img
                className="img-fluid"
                src="https://www.spellbrand.com/wp-content/uploads/2018/08/character-design-1-49.jpg"
              ></img>
            </div>
          </div>

          <div className="col-md-8 center">
            <h1> NOMBRE DE PERSONAJE </h1>
            <hr></hr>

            <form>
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label">Descripcion </label>
                    <input
                      className="form-control"
                      type="text"
                      name="firstname"
                      value="LA DESCRIPCION"
                      disabled
                    ></input>
                  </div>
                </div>
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
