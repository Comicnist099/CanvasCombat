import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import $, { data } from "jquery";

export function SubirAtaque() {

  const cookiesNew = new Cookies();
  const idUser = cookiesNew.get("idUser");

  const [valBody, setValBody] = useState("");
  const [valLineart, setValLineart] = useState("");
  const [valDetail, setValDetail] = useState("");
  const [valBackground, setValBackground] = useState("");
  let puntuacion = 0;

  //cada cb suma el total de 100, por lo que body vale 25, lineart 25 y asi

  const body = ["Icon", "Headshot", "Midbody", "Fullbody"];
  //icon: 3, Headshot: 8, Midbody: 15, Fullbody: 25

  const lineart = ["Sketch", "Clean Lineart", "Color Lineart", "Lineless"];
  //Sketch: 3, Clean Lineart: 8, Color Lineart: 15, Lineless: 25

  const detail = ["No color", "Base Color", "Simple Shading", "Full Render"];
  //No color: 3, Base Color: 8, Simple Shading: 15, Full Render: 25

  const background = [
    "No background",
    "Base Color",
    "Simple Background",
    "Full Render Background",
  ];
  //No background: 3, Base Color: 8, Simple Background: 15, Full Render Background: 25

  let attackPicData = null;

  //////////////////////////////////////////////////
  const [{ alt, src }, setImg] = useState({
    src: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
    alt: "Upload an Image",
  });
  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
      });
    }
  };

  const refresh = async (e) => {
    e.preventDefault();
    console.log(attackPicData);
  };

  const points = (nombre) => {

    if (nombre === body[0] || nombre === lineart[0] || nombre === detail[0] || nombre === background[0])
      puntuacion = puntuacion + 3;
    else if (nombre === body[1] || nombre === lineart[1] || nombre === detail[1] || nombre === background[1])
      puntuacion = puntuacion + 8;
    else if (nombre === body[2] || nombre === lineart[2] || nombre === detail[2] || nombre === background[2])
      puntuacion = puntuacion + 15;
    else if (nombre === body[3] || nombre === lineart[3] || nombre === detail[3] || nombre === background[3])
      puntuacion = puntuacion + 25;

  };

  const attackCharacterHandler = async (e) => {
    //Evento que sucede cuando presionas el boton de registrar
    e.preventDefault();
    console.log("hola");
    const title = $("#nameCharacter").val();
    const descripcion = $("#descripcionCharacter").val();
    const file = $("#characterPic")[0].files[0];
    const reader = new FileReader();
    const vBody = $("#cbBody").val();
    const vLineart = $("#cbLineart").val();
    const vDetail = $("#cbDetail").val();
    const vBackground = $("#cbBackground").val();

    points(vBody);
    points(vLineart);
    points(vDetail);
    points(vBackground);

    if (file) {
      reader.addEventListener("load", async function readFile(event) {
        const nameparts = file.name.split(".");
        const filename = nameparts[0];
        const mime = nameparts[1];
        attackPicData = event.target.result;

        attackPicData = attackPicData.split("base64")[1];
        const characterPic = {
          name: filename,
          extention: mime,
          path: attackPicData,
        };

        let d = Date(Date.now());
        let a = d.toString();
        const creationDate = a.substr(4, 20);

        const body = {
          //Agrega todos los datos en conjunto para así poder subirlo a mongo

          isActive: true,
          character: " ",
          title: title,
          descripcion: descripcion,
          owner: "owner",
          cartoonist: idUser,
          creationDate: creationDate,
          team: " ",
          body: vBody,
          lineart: vLineart,
          detail: vDetail,
          background: vBackground,
          image: characterPic,
          points: puntuacion,
        };

        const response = await fetch(`http://localhost:5000/draw`, {
          method: "POST",
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
      });
      reader.readAsDataURL(file);
    }
    console.log(file);
  };

  return (
    <>
      <div
        className="col-11 center"
        style={{ marginTop: "30px", marginLeft: "50px" }}
      >
        <div className="row">
          <div className="one">
            <h1 style={{ color: "white" }}>SUBIR ATAQUE</h1>
          </div>
        </div>
      </div>

      <div
        className="row w-100"
        data-aos="fade-up"
        id="profile"
        style={{ marginTop: "150px", marginBottom: "150px" }}
      >
        <div
          className="m-auto w-25"
          data-aos="fade-up"
          data-aos-delay="450"
          id="loginSection"
          style={{ background: "rgb(255, 255, 255)" }}
        >
          <form
            className="character"
            onSubmit={attackCharacterHandler}
            style={{ marginBottom: "50px", marginTop: "50px" }}
          >
            <div
              className="row center"
              style={{
                background: "rgb(120, 120, 120)",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <div className="col center">
                <div className="row" style={{ margin: "15px" }}></div>

                <img
                  height="200"
                  width="200"
                  src={src}
                  alt={alt}
                  className="form-img__img-preview"
                />
                <br></br>
                <input
                  id="characterPic"
                  name="characterPic"
                  type="file"
                  accept=".jpeg, .jpg, .png, .bmp"
                  onChange={handleImg}
                />
              </div>
              <br></br>
            </div>

            <div className="row" style={{ margin: "30px" }}></div>
            <div className="form-group mb-3">
              <div className="row center">
                <div className="col center">
                  <label
                    className="form-label text-secondary"
                    style={{ color: "rgb(255,255,255)!important" }}
                  >
                    Nombre
                  </label>
                  <input
                    oninput="this.value = this.value.toUpperCase()"
                    id="nameCharacter"
                    name="nameCharacter"
                    className="form-control"
                    type="text"
                    required
                    placeholder="Nombre"
                  ></input>
                </div>
              </div>
            </div>

            <div className="row" style={{ margin: "15px" }}></div>

            <div className="form-group mb-3">
              <div className="row center">
                <div className="col center">
                  <label
                    className="form-label text-secondary"
                    style={{ color: "rgb(255,255,255)!important" }}
                  >
                    Descripcion
                  </label>
                  <input
                    id="descripcionCharacter"
                    name="descripcionCharacter"
                    className="form-control"
                    type="text"
                    required
                    placeholder="Descripcion"
                  ></input>
                  <br></br>
                  <label
                    className="form-label text-secondary"
                    style={{ color: "rgb(255,255,255)!important" }}
                  >
                    Rating
                  </label>
                  <br></br>
                  <br></br>
                  <br></br>
                  <p>Detalles del cuerpo</p>
                  <select
                    value={valBody}
                    id="cbBody"
                    name="cbBody"
                    onChange={(e) => setValBody(e.target.value)}
                    class="form-select"
                    aria-label="Default select example"
                  >
                    {body.map((opt) => (
                      <option value={opt}>{opt}</option>
                    ))}
                  </select>

                  <p>Detalles del lineart</p>
                  <select
                    value={valLineart}
                    id="cbLineart"
                    name="cbLineart"
                    onChange={(e) => setValLineart(e.target.value)}
                    class="form-select"
                    aria-label="Default select example"
                  >
                    {lineart.map((opt) => (
                      <option value={opt}>{opt}</option>
                    ))}
                  </select>

                  <p>Detalles del Render</p>
                  <select
                    value={valDetail}
                    id="cbDetail"
                    name="cbDetail"
                    onChange={(e) => setValDetail(e.target.value)}
                    class="form-select"
                    aria-label="Default select example"
                  >
                    {detail.map((opt) => (
                      <option value={opt}>{opt}</option>
                    ))}
                  </select>

                  <p>Detalles del background</p>

                  <select
                    value={valBackground}
                    id="cbBackground"
                    name="cbBackground"
                    onChange={(e) => setValBackground(e.target.value)}
                    class="form-select"
                    aria-label="Default select example"
                  >
                    {background.map((opt) => (
                      <option value={opt}>{opt}</option>
                    ))}
                  </select>

                  <div className="row" style={{ margin: "30px" }}></div>
                  <button
                    id="logInButton"
                    className="btn btn-info mt-2"
                    type="submit"
                    //onclick="loginFunction($('#phpEmailLogin').val(), $('#phpPasswordLogin').val());"
                  >
                    AÑADIR
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* <div className="col" style={{ margin: "25px" }}>
        <div
          className="section w-10"
          data-aos="fade-up"
          id="profile"
          style={{ marginTop: "0px", marginBottom: "0px" }}
        >
          <div className="row">
            <div className="col">
              <section data-aos="fade-up" data-aos-duration="350" id="carousel">
                <div
                  className="carousel slide"
                  id="carousel-1"
                  data-bs-ride="carousel"
                  data-bs-interval="false"
                >
                  <div
                    className="carousel-inner"
                    style={{ height: "500px !important" }}
                  >
                    <div className="carousel-item">
                      <div
                        className="bg-light border rounded border-light pulse animated hero-photography carousel-hero jumbotron py-4 px-4"
                        style={{
                          background:
                            "url(https://preview.redd.it/s69fwwnmhit31.jpg?auto=webp&s=b43ab760fc87203756e992e1e5baa5f03485e9e6) center / cover repeat",
                        }}
                      >
                        <div class="row">
                          <div class="col-sm-6 text-center">
                            <img
                              style={{
                                maxHeight: "300px",
                                minHeight: "300px",
                                maxWidth: "300px",
                              }}
                              className="center img-fluid"
                              src="https://preview.redd.it/s69fwwnmhit31.jpg?auto=webp&s=b43ab760fc87203756e992e1e5baa5f03485e9e6"
                            ></img>
                          </div>
                          <div class="col-sm-6 text-center">
                            <h1 className="hero-title">PERSONAJE 1 MIO</h1>
                            <p className="hero-subtitle">
                              Ejemplo de Descripcion
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="carousel-item">
                      <div
                        className="bg-light border rounded border-light pulse animated hero-technology carousel-hero jumbotron py-4 px-4"
                        style={{
                          background:
                            "url(https://images.saatchiart.com/saatchi/897093/art/7711818/6779964-ZHQUIXKD-7.jpg) center / cover repeat",
                        }}
                      >
                        <div class="row">
                          <div class="col-sm-6 text-center">
                            <img
                              style={{
                                maxHeight: "300px",
                                minHeight: "300px",
                                maxWidth: "300px",
                              }}
                              className="center img-fluid"
                              src="https://images.saatchiart.com/saatchi/897093/art/7711818/6779964-ZHQUIXKD-7.jpg"
                            ></img>
                          </div>
                          <div class="col-sm-6 text-center">
                            <h1 className="hero-title">PERSONAJE 2 MIO</h1>
                            <p className="hero-subtitle">
                              Ejemplo de Descripcion
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="carousel-item active">
                      <div
                        className="bg-light border rounded border-light pulse animated hero-nature carousel-hero jumbotron py-4 px-4"
                        style={{
                          background:
                            "url(https://img5.goodfon.com/wallpaper/nbig/3/5c/warrior-wizard-magician-girl-armor-magic-cape-braid-heteroch.jpg) center / cover repeat",
                        }}
                      >
                        <div class="row">
                          <div class="col-sm-6 text-center">
                            <img
                              style={{ maxHeight: "300px", minHeight: "300px" }}
                              className="center img-fluid"
                              src="https://img5.goodfon.com/wallpaper/nbig/3/5c/warrior-wizard-magician-girl-armor-magic-cape-braid-heteroch.jpg"
                            ></img>
                          </div>
                          <div class="col-sm-6 text-center">
                            <h1 className="hero-title">PERSONAJE 3 MIO</h1>
                            <p className="hero-subtitle">
                              Ejemplo de Descripcion
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <a
                      className="carousel-control-prev"
                      href="#carousel-1"
                      role="button"
                      data-bs-slide="prev"
                    >
                      <span className="carousel-control-prev-icon"></span>
                      <span className="visually-hidden">Previous</span>
                    </a>
                    <a
                      className="carousel-control-next"
                      href="#carousel-1"
                      role="button"
                      data-bs-slide="next"
                    >
                      <span className="carousel-control-next-icon"></span>
                      <span className="visually-hidden">Next</span>
                    </a>
                  </div>

                  <ol className="carousel-indicators">
                    <li data-bs-target="#carousel-1" data-bs-slide-to="0"></li>
                    <li data-bs-target="#carousel-1" data-bs-slide-to="1"></li>
                    <li
                      data-bs-target="#carousel-1"
                      data-bs-slide-to="2"
                      className="active"
                    ></li>
                  </ol>
                </div>
              </section>
            </div>

            <div className="row" style={{ margin: "15px" }}></div>

            <div className="row center">
              <div className="col">
                <p>
                  <a
                    className="btn btn-secondary hero-button plat"
                    role="button"
                    href="register.php"
                  >
                    <div className="one">
                      <h1>FIGHT</h1>
                    </div>
                  </a>
                </p>
              </div>
            </div>
            <div className="row" style={{ margin: "15px" }}></div>

            <div className="col">
              <section
                data-aos="fade-up"
                data-aos-duration="350"
                id="carousel2"
              >
                <div
                  className="carousel slide"
                  id="carousel-2"
                  data-bs-ride="carousel"
                  data-bs-interval="false"
                >
                  <div
                    className="carousel-inner"
                    style={{ height: "500px !important" }}
                  >
                    <div className="carousel-item">
                      <div
                        className="bg-light border rounded border-light pulse animated hero-photography carousel-hero jumbotron px-4 py-5"
                        style={{
                          background:
                            "url(https://cdna.artstation.com/p/assets/images/images/029/950/462/large/g-i-i-h-encomenda-perso-bruxo.jpg?1599130890) center / cover repeat",
                        }}
                      >
                        <div class="row">
                          <div class="col-sm-6 text-center">
                            <img
                              style={{ maxHeight: "300px", minHeight: "300px" }}
                              className="center img-fluid"
                              src="https://img5.goodfon.com/wallpaper/nbig/3/5c/warrior-wizard-magician-girl-armor-magic-cape-braid-heteroch.jpg"
                            ></img>
                          </div>
                          <div class="col-sm-6 text-center">
                            <h1 className="hero-title">PERSONAJE 1 ENEMIGO</h1>
                            <p className="hero-subtitle">
                              Ejemplo de Descripcion
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div
                        className="bg-light border rounded border-light pulse animated hero-technology carousel-hero jumbotron py-4 px-4"
                        style={{
                          background:
                            "url(https://preview.redd.it/51v3q7lclse51.jpg?auto=webp&s=f386e6cf5c77dd9a7093411408cc08d9544205b6) center / cover repeat",
                        }}
                      >
                        <div class="row">
                          <div class="col-sm-6 text-center">
                            <img
                              style={{ maxHeight: "300px", minHeight: "300px" }}
                              className="center img-fluid"
                              src="https://preview.redd.it/51v3q7lclse51.jpg?auto=webp&s=f386e6cf5c77dd9a7093411408cc08d9544205b6"
                            ></img>
                          </div>
                          <div class="col-sm-6 text-center">
                            <h1 className="hero-title">PERSONAJE 2 ENEMIGO</h1>
                            <p className="hero-subtitle">
                              Ejemplo de Descripcion
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item active">
                      <div
                        className="bg-light border rounded border-light pulse animated hero-nature carousel-hero jumbotron py-4 px-4"
                        style={{
                          background:
                            "url(https://content.artofmanliness.com/uploads/2011/11/magician.jpg) center / cover repeat",
                        }}
                      >
                        <div class="row">
                          <div class="col-sm-6 text-center">
                            <img
                              style={{ maxHeight: "300px", minHeight: "300px" }}
                              className="center img-fluid"
                              src="https://content.artofmanliness.com/uploads/2011/11/magician.jpg"
                            ></img>
                          </div>
                          <div class="col-sm-6 text-center">
                            <h1 className="hero-title">PERSONAJE 3 ENEMIGO</h1>
                            <p className="hero-subtitle">
                              Ejemplo de Descripcion
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <a
                      className="carousel-control-prev"
                      href="#carousel-2"
                      role="button"
                      data-bs-slide="prev"
                    >
                      <span className="carousel-control-prev-icon"></span>
                      <span className="visually-hidden">Previous</span>
                    </a>
                    <a
                      className="carousel-control-next"
                      href="#carousel-2"
                      role="button"
                      data-bs-slide="next"
                    >
                      <span className="carousel-control-next-icon"></span>
                      <span className="visually-hidden">Next</span>
                    </a>
                  </div>
                  <ol className="carousel-indicators">
                    <li data-bs-target="#carousel-1" data-bs-slide-to="0"></li>
                    <li data-bs-target="#carousel-1" data-bs-slide-to="1"></li>
                    <li
                      data-bs-target="#carousel-1"
                      data-bs-slide-to="2"
                      className="active"
                    ></li>
                  </ol>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
