import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import $ from "jquery";

export function Profile(props) {
  /////////////IMAGEN////////////////
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

  const editMode = (e) => {
    setedit(true);
    console.log(edit);
  };

  const staticMode = (e) => {
    setedit(false);
    console.log(edit);
  };

  //////////////////////////////////

  ///////////hook///////////
  let [renderedResponsea, setRenderedResponsea] = useState({});
  let [edit, setedit] = useState(false);
  let [facebook, setFacebook] = useState("https://www.facebook.com");
  let [twitter, setTwitter] = useState("https://www.twitter.com");
  let [instagram, setInstagram] = useState("https://www.instagram.com");

  ////////////////////////
  const cookiesNew = new Cookies();
  const idUser = cookiesNew.get("idUser");
  //////////////////////////////////

  const getResponse = async () => {
    const response = await fetch(`/users/${idUser}`);
    const body = await response.json();

    if (body.isActive) {
      setRenderedResponsea(body);
      console.log(renderedResponsea);
      const face = facebook.substr(0, 24);
      const twit = twitter.substr(0, 23);
      const insta = instagram.substr(0, 25);

      let facebookBuffer = face + "/" + body.facebook;
      let twitterBuffer = twit + "/" + body.extra;
      let instagramBuffer = insta + "/" + body.instagram;

      setFacebook(facebookBuffer);
      setTwitter(twitterBuffer);
      setInstagram(instagramBuffer);
      console.log(facebookBuffer);
      console.log(twitterBuffer);
      console.log(instagramBuffer);
    }

    if (response.status !== 200) throw Error(body.message);
  };
  /////////////////Redes Sociales////////////////////

  useEffect(() => {
    getResponse();
  }, []);

  const renderMultimedia = (source) => {
    if (source) {
      return (
        <div
          className="container profile profile-view"
          data-aos="fade-up"
          id="profile"
          style={{ marginTop: "50px", background: "rgb(129, 129, 129)" }}
        >
          <div className="row" style={{ background: "rgba(255,255,255,0.37)" }}>
            <div className="col-md-4 content-right">
              <div className="avatar" style={{ marginTop: "21px" }}>
                <img
                  height="200"
                  width="200"
                  src={src}
                  alt={alt}
                  className="form-img__img-preview"
                />
                <input
                  className="form-control form-control"
                  id="profilePic"
                  name="profilePic "
                  type="file"
                  accept=".jpeg, .jpg, .png, .bmp"
                  onChange={handleImg}
                  style={{ marginTop: "24px" }}
                />
              </div>
            </div>

            <div className="col-md-8 ">
              <h1> USUARIO </h1>
              <hr></hr>

              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label">Nombre </label>
                    <input
                      placeholder={renderedResponsea.nameUser}
                      className="form-control"
                      type="text"
                      name="firstname"
                    ></input>
                  </div>
                </div>

                <div className="col-sm-12 col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label">Nickname </label>
                    <input
                      placeholder={renderedResponsea.nickname}
                      className="form-control"
                      type="text"
                      name="lastname"
                    ></input>
                  </div>
                </div>
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Email </label>
                <input
                  className="form-control"
                  type="email"
                  autocomplete="off"
                  required=""
                  placeholder={renderedResponsea.email}
                  name="email"
                ></input>
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Creación de cuenta </label>
                <input
                  className="form-control"
                  type="email"
                  autocomplete="off"
                  required=""
                  name="dateCreation"
                  value={renderedResponsea.creationDate}
                  disabled
                ></input>
              </div>

              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label">Password </label>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      autocomplete="off"
                      required=""
                      value="CONTRA"
                    ></input>
                  </div>
                </div>
              </div>

              <hr></hr>
              <h3>REDES SOCIALES</h3>

              <div className="form-group mb-3">
                <img
                  src="https://imgs.search.brave.com/ZySSH5qtW5EHOLa4lmjyf1dDLJSa877kRsg_GZwS3OQ/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9pMS53/cC5jb20vd3d3LmRw/YWJvZ2Fkb3MuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE2/LzA5L2ZhY2Vib29r/LWxvZ28tcG5nLXRy/YW5zcGFyZW50LWJh/Y2tncm91bmQucG5n/P2ZpdD0xNjAwJTJD/MTYwMCZzc2w9MQ"
                  alt=""
                  height="50"
                  width="50"
                />
                <input
                  //onInput="this.value = this.value.toUpperCase()"
                  id="PerfilFacebook"
                  name="PerfilFacebook"
                  type="text"
                  //inputMode="email"
                  placeholder={facebook.substr(24)}
                ></input>

                <br></br>
                <br></br>

                <img
                  src="https://imgs.search.brave.com/Dkgov-vCLYh5038LVyQlKsa9vRlx9oSDjXBlPxvmnso/rs:fit:1140:1145:1/g:ce/aHR0cHM6Ly9hbHVt/bmkudml1LmNhL3Np/dGVzL2RlZmF1bHQv/ZmlsZXMvc3R5bGVz/L21heF9zaXplX2Ny/b3BwZWQvcHVibGlj/L3R3aXR0ZXItc3F1/YXJlZC5wbmc_aXRv/az16UGFNbUFjZCZj/PWY5MzQxNWRiMjkx/NmUwMTBjZDJjZDA4/ZDBkMzRiNjI2"
                  alt=""
                  height="50"
                  width="50"
                />
                <input
                  //onInput="this.value = this.value.toUpperCase()"
                  id="PerfilFacebook"
                  name="PerfilFacebook"
                  type="text"
                  //inputMode="email"
                  placeholder={twitter.substr(23)}
                ></input>
                <br></br>
                <br></br>

                <img
                  src="https://pic.onlinewebfonts.com/svg/img_525307.png"
                  alt=""
                  height="50"
                  width="50"
                />
                <input
                  //onInput="this.value = this.value.toUpperCase()"
                  id="PerfilFacebook"
                  name="PerfilFacebook"
                  type="text"
                  //inputMode="email"
                  placeholder={instagram.substr(25)}
                ></input>
              </div>
              <div className="row">
                <div
                  className="col-md-12 content-right"
                  style={{ marginBottom: "19px" }}
                >
                  <input
                    className="btn btn-success"
                    id="editButton"
                    name="editButton "
                    type="button"
                    value="Aceptar Cambios"
                    onClick={staticMode}
                  />
                  <button
                    className="btn btn-danger"
                    type="button"
                    onclick="logOut()"
                  >
                    LOG OUT{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="container profile profile-view"
          data-aos="fade-up"
          id="profile"
          style={{ marginTop: "50px", background: "rgb(129, 129, 129)" }}
        >
          <div className="row" style={{ background: "rgba(255,255,255,0.37)" }}>
            <div className="col-md-4 content-right">
              <div
                className="avatar"
                style={{
                  marginTop: "21px",
                  marginRight: "120px",
                  width: "200px",
                }}
              >
                <img
                  height="200"
                  width="200"
                  src={src}
                  alt={alt}
                  className="form-img__img-preview"
                />
              </div>
            </div>

            <div className="col-md-8 ">
              <h1> USUARIO </h1>
              <hr></hr>

              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label">Nombre </label>
                    <input
                      className="form-control"
                      type="text"
                      name="firstname"
                      value={renderedResponsea.nameUser}
                      disabled
                    ></input>
                  </div>
                </div>

                <div className="col-sm-12 col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label">Nickname </label>
                    <input
                      className="form-control"
                      type="text"
                      name="lastname"
                      value={renderedResponsea.nickname}
                      disabled
                    ></input>
                  </div>
                </div>
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Email </label>
                <input
                  className="form-control"
                  type="email"
                  autocomplete="off"
                  required=""
                  name="email"
                  disabled
                  value={renderedResponsea.password}
                ></input>
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Creación de cuenta </label>
                <input
                  className="form-control"
                  type="email"
                  autocomplete="off"
                  required=""
                  name="dateCreation"
                  disabled
                  value={renderedResponsea.creationDate}
                ></input>
              </div>

              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label">Password </label>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      autocomplete="off"
                      required=""
                      value="CONTRA"
                      disabled
                    ></input>
                  </div>
                </div>
              </div>

              <hr></hr>
              <h3>REDES SOCIALES</h3>

              <a title="Facebook" href={facebook} target="_blank">
                <img
                  src="https://imgs.search.brave.com/ZySSH5qtW5EHOLa4lmjyf1dDLJSa877kRsg_GZwS3OQ/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9pMS53/cC5jb20vd3d3LmRw/YWJvZ2Fkb3MuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE2/LzA5L2ZhY2Vib29r/LWxvZ28tcG5nLXRy/YW5zcGFyZW50LWJh/Y2tncm91bmQucG5n/P2ZpdD0xNjAwJTJD/MTYwMCZzc2w9MQ"
                  alt=""
                  height="50"
                  width="50"
                />
              </a>

              <a title="Twitter" href={twitter} target="_blank">
                <img
                  src="https://imgs.search.brave.com/Dkgov-vCLYh5038LVyQlKsa9vRlx9oSDjXBlPxvmnso/rs:fit:1140:1145:1/g:ce/aHR0cHM6Ly9hbHVt/bmkudml1LmNhL3Np/dGVzL2RlZmF1bHQv/ZmlsZXMvc3R5bGVz/L21heF9zaXplX2Ny/b3BwZWQvcHVibGlj/L3R3aXR0ZXItc3F1/YXJlZC5wbmc_aXRv/az16UGFNbUFjZCZj/PWY5MzQxNWRiMjkx/NmUwMTBjZDJjZDA4/ZDBkMzRiNjI2"
                  alt=""
                  height="50"
                  width="50"
                />
              </a>

              <a title="SitioWeb" href={instagram} target="_blank">
                <img
                  src="https://pic.onlinewebfonts.com/svg/img_525307.png"
                  alt=""
                  height="50"
                  width="50"
                />
              </a>

              <div className="row">
                <div
                  className="col-md-12 content-right"
                  style={{ marginBottom: "19px" }}
                >
                  <input
                    className="btn btn-danger"
                    id="editButton"
                    name="editButton "
                    type="button"
                    value="Editar Información"
                    onClick={editMode}
                  />
                  <button
                    className="btn btn-danger"
                    type="button"
                    onclick="logOut()"
                  >
                    LOG OUT{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-dark navbar-expand-md bg-dark py-3"
        style={{ background: "#696969 !important" }}
      >
        <div className="container">
          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navcol-6"
          >
            <span className="visually-hidden">Toggle navigation</span>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            id="navcol-6"
            className="collapse navbar-collapse flex-grow-0 order-md-first"
          >
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="lists"
                  href="Logros"
                  style={{ textSlign: "center" }}
                >
                  LOGROS
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="orders"
                  href="SubirPersonaje"
                  style={{ textAlign: "center" }}
                >
                  SUBIR PERSONAJE
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="myProducts"
                  href="SubirAtaque"
                  style={{ textAlign: "center" }}
                >
                  SUBIR ATAQUE
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="myProducts"
                  href="MisPersonajes"
                  style={{ textAlign: "center" }}
                >
                  MIS PERSONAJES
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <form>{renderMultimedia(edit)}</form>
    </>
  );
}
export default Profile;
