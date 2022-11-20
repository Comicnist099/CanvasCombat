import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

export function SubirPersonaje() {
  const [friendsUser, setfriendsUser] = useState();
  //const [message, setMessage] = useState("");
  const [FinishProcess, setFinishProcess] = useState();
  const [FinishProcess2, setFinishProcess2] = useState();
  const [errorA, setErrora] = useState("");
  const cookiesNew = new Cookies();
  const idUser = cookiesNew.get("idUser");
  const navigate = useNavigate();

  // ////////////////////////////////////////////////
  let characterPicData = null;
  let characterPicData2 = null;

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

  const [{ alt2, src2 }, setImg2] = useState({
    src2: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
    alt2: "Upload an Image",
  });
  const handleImg2 = (e) => {
    if (e.target.files[0]) {
      setImg2({
        src2: URL.createObjectURL(e.target.files[0]),
        alt2: e.target.files[0].name,
      });
    }
  };

  const refresh = async (e) => {
    e.preventDefault();
    console.log(characterPicData);
  };

  let getResponse = async () => {
    const response = await fetch(`/users/${idUser}`);
    const body = await response.json();
    setfriendsUser(body);

    if (response.status !== 200) throw Error(body.message);
  };

  const createCharacterHandler = async (e) => {
    // Evento que sucede cuando presionas el boton de registrar
    e.preventDefault();

    swal({
      title: "AVISO",
      text: "La imagen y la miniatura del personaje no podrán ser eliminadas ni editadas en cuanto sean subidas a la página, presiona OK para estar de acuerdo.",
      icon: "warning",
      buttons: ["Cancelar", "OK"]
    }).then((respuesta) => {
      if (respuesta) {
        console.log("hola");
        const title = $("#nameCharacter").val();
        const descripcion = $("#descripcionCharacter").val();

        if (title === "" || descripcion === "") {
          setErrora("Llene los campos vacios.");
        } else if (title.length < 5 || title.length > 25) {
          setErrora(
            "El titulo debe tener mas de 5 caracteres y menos de 25 caracteres"
          );
        } else if (descripcion.length < 5 || descripcion.length > 30) {
          setErrora("La descripción debe tener mas de 5 caracteres");
        } else {
          const file = $("#characterPic")[0].files[0];
          const reader = new FileReader();

          const file2 = $("#characterPic2")[0].files[0];
          const reader2 = new FileReader();
          setFinishProcess(false);
          setFinishProcess2(false);

          if (file && file2) {
            setErrora("");
            reader.addEventListener("load", async function readFile(event) {
              const nameparts = file.name.split(".");
              const filename = nameparts[0];
              const mime = nameparts[1];
              characterPicData = event.target.result;

              characterPicData = characterPicData.split("base64")[1];
              const characterPic = {
                name: filename,
                extention: mime,
                path: characterPicData,
              };

              setFinishProcess(true);
              reader2.addEventListener("load", async function readFile(event2) {
                const nameparts = file2.name.split(".");
                const filename = nameparts[0];
                const mime = nameparts[1];
                characterPicData2 = event2.target.result;

                characterPicData2 = characterPicData2.split("base64")[1];
                const characterPic2 = {
                  name: filename,
                  extention: mime,
                  path: characterPicData2,
                };

                /////////PATCH de usuario
                const bodyUser = {
                  achievements2: true,
                };
                const response2 = await fetch(
                  `http://localhost:5000/users/${idUser}`,
                  {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bodyUser),
                  }
                );
                const respJson2 = await response2.json();
                console.log(respJson2);
                if (respJson2.error == "Bad Request") {
                  return console.log("NO JALO");
                }

                //////////Subida de Personaje
                let d = Date(Date.now());
                let a = d.toString();
                const creationDate = a.substr(4, 20);
                console.log(characterPic2);
                console.log(characterPic);
                const body = {
                  // Agrega todos los datos en conjunto para así poder subirlo a mongo
                  isActive: true,
                  character: title,
                  title: title,
                  descripcion: descripcion,
                  owner: idUser,
                  cartoonist: idUser,
                  creationDate: creationDate,
                  team: friendsUser.team,
                  body: " ",
                  lineart: " ",
                  detail: " ",
                  background: " ",
                  image: characterPic,
                  imageProfile: characterPic2,
                  points: 0,
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
                } else {
                  swal({
                    text: "El personaje se ha creado con éxito.",
                    icon: "success",
                  });
                  navigate("/MisPersonajes?idUser=" + idUser);
                }
              });
            });

            reader.readAsDataURL(file);
            reader2.readAsDataURL(file2);
          }
        }
      }
    });
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
            <h1 style={{ color: "white" }}>NEW CHARACTER</h1>
          </div>
        </div>
      </div>

      <div
        className="row w-100"
        data-aos="fade-up"
        id="profile"
        style={{
          marginTop: "150px",
          marginBottom: "150px",
        }}
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
            name="formCharacter"
            id="formCharacter"
            onSubmit={createCharacterHandler}
            style={{
              marginBottom: "50px",
              marginTop: "50px",
            }}
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
                <h2>Miniatura del personaje</h2>
                <img
                  height="200"
                  width="200"
                  src={src2}
                  alt={alt2}
                  className="form-img__img-preview"
                />

                <input
                  id="characterPic2"
                  name="characterPic"
                  type="file"
                  accept=".jpeg, .jpg, .png, .bmp"
                  onChange={handleImg2}
                />
                <br></br>
                <br></br>
                <h2>Personaje completo</h2>
                <img
                  style={{
                    width: 400,
                    maxHeight: 2400,
                  }}
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
                    placeholder="Descripcion"
                  ></input>

                  <div className="row" style={{ margin: "30px" }}></div>
                  <p style={{ color: "red" }}>{errorA}</p>
                  <button
                    id="logInButton"
                    className="btn btn-info mt-2"
                    type="submit"
                  >
                    AÑADIR
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
