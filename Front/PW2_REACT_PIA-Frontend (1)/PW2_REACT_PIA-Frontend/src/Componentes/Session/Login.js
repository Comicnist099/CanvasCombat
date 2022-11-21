import $ from "jquery";
import Cookies from "universal-cookie";
import Register from './Register';


export function Login(props) {

    const loginAccountHandler = async (e) => {
        e.preventDefault();
        const email = $("#EmailLogin").val();
        const pass = $("#PasswordLogin").val();

        const response = await fetch(`http://localhost:5000/users/Login?size=10&e=${email}&p=${pass}`);
        const respJson = await response.json();

        // Se encontro o no se encontro//
        if (respJson.error == " ") {
            const cookiesNew = new Cookies();
            cookiesNew.set("idUser", respJson.users[0]._id, {path: "/"});
            const hola = cookiesNew.get("idUser");
            console.log(hola);

            window.location.assign("/Profile?idUser=" + respJson.users[0]._id);
        } else {
            console.log("a");
        }
    };
    return (<>
        <div className="App">
            <div className="container-fluid">
                <div className="row mh-100vh">
                    <div className="col-10 col-sm-8 col-md-6 col-lg-6 offset-1 offset-sm-2 offset-md-3 offset-lg-0 align-self-center d-lg-flex align-items-lg-center align-self-lg-stretch p-5 rounded rounded-lg-0 my-5 my-lg-0" id="login-block"
                        style={
                            {background: "rgb(52,52,52)"}
                    }>
                        <div className="m-auto w-lg-75 w-xl-50" data-aos="fade-up" data-aos-delay="450" id="loginSection">
                            <div style={
                                {
                                    textalign: "center",
                                    marginbottom: "46px"
                                }
                            }>
                                <a className="navbar-brand" href="index.php"
                                    style={
                                        {
                                            color: "rgb(255,255,255)",
                                            fontweight: "bold",
                                            letterspacing: "1px",
                                            borderstyle: "double"
                                        }
                                }>
                                    &nbsp;ENTRA CANVAS COMBAT&nbsp;
                                </a>
                            </div>

                            <form form className="user"
                                onSubmit={loginAccountHandler}>
                                <div className="form-group mb-3">
                                    <label className="form-label text-secondary"
                                        style={
                                            {color: "rgb(255,255,255)!important"}
                                    }>
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
                                    <label className="form-label text-secondary"
                                        style={
                                            {color: "rgb(255,255,255)!important"}
                                    }>
                                        Contraseña
                                    </label>
                                    <input id="PasswordLogin" name="phpPasswordLogin" className="form-control" type="password" placeholder="Contraseña"></input>
                                </div>

                                <button className="btn btn-info mt-2" id="logInButton" type="submit">
                                    Ingresar
                                </button>
                            </form>

                            <p className="mt-3 mb-0"
                                onClick={
                                    () => hideLogin()
                            }>
                                <a className="text-info small" href="#">
                                    ¿Nuevo aqui? Registrate
                                </a>
                            </p>
                        </div>
                        <Register></Register>


                    </div>
                </div>
                <div className="col-lg-6 d-flex align-items-end" data-aos="fade-up" data-aos-duration="450" id="bg-block"
                    style={
                        {background: "url(assets/img/wallpaperbetter.com_1920x10802.jpg) center center / cover"}
                }></div>
            </div>
        </div>
    </>);
}
export default Login;
