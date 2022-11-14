import React, { useEffect, useState } from "react";
import $ from "jquery";

export function SubirPersonaje() {
  let characterPicData = null;

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
    console.log(characterPicData);
  };

  const createCharacterHandler = async (e) => {
    //Evento que sucede cuando presionas el boton de registrar
    e.preventDefault();
    console.log("hola");
    const title = $("#nameCharacter").val();
    const descripcion = $("#descripcionCharacter").val();

    const file = $("#characterPic")[0].files[0];
    const reader = new FileReader();

    if (file) {
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
        console.log(characterPic);

        let d = Date(Date.now());
        let a = d.toString();
        const creationDate = a.substr(4, 20);
        console.log(creationDate);

        const body = {
          //Agrega todos los datos en conjunto para así poder subirlo a mongo

          isActive: true,
          character: " ",
          title: title,
          descripcion: descripcion,
          owner: "owner",
          cartoonist: "owner",
          creationDate: creationDate,
          team: " ",
          body: 0,
          lineart: 0,
          detail: 0,
          background: 0,
          image: characterPic,
          points: 0
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
            <h1 style={{ color: "white" }}>NEW CHARACTER</h1>
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
            onSubmit={createCharacterHandler}
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
    </>
  );
}
