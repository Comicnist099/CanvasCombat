import React, { useEffect, useState } from "react";
import $ from "jquery";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

export function LoginRegister(props) {
  let profilePicData = null;
  const navigate = useNavigate();

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // ////////////////////////////////////////////////
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
  // ///////////////////HOOK//////////////////////////////////

  const [renderedResponse, setRenderedResponse] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const [image, setImage] = useState(null);
  const [errorA, setErrora] = useState("");
  const [result, setResult] = useState(null);
  // //////////////////////////////////////////////////////

  // ///////////////CREAR USUARIO/////////////////////////
  const createAccountHandler = async (e) => {
    // Evento que sucede cuando presionas el boton de registrar
    e.preventDefault();
    console.log("hola");
    const name = $("#UsernameRegister").val();
    const nickName = $("#NicknameRegister").val();
    const email = $("#EmailRegister").val();
    const pass = $("#passwordRegister").val();
    const passV = $("#passwordRegisterV").val();

    const validName = /^[a-zA-Z ]{1,}$/;
    const validEmail = /^[^\s@]+@[^\s@]+$/;
    const validPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (
      name === "" ||
      nickName === "" ||
      email === "" ||
      pass === "" ||
      passV === ""
    ) {
      setErrora("Llene los campos vacios.");
    } else if (pass !== passV) {
      setErrora("Las contraseñas deben coincidir");
    } else if (pass.length < 7) {
      setErrora("La contraseña debe tener más de 6 caracteres");
    } else if (!validEmail.test(email)) {
      setErrora("Introduzca un email valido.");
    } else if (!validPassword.test(pass)) {
      setErrora(
        "La contraseña debe tener mínimo letra mayuscula, una letra minuscula, un digito, un caracter especial y debe de contar con 8 o más caracteres"
      );
    } else if (!validName.test(name)) {
      setErrora("El nombre no puede tener numeros ni caracteres especiales");
    } else {
      const file = $("#profilePic")[0].files[0];
      console.log(file);
      const reader = new FileReader();
      let TeamChoose = getRandomIntInclusive(0, 1);
      let TeamChooseString = TeamChoose.toString();

      if (file) {
        setErrora("");
        reader.addEventListener("load", async function readFile(event) {
          const nameparts = file.name.split(".");
          const filename = nameparts[0];
          const mime = nameparts[1];
          profilePicData = event.target.result;

          profilePicData = profilePicData.split("base64")[1];
          const profilePic = {
            name: filename,
            extention: mime,
            path: profilePicData,
          };

          let d = Date(Date.now());
          let a = d.toString();
          const creationDate = a.substr(4, 20);

          const body = {
            // Agrega todos los datos en conjunto para así poder subirlo a mongo
            isActive: true,
            nameUser: name,
            nickname: nickName,
            email: email,
            password: pass,
            creationDate: creationDate,
            team: TeamChooseString,
            facebook: " ",
            instagram: " ",
            extra: " ",
            image: profilePic,
            points: 0,
            typeUser: true,
            ban: false,
            achievements1: true,
            achievements2: false,
            achievements3: false,
            achievements4: false,
          };

          const response = await fetch(`http://localhost:5000/users`, {
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
        swal({
          title: "FELICIDADES",
          text: "¡Creaste tu primera cuenta!",
          icon: "success",
          buttons: "Si",
        }).then((respuesta) => {
          if (respuesta) {
            window.location.assign("/LoginRegister");
          }
        });
      } else {
        setErrora("Coloque Una imagen");
      }
      console.log(file);
    }
  };

  const loginAccountHandler = async (e) => {
    e.preventDefault();
    const email = $("#EmailLogin").val();
    const pass = $("#PasswordLogin").val();

    const response = await fetch(
      `http://localhost:5000/users/Login?size=10&e=${email}&p=${pass}`
    );
    const respJson = await response.json();

    // Se encontro o no se encontro//
    if (respJson.error == " ") {
      const cookiesNew = new Cookies();
      cookiesNew.set("idUser", respJson.users[0]._id, { path: "/" });
      const hola = cookiesNew.get("idUser");
      console.log(hola);

      window.location.assign("/Profile?idUser=" + respJson.users[0]._id);
    } else {
      console.log("a");
    }
  };

  /* 
  const getResponse = async () => {
    const response = await fetch("/users/63700441b84f6d34b8fbc5c5");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
  };

  useEffect(() => {
    getResponse().then((res) => {
      const someData = res;
      setRenderedResponse(someData);
    });
  }, []); */

  /*    let renderMultimedia = () => {
    if (profilePicData) {
      return (
        <div>
          <img src={profilePicData} alt="profilePic" id="profile-pic" />
        </div>
      )
    } else{
      return(   
         <div>
        <img src={"https://imgs.search.brave.com/z0kVWQmD2JkuDVU4PAjx7wlxbASFLQX0M3rOKk01PpI/rs:fit:235:196:1/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vMjM2/eC8xNi8zNy9kMS8x/NjM3ZDE3N2ZjMzgz/OWJjNmJhMjM1NzRk/YWU1ODI2NS5qcGc_/bmlpPXQ"} alt="profilePic" id="profile-pic" />
       </div>)
    }
  }  */

  return (
    <>
      <div className="App">
        <div className="container-fluid">
          <div className="row mh-100vh">
            <div
              className="col-10 col-sm-8 col-md-6 col-lg-6 offset-1 offset-sm-2 offset-md-3 offset-lg-0 align-self-center d-lg-flex align-items-lg-center align-self-lg-stretch p-5 rounded rounded-lg-0 my-5 my-lg-0"
              id="login-block"
              style={{ background: "rgb(52,52,52)" }}
            >
              <div
                className="m-auto w-lg-75 w-xl-50"
                data-aos="fade-up"
                data-aos-delay="450"
                id="loginSection"
              >
                <div
                  style={{
                    textalign: "center",
                    marginbottom: "46px",
                  }}
                >
                  <a
                    className="navbar-brand"
                    href="index.php"
                    style={{
                      color: "rgb(255,255,255)",
                      fontweight: "bold",
                      letterspacing: "1px",
                      borderstyle: "double",
                    }}
                  >
                    &nbsp;ENTRA CANVAS COMBAT&nbsp;
                  </a>
                </div>

                <form form className="user" onSubmit={loginAccountHandler}>
                  <div className="form-group mb-3">
                    <label
                      className="form-label text-secondary"
                      style={{ color: "rgb(255,255,255)!important" }}
                    >
                      Correo
                    </label>
                    <input //onInput="this.value = this.value.toUpperCase()"
                      id="EmailLogin"
                      name="phpEmailLogin"
                      className="form-control"
                      type="text"
                      //inputMode="email"
                      placeholder="Correo"
                    ></input>
                  </div>
                  <div className="form-group mb-3">
                    <label
                      className="form-label text-secondary"
                      style={{ color: "rgb(255,255,255)!important" }}
                    >
                      Contraseña
                    </label>
                    <input
                      id="PasswordLogin"
                      name="phpPasswordLogin"
                      className="form-control"
                      type="password"
                      placeholder="Contraseña"
                    ></input>
                  </div>

                  <button
                    className="btn btn-info mt-2"
                    id="logInButton"
                    type="submit"
                  >
                    Ingresar
                  </button>
                </form>

                <p className="mt-3 mb-0" onClick={() => hideLogin()}>
                  <a className="text-info small" href="#">
                    ¿Nuevo aqui? Registrate
                  </a>
                </p>
              </div>

              <div
                data-aos="fade-up"
                data-aos-delay="450"
                className="p-5"
                id="registerSection"
              >
                <div
                  style={{
                    textalign: "center",
                    marginbottom: "46px",
                  }}
                >
                  <a
                    className="navbar-brand"
                    href="index.php"
                    style={{
                      color: "rgb(255,255,255)",
                      fontweight: "bold",
                      letterspacing: "1px",
                      borderstyle: "double",
                    }}
                  >
                    &nbsp;REGISTRATE EN CANVAS COMBAT&nbsp;
                  </a>
                </div>
                <div className="text-center"></div>

                <form className="user" onSubmit={createAccountHandler}>
                  <label
                    className="form-label text-secondary"
                    style={{ color: "rgb(255,255,255)!important" }}
                  >
                    Nombre
                  </label>
                  <div className="mb-3">
                    <input
                      className="form-control form-control-user"
                      type="text"
                      placeholder="Nombre"
                      //onInput="this.value = this.value.toUpperCase()"
                      name="UsernameRegister"
                      id="UsernameRegister"
                    ></input>
                  </div>
                  <label
                    className="form-label text-secondary"
                    style={{ color: "rgb(255,255,255)!important" }}
                  >
                    Nickname
                  </label>
                  <div className="mb-3">
                    <input
                      className="form-control form-control-user"
                      type="text"
                      placeholder="NickName"
                      //onInput="this.value = this.value.toUpperCase()"
                      name="NicknameRegister"
                      id="NicknameRegister"
                    ></input>
                  </div>
                  <label
                    className="form-label text-secondary"
                    style={{ color: "rgb(255,255,255)!important" }}
                  >
                    Correo
                  </label>
                  <div className="mb-3">
                    <input
                      className="form-control form-control-user"
                      type="text"
                      id="EmailRegister"
                      //onInput="this.value = this.value.toUpperCase()"
                      placeholder="Correo"
                      name="phpEmailRegister"
                      //inputMode="email"
                    ></input>
                  </div>

                  <div className="row mb-3">
                    <label
                      className="form-label text-secondary"
                      style={{ color: "rgb(255,255,255)!important" }}
                    >
                      Repetir Contraseña
                    </label>
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input
                        className="form-control form-control-user"
                        type="password"
                        id="passwordRegister"
                        placeholder="Contraseña"
                        name="phpPasswordRegister"
                      ></input>
                    </div>
                    <div className="col-sm-6">
                      <input
                        className="form-control form-control-user"
                        type="password"
                        id="passwordRegisterV"
                        placeholder="Repetir Contraseña"
                        name="phpPasswordRegisterRepeat"
                      ></input>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      className="form-label text-secondary"
                      style={{ color: "rgb(255,255,255)!important" }}
                    ></label>
                  </div>

                  <div className="row mb-3">
                    <p
                      id="emailErrorMsg"
                      className="text-danger"
                      style={{ display: "none" }}
                    >
                      Paragraph
                    </p>
                    <p
                      id="passwordErrorMsg"
                      className="text-danger"
                      style={{ display: "none" }}
                    >
                      Paragraph
                    </p>
                  </div>
                  <img
                    height="200"
                    width="200"
                    src={src}
                    alt={alt}
                    className="form-img__img-preview"
                  />
                  <input
                    id="profilePic"
                    name="profilePic "
                    type="file"
                    accept=".jpeg, .jpg, .png, .bmp"
                    onChange={handleImg}
                  />
                  <h3 style={{ color: "red" }}>{errorA}</h3>
                  <button
                    className="btn btn-info mt-2 d-block btn-user w-100"
                    id="submitBtn"
                    type="submit"
                    //onClick="emailDuplicateValidation($('#phpEmailRegister').val());"
                  >
                    Registrar Cuenta
                  </button>
                  <hr></hr>
                </form>

                <p className="mt-3 mb-0" onClick={() => showLogin()}>
                  <a className="text-info small" href="#">
                    ¿Ya tienes cuenta? ¡Ingresa!
                  </a>
                </p>
              </div>
            </div>
            <div
              className="col-lg-6 d-flex align-items-end"
              data-aos="fade-up"
              data-aos-duration="450"
              id="bg-block"
              style={{
                background:
                  "url(assets/img/wallpaperbetter.com_1920x10802.jpg) center center / cover",
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
export default LoginRegister;
