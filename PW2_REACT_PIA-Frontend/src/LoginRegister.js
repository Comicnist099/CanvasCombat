import React, { useEffect, useState } from "react";
import $ from "jquery";
import Cookies from "universal-cookie";

export function LoginRegister(props) {

  const [{alt, src}, setImg] = useState({
    src: "https://imgs.search.brave.com/z0kVWQmD2JkuDVU4PAjx7wlxbASFLQX0M3rOKk01PpI/rs:fit:235:196:1/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vMjM2/eC8xNi8zNy9kMS8x/NjM3ZDE3N2ZjMzgz/OWJjNmJhMjM1NzRk/YWU1ODI2NS5qcGc_/bmlpPXQ",
    alt: 'Upload an Image'
});
  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
      });
    }
  };

  const [renderedResponse, setRenderedResponse] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  let profilePicData =null;

   let renderMultimedia = () => {
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
  } 

  const refresh = async (e) => {
    e.preventDefault();
    console.log(profilePicData);
  };

  const createAccountHandler = async (e) => {
    //Evento que sucede cuando presionas el boton de registrar
    e.preventDefault();
    console.log("hola");
    const name = $("#UsernameRegister").val();
    const nickName = $("#NicknameRegister").val();
    const email = $("#EmailRegister").val();
    const pass = $("#passwordRegister").val();
    const passV = $("#passwordRegisterV").val();

    const file = $("#profilePic")[0].files[0];
    const reader = new FileReader();

    if (file) {
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
        console.log(profilePic);

        let d = Date(Date.now());
        let a = d.toString();
        const creationDate = a.substr(4, 20);
        console.log(creationDate);
        const body = {
          //Agrega todos los datos en conjunto para así poder subirlo a mongo
          isActive: true,
          nameUser: name,
          nickname: nickName,
          email: email,
          password: pass,
          creationDate: creationDate,
          team: " ",
          facebook: " ",
          instagram: " ",
          extra: " ",
          image: profilePic,
          points: 100,
          typeUser: true,
          ban: false,
          achievements1: false,
          achievements2: false,
          achievements3: false,
          achievements4: false,
          achievements5: false,
          achievements6: false,
          achievements7: false,
          achievements8: false,
          achievements9: false,
          achievements10: false,
          achievements11: false,
        };
        /*
      const validName = /^[a-zA-Z ]{1,}$/;
      const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      const validPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (name === "" || email === "" || pass === "" || passV === "") {
        setError("Llene los campos vacios.");
      } else {
        setError("");
      }
  */

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
    }
    console.log(file);
  };

  /*
    const getResponse = async () => {
        const response = await fetch("/users/63683020d83fd036d7091641");
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
    
        return body;
      };
    
   

  useEffect(() => {
    getResponse().then((res) => {
      const someData = res;
      setRenderedResponse(someData);
    });
  }, []);
  
*/
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
                <div style={{ textalign: "center", marginbottom: "46px" }}>
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
                    &nbsp;CANVAS COMBAT&nbsp;
                  </a>
                </div>

                <form>
                  <div className="form-group mb-3">
                    <label
                      className="form-label text-secondary"
                      style={{ color: "rgb(255,255,255)!important" }}
                    >
                      Correo
                    </label>
                    <input
                      //onInput="this.value = this.value.toUpperCase()"
                      id="phpEmailLogin"
                      name="phpEmailLogin"
                      className="form-control"
                      type="text"
                      required
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
                      id="phpPasswordLogin"
                      name="phpPasswordLogin"
                      className="form-control"
                      type="password"
                      required
                      placeholder="Contraseña"
                    ></input>
                  </div>

                  <button
                    id="logInButton"
                    className="btn btn-info mt-2"
                    type="button"
                    onClick="loginFunction($('#phpEmailLogin').val(), $('#phpPasswordLogin').val());"
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
                <div style={{ textalign: "center", marginbottom: "46px" }}>
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
                    &nbsp;CANVAS COMBAT&nbsp;
                  </a>
                </div>
                <div className="text-center"></div>
                <form className="user" onSubmit={refresh}>
                  <button
                    className="btn btn-info mt-2 d-block btn-user w-100"
                    id="submitBtn"
                    type="submit"
                    //onClick="emailDuplicateValidation($('#phpEmailRegister').val());"
                  >
                    Registrar Cuenta
                  </button>
                </form>
                <img src={src} alt={alt} className="form-img__img-preview"/>
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
                      required
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
                      required
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
                      required
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
                        required
                        name="phpPasswordRegister"
                      ></input>
                    </div>
                    <div className="col-sm-6">
                      <input
                        className="form-control form-control-user"
                        type="password"
                        id="passwordRegisterV"
                        placeholder="Repetir Contraseña"
                        required
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

                  <input
                    id="profilePic"
                    name="profilePic "
                    type="file"
                    accept=".jpeg, .jpg, .png, .bmp"
                    onChange={handleImg}
                  />

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
