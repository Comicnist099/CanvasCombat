import React, {useEffect, useState} from "react";
import $ from "jquery";
import Cookies from "universal-cookie";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {render} from "@testing-library/react";

export function Profile(props) {
    let profilePicData = null;
    const navigate = useNavigate();
    // /////////hook///////////
    let [renderedResponsea, setRenderedResponsea] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();

    let [edit, setedit] = useState(false);
    let [facebook, setFacebook] = useState("https://www.facebook.com");
    let [twitter, setTwitter] = useState("https://www.twitter.com");
    let [instagram, setInstagram] = useState("https://www.instagram.com");
    let [imageHook, setImageHook] = useState();
    let [error, setError] = useState(" ");
    let [styleTeam, setStyleTeam] = useState(" ");
    let [styleTeamBack, setStyleTeamBack] = useState(" ");
    let [borderTeam, setBorderTeam] = useState(" ");
    let [teamImage, setTeamImage] = useState(" ");
    let [colorMark, setColorMark] = useState(" ");
    let [passwordValidate1, setPasswordValidate1] = useState("none");
    let [passwordValidate2, setPasswordValidate2] = useState("hidden");
    let [vacio, setvacio] = useState("hidden");
    let [vacio2, setvacio2] = useState("button");

    let [Errora, setErrora] = useState(false);

    const PasswordBoolActive = (e) => {
        setPasswordValidate1("block");
        setPasswordValidate2("password");
        setvacio("button");
        setvacio2("hidden");
    };
    const PasswordBoolDesactive = (e) => {
        setPasswordValidate1("none");
        setPasswordValidate2("hidden");
        setvacio("hidden");
        setvacio2("button");
    };

    // //////////////////////
    const idUser = searchParams.get("idUser");

    const cookiesNew = new Cookies();
    const idUserCookies = cookiesNew.get("idUser");

    const logOut = () => {
        cookiesNew.set("idUser", "", {path: "/"});
        window.location.assign("/loginRegister");
    };

    // ///////////IMAGEN////////////////
    const [
        {
            alt,
            src
        }, setImg
    ] = useState({src: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg", alt: "Upload an Image"});

    const handleImg = (e) => {
        if (e.target.files[0]) {
            setImg({
                src: URL.createObjectURL(e.target.files[0]),
                alt: e.target.files[0].name
            });
        }
    };

    const editMode = (e) => {
        setedit(true);
    };

    const staticMode = (e) => {
        setedit(false);
    };

    const UpdateProfile = async (e) => {
        e.preventDefault();

        const name = $("#NombreProfile").val();
        const nickname = $("#NicknameProfile").val();
        let Pass = $("#PasswordProfile").val();
        let NewPass = $("#NewPasswordProfile").val();

        let hola = false;

        let FacebookB = $("#PerfilFacebook").val();
        let TwitterB = $("#PerfilTwitter").val();
        let InstagramB = $("#PerfilInstagram").val();

        if (! FacebookB) 
            FacebookB = " ";
        

        if (! TwitterB) 
            TwitterB = " ";
        

        if (! InstagramB) 
            InstagramB = " ";
        

        if (passwordValidate1 == "none") 
            Pass = "";
        

        const validName = /^[a-zA-Z ]{1,}$/;
        const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (! validName.test(name)) {
            setErrora("El nombre no puede tener numeros ni caracteres especiales");
        } else if (renderedResponsea.password != Pass && "" != Pass) {
            setErrora("La contraseña no es igual a la actual");
            console.log("no es igual");
        } else if (! validPassword.test(NewPass) && "" != Pass) {
            setErrora("La nueva Contraseña debe tener mínimo letra mayuscula, una letra minuscula, un digito, un caracter especial y debe de contar con 8 o más caracteres");
        } else {
            if ("" == Pass) {
                NewPass = renderedResponsea.password;
            }

            setErrora("");

            console.log(NewPass);
            let file = $("#profilePic")[0].files[0];

            const reader = new FileReader();

            reader.addEventListener("load", async function readFile(event) {
                if (file) {
                    console.log("con foto");
                    const nameparts = file.name.split(".");
                    const filename = nameparts[0];
                    const mime = nameparts[1];
                    profilePicData = event.target.result;

                    profilePicData = profilePicData.split("base64")[1];

                    const profilePic = {
                        name: filename,
                        extention: mime,
                        path: profilePicData
                    };
                    const body = {
                        nameUser: name,
                        nickname: nickname,
                        image: profilePic,
                        facebook: FacebookB,
                        instagram: InstagramB,
                        extra: TwitterB,
                        password: NewPass
                    };
                    const response = await fetch(`http://localhost:5000/users/${idUser}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(body)
                    });
                    const respJson = await response.json();
                    console.log(respJson);
                    if (respJson.error == "Bad Request") {
                        return console.log("NO JALO");
                    }
                }
            });
            if (! file) {
                console.log("sin foto");
                const body = {
                    nameUser: name,
                    nickname: nickname,
                    facebook: FacebookB,
                    instagram: InstagramB,
                    extra: TwitterB,
                    password: NewPass
                };
                const response = await fetch(`http://localhost:5000/users/${idUser}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                });
                const respJson = await response.json();
                console.log(respJson);
                if (respJson.error == "Bad Request") {
                    return console.log("NO JALO");
                }
            } else {
                reader.readAsDataURL(file);
            }
            window.location.reload();
        }
    };
    // ////////////////////////////////

    const getResponse = async () => {
        const response = await fetch(`/users/${idUser}`);
        const body = await response.json();
        setError(body.error);

        if (body.isActive) {
            let bufferImage = body.image.path;
            setImageHook(bufferImage);

            setRenderedResponsea(body);
            const face = facebook.substr(0, 24);
            const twit = twitter.substr(0, 23);
            const insta = instagram.substr(0, 25);

            // ///////////////////////VALIDAR ESTILOS
            if (body.team == 0) {
                setStyleTeam("Sweet");
                setStyleTeamBack("rgb(199, 97, 140)");
                setBorderTeam("rgb(77, 22, 77)");
                setTeamImage("https://cdn.discordapp.com/attachments/921926176484773909/1042613734205562961/SweetFont.png");
                setColorMark("rgba(255,255,255,0.50)");
            } else {
                setStyleTeam("Spicy");
                setStyleTeamBack("rgb(150, 57, 57)");
                setBorderTeam("rgb(77, 22, 22)");
                setTeamImage("https://cdn.discordapp.com/attachments/921926176484773909/1042613733844865146/SpicyFont.png");
                setColorMark("rgba(255,255,255,0.50)");
            }

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

        if (response.status !== 200) 
            throw Error(body.message);
        
    };

    const Redesh = (sourceF, sourceI, sourceT) => {
        if (sourceF != " " || sourceI != " " || sourceT != " ") {
            return <h3 className={styleTeam}>REDES SOCIALES</h3>;
        }
    };

    const FacebookValidate = (source) => {
        if (source != " ") {
            return (
                <a title={facebook}
                    href={facebook}
                    target="_blank">
                    <img src="https://imgs.search.brave.com/ZySSH5qtW5EHOLa4lmjyf1dDLJSa877kRsg_GZwS3OQ/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9pMS53/cC5jb20vd3d3LmRw/YWJvZ2Fkb3MuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE2/LzA5L2ZhY2Vib29r/LWxvZ28tcG5nLXRy/YW5zcGFyZW50LWJh/Y2tncm91bmQucG5n/P2ZpdD0xNjAwJTJD/MTYwMCZzc2w9MQ" alt="" height="50" width="50"/>
                </a>
            );
        }
    };

    const emptySpace = (source) => {
        if (source == " ") {
            return (
                <div>
                    <img src="https://imgs.search.brave.com/ZySSH5qtW5EHOLa4lmjyf1dDLJSa877kRsg_GZwS3OQ/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9pMS53/cC5jb20vd3d3LmRw/YWJvZ2Fkb3MuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE2/LzA5L2ZhY2Vib29r/LWxvZ28tcG5nLXRy/YW5zcGFyZW50LWJh/Y2tncm91bmQucG5n/P2ZpdD0xNjAwJTJD/MTYwMCZzc2w9MQ" alt="" height="50" width="50"/>
                    <input //onInput="this.value = this.value.toUpperCase()"
                        id="PerfilFacebook"
                        name="PerfilFacebook"
                        type="text"
                        placeholder="/"

                        //inputMode="email"
                    ></input>

                    <br></br>
                    <img src="https://imgs.search.brave.com/RfLppzW2OMwAkqj4cAxfoy0VBWuodWzGVzoAUEX_ILU/rs:fit:1024:1024:1/g:ce/aHR0cHM6Ly93d3cu/eWFjaHRzYWxlc2lu/dGVybmF0aW9uYWwu/Y29tL3dwL3dwLWNv/bnRlbnQvdXBsb2Fk/cy95YWNodHNhbGVz/aW50ZXJuYXRpb25h/bC5jb20vMjAxOS8w/OS9pbnN0YWdyYW0t/cG5nLWluc3RhZ3Jh/bS1wbmctbG9nby0x/NDU1LTEwMjR4MTAy/NC5wbmc" alt="" height="50" width="50"/>

                    <input //onInput="this.value = this.value.toUpperCase()"
                        id="PerfilInstagram"
                        name="PerfilInstagram"
                        type="text"
                        //inputMode="email"
                        placeholder="/"
                    ></input>

                    <br></br>
                    <img src="https://imgs.search.brave.com/Dkgov-vCLYh5038LVyQlKsa9vRlx9oSDjXBlPxvmnso/rs:fit:1140:1145:1/g:ce/aHR0cHM6Ly9hbHVt/bmkudml1LmNhL3Np/dGVzL2RlZmF1bHQv/ZmlsZXMvc3R5bGVz/L21heF9zaXplX2Ny/b3BwZWQvcHVibGlj/L3R3aXR0ZXItc3F1/YXJlZC5wbmc_aXRv/az16UGFNbUFjZCZj/PWY5MzQxNWRiMjkx/NmUwMTBjZDJjZDA4/ZDBkMzRiNjI2" alt="" height="50" width="50"/>

                    <input //onInput="this.value = this.value.toUpperCase()"
                        id="PerfilTwitter"
                        name="PerfilTwitter"
                        type="text"
                        placeholder="/"
                        //inputMode="email"
                    ></input>
                </div>
            );
        } else {
            return (
                <div>
                    <img src="https://imgs.search.brave.com/ZySSH5qtW5EHOLa4lmjyf1dDLJSa877kRsg_GZwS3OQ/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9pMS53/cC5jb20vd3d3LmRw/YWJvZ2Fkb3MuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE2/LzA5L2ZhY2Vib29r/LWxvZ28tcG5nLXRy/YW5zcGFyZW50LWJh/Y2tncm91bmQucG5n/P2ZpdD0xNjAwJTJD/MTYwMCZzc2w9MQ" alt="" height="50" width="50"/>
                    <input //onInput="this.value = this.value.toUpperCase()"
                        id="PerfilFacebook"
                        name="PerfilFacebook"
                        type="text"
                        placeholder="/"
                        //inputMode="email"
                        defaultValue={
                            facebook.substr(25)
                    }></input>

                    <br></br>
                    <img src="https://imgs.search.brave.com/RfLppzW2OMwAkqj4cAxfoy0VBWuodWzGVzoAUEX_ILU/rs:fit:1024:1024:1/g:ce/aHR0cHM6Ly93d3cu/eWFjaHRzYWxlc2lu/dGVybmF0aW9uYWwu/Y29tL3dwL3dwLWNv/bnRlbnQvdXBsb2Fk/cy95YWNodHNhbGVz/aW50ZXJuYXRpb25h/bC5jb20vMjAxOS8w/OS9pbnN0YWdyYW0t/cG5nLWluc3RhZ3Jh/bS1wbmctbG9nby0x/NDU1LTEwMjR4MTAy/NC5wbmc" alt="" height="50" width="50"/>

                    <input //onInput="this.value = this.value.toUpperCase()"
                        id="PerfilInstagram"
                        name="PerfilInstagram"
                        type="text"
                        //inputMode="email"
                        placeholder="/"
                        defaultValue={
                            instagram.substr(26)
                    }></input>

                    <br></br>
                    <img src="https://imgs.search.brave.com/Dkgov-vCLYh5038LVyQlKsa9vRlx9oSDjXBlPxvmnso/rs:fit:1140:1145:1/g:ce/aHR0cHM6Ly9hbHVt/bmkudml1LmNhL3Np/dGVzL2RlZmF1bHQv/ZmlsZXMvc3R5bGVz/L21heF9zaXplX2Ny/b3BwZWQvcHVibGlj/L3R3aXR0ZXItc3F1/YXJlZC5wbmc_aXRv/az16UGFNbUFjZCZj/PWY5MzQxNWRiMjkx/NmUwMTBjZDJjZDA4/ZDBkMzRiNjI2" alt="" height="50" width="50"/>

                    <input //onInput="this.value = this.value.toUpperCase()"
                        id="PerfilTwitter"
                        name="PerfilTwitter"
                        type="text"
                        placeholder="/"
                        //inputMode="email"
                        defaultValue={
                            twitter.substr(24)
                    }></input>
                </div>
            );
        }
    };

    const InstagramValidate = (source) => {
        if (source != " ") {
            return (
                <a title={instagram}
                    href={instagram}
                    target="_blank">
                    <img src="https://imgs.search.brave.com/RfLppzW2OMwAkqj4cAxfoy0VBWuodWzGVzoAUEX_ILU/rs:fit:1024:1024:1/g:ce/aHR0cHM6Ly93d3cu/eWFjaHRzYWxlc2lu/dGVybmF0aW9uYWwu/Y29tL3dwL3dwLWNv/bnRlbnQvdXBsb2Fk/cy95YWNodHNhbGVz/aW50ZXJuYXRpb25h/bC5jb20vMjAxOS8w/OS9pbnN0YWdyYW0t/cG5nLWluc3RhZ3Jh/bS1wbmctbG9nby0x/NDU1LTEwMjR4MTAy/NC5wbmc" alt="" height="50" width="50"/>
                </a>
            );
        }
    };

    const TwitterValidate = (source) => {
        if (source != " ") {
            return (
                <a title={twitter}
                    href={twitter}
                    target="_blank">
                    <img src="https://imgs.search.brave.com/Dkgov-vCLYh5038LVyQlKsa9vRlx9oSDjXBlPxvmnso/rs:fit:1140:1145:1/g:ce/aHR0cHM6Ly9hbHVt/bmkudml1LmNhL3Np/dGVzL2RlZmF1bHQv/ZmlsZXMvc3R5bGVz/L21heF9zaXplX2Ny/b3BwZWQvcHVibGlj/L3R3aXR0ZXItc3F1/YXJlZC5wbmc_aXRv/az16UGFNbUFjZCZj/PWY5MzQxNWRiMjkx/NmUwMTBjZDJjZDA4/ZDBkMzRiNjI2" alt="" height="50" width="50"/>
                </a>
            );
        }
    };

    useEffect(() => {
        getResponse();
    }, []);

    const NavBarMultimedia = (source) => {
        if (idUser === idUserCookies) {
            return (
                <div className="container">
                    <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-6">
                        <span className="visually-hidden">Toggle navigation</span>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div id="navcol-6" className="collapse navbar-collapse flex-grow-0 order-md-first">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a class="btn btn-dark" id="lists" href="Logros"
                                    style={
                                        {textSlign: "center"}
                                }>
                                    LOGROS
                                </a>
                            </li>
                            <li className="nav-item">
                                <a class="btn btn-dark" id="orders" href="SubirPersonaje"
                                    style={
                                        {textAlign: "center"}
                                }>
                                    SUBIR PERSONAJE
                                </a>
                            </li>
                            <li className="nav-item">
                                <a class="btn btn-dark" id="editButton" name="editButton " type="button"
                                    href={
                                        "MisPersonajes?idUser=" + idUser
                                }>
                                    Mis Personajes
                                </a>
                            </li>
                            <li className="nav-item">
                                <a class="btn btn-dark" id="myProducts"
                                    href={
                                        "MisAtaques?idUser=" + idUser
                                    }
                                    style={
                                        {textAlign: "center"}
                                }>
                                    MIS ATAQUES
                                </a>
                            </li>
                            <li className="nav-item">
                                <a class="btn btn-dark" id="myProducts"
                                    href={
                                        "MisDefensas?idUser=" + idUser
                                    }
                                    style={
                                        {textAlign: "center"}
                                }>
                                    MIS DEFENSAS
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-6">
                        <span className="visually-hidden">Toggle navigation</span>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div id="navcol-6" className="collapse navbar-collapse flex-grow-0 order-md-first">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a class="btn btn-dark" id="lists" href="Logros"
                                    style={
                                        {textSlign: "center"}
                                }>
                                    LOGROS
                                </a>
                            </li>

                            <li className="nav-item">
                                <a class="btn btn-dark" id="myProducts"
                                    href={
                                        "MisPersonajes?idUser=" + idUser
                                    }
                                    style={
                                        {textAlign: "center"}
                                }>
                                    SUS PERSONAJES
                                </a>
                            </li>
                            <li className="nav-item">
                                <a class="btn btn-dark" id="myProducts"
                                    href={
                                        "MisAtaques?idUser=" + idUser
                                    }
                                    style={
                                        {textAlign: "center"}
                                }>
                                    SUS ATAQUES
                                </a>
                            </li>
                            <li className="nav-item">
                                <a class="btn btn-dark" id="editButton" name="editButton " type="button"
                                    href={
                                        "MisDefensas?idUser=" + idUser
                                }>
                                    Sus Defensas
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        }
    };

    const NotFoundProfile = (source) => {
        if (error != "Not Found") {
            return renderMultimedia(source);
        } else {
            return (
                <div class="container text-center">
                    <h1 style={
                        {color: "white"}
                    }>ERROR 404</h1>

                    <h2 style={
                        {color: "grey"}
                    }>No se encontro el perfil</h2>
                    <img class="container text-center"
                        style={
                            {
                                width: 1200,
                                maxHeight: 2400
                            }
                        }
                        alt=" "
                        src="https://images.twinkl.co.uk/tr/image/upload/t_illustration/illustation/Feelings-Monster-Sad-Character-EYFS-Emotions-Creature-Open-Eyes.png"></img>
                </div>
            );
        }
    };

    const renderMultimedia = (source) => {
        if (source) {
            return (
                <div className="container profile profile-view" data-aos="fade-up" id="profile"
                    style={
                        {
                            border: "15px solid",
                            color: borderTeam,
                            marginTop: "50px",
                            background: styleTeamBack
                        }
                }>
                    <div className="row"
                        style={
                            {background: "rgba(255,255,255,0.15)"}
                    }>
                        <div className="col-md-4 content-right">
                            <div className="avatar"
                                style={
                                    {marginTop: "21px"}
                            }>
                                <img style={
                                        {
                                            border: " 10px solid",
                                            color: colorMark,
                                            wdth: 300,
                                            maxHeight: 300
                                        }
                                    }
                                    src={src}
                                    alt={alt}
                                    className="form-img__img-preview"/>

                                <input className="form-control form-control" id="profilePic" name="profilePic " type="file" accept=".jpeg, .jpg, .png, .bmp"
                                    onChange={handleImg}
                                    style={
                                        {marginTop: "24px"}
                                    }/>
                            </div>
                        </div>

                        <div className="col-md-8 ">
                            <div>
                                <img style={
                                        {
                                            float: "right",
                                            width: 200,
                                            maxHeight: 200
                                        }
                                    }
                                    src={teamImage}/>
                            </div>
                            <h1 style={
                                    {
                                        fontFamily: "Marker Felt",
                                        fontVariant: "small-caps"
                                    }
                                }
                                className={styleTeam}>
                                {
                                renderedResponsea.nickname
                            }
                                {" "} </h1>
                            <hr></hr>
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group mb-3">
                                        <label className={styleTeam}>Nombre</label>
                                        <input placeholder={
                                                renderedResponsea.nameUser
                                            }
                                            className="form-control"
                                            type="text"
                                            name="NombreProfile"
                                            id="NombreProfile"></input>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group mb-3">
                                        <label className={styleTeam}>Nickname</label>
                                        <input placeholder={
                                                renderedResponsea.nickname
                                            }
                                            className="form-control"
                                            type="text"
                                            name="NickNameProfile"
                                            id="NicknameProfile"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <label className={styleTeam}>Email</label>
                                <input className="form-control" type="email" autocomplete="off" required=""
                                    placeholder={
                                        renderedResponsea.email
                                    }
                                    name="email"
                                    disabled></input>
                            </div>
                            <div className="form-group mb-3">
                                <label className={styleTeam}>Creación de cuenta</label>
                                <input className="form-control" type="email" autocomplete="off" required="" name="dateCreation"
                                    value={
                                        renderedResponsea.creationDate
                                    }
                                    disabled></input>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group mb-3">
                                        <label className={styleTeam}
                                            style={
                                                {display: passwordValidate1}
                                        }>
                                            Password
                                        </label>
                                        <input className="form-control"
                                            type={passwordValidate2}
                                            name="password"
                                            autocomplete="off"
                                            required=""
                                            id="PasswordProfile"></input>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label style={
                                                {display: passwordValidate1}
                                            }
                                            className={styleTeam}>
                                            Nueva Password
                                        </label>
                                        <input className="form-control"
                                            type={passwordValidate2}
                                            name="password"
                                            autocomplete="off"
                                            required=""
                                            id="NewPasswordProfile"></input>
                                        <input class="btn btn-dark"
                                            type={vacio2}
                                            value="Cambiar Contraseña"
                                            onClick={PasswordBoolActive}></input>

                                        <input class="btn btn-dark"
                                            type={vacio}
                                            value="No cambiar Contraseña"
                                            onClick={PasswordBoolDesactive}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group mb-3">
                                        <label className={styleTeam}>Puntos Totales</label>
                                        <input disabled className="form-control" required=""
                                            value={
                                                renderedResponsea.points
                                        }></input>
                                    </div>
                                </div>
                            </div>
                            <hr></hr>
                            <h3 className={styleTeam}>REDES SOCIALES</h3>
                            {
                            emptySpace(facebook.substr(25), instagram.substr(26), twitter.substr(24))
                        }
                            {" "} </div>
                        <div className="row">
                            <div className="col-md-12 content-right"
                                style={
                                    {marginBottom: "19px"}
                            }>
                                <p style={
                                    {
                                        color: "red",
                                        background: "white"
                                    }
                                }>
                                    {Errora} </p>
                                <input className="btn btn-danger" id="editButton" name="editButton " type="button" value="Regresar"
                                    onClick={staticMode}/>
                                <button className="btn btn-success" id="logInButton" type="submit">
                                    Actualizar Información
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container profile profile-view" data-aos="fade-up" id="profile"
                    style={
                        {
                            border: " 15px solid",
                            color: borderTeam,
                            marginTop: "50px",
                            background: styleTeamBack
                        }
                }>
                    <div className="row"
                        style={
                            {background: "rgba(255,255,255,0.15)"}
                    }>
                        <div className="col-md-4 content-right">
                            <div className="avatar"
                                style={
                                    {
                                        marginTop: "21px",
                                        marginRight: "120px",
                                        width: "200px"
                                    }
                            }>
                                <img style={
                                        {
                                            border: " 10px solid",
                                            color: colorMark,
                                            width: 300,
                                            maxHeight: 600
                                        }
                                    }
                                    src={imageHook}
                                    alt={alt}
                                    className="form-img__img-preview"/>
                            </div>
                        </div>

                        <div className="col-md-8 ">
                            <div>
                                <img style={
                                        {
                                            float: "right",
                                            width: 200,
                                            maxHeight: 200
                                        }
                                    }
                                    src={teamImage}/>
                            </div>
                            <h1 className={styleTeam}
                                style={
                                    {
                                        fontFamily: "Marker Felt",
                                        fontVariant: "small-caps"
                                    }
                            }>
                                {
                                renderedResponsea.nickname
                            }
                                {" "} </h1>
                            <hr></hr>
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group mb-3">
                                        <label className={styleTeam}>Nombre</label>
                                        <input className="form-control" type="text" name="firstname"
                                            value={
                                                renderedResponsea.nameUser
                                            }
                                            disabled></input>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group mb-3">
                                        <label className={styleTeam}>Nickname</label>
                                        <input className="form-control" type="text" name="lastname"
                                            value={
                                                renderedResponsea.nickname
                                            }
                                            disabled></input>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <label className={styleTeam}>Email</label>
                                <input className="form-control" type="email" autocomplete="off" required="" name="email" disabled
                                    value={
                                        renderedResponsea.email
                                }></input>
                            </div>
                            <div className="form-group mb-3">
                                <label className={styleTeam}>Creación de cuenta</label>
                                <input className="form-control" type="email" autocomplete="off" required="" name="dateCreation" disabled
                                    value={
                                        renderedResponsea.creationDate
                                }></input>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group mb-3">
                                        <label className={styleTeam}>Password</label>
                                        <div>
                                            <input className="form-control" type="password" name="password" autocomplete="off" required="" value="JAKSDJASKDJASKDJ" disabled></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group mb-3">
                                        <label className={styleTeam}>Puntos Totales</label>
                                        <input disabled className="form-control" required=""
                                            value={
                                                renderedResponsea.points
                                        }></input>
                                    </div>
                                </div>
                            </div>
                            <hr></hr>
                            {
                            Redesh(renderedResponsea.facebook, renderedResponsea.instagram, renderedResponsea.extra)
                        }
                            {
                            FacebookValidate(renderedResponsea.facebook)
                        }
                            {
                            InstagramValidate(renderedResponsea.instagram)
                        }
                            {
                            TwitterValidate(renderedResponsea.extra)
                        }
                            <br></br>
                            <br></br>
                            {
                            buttons()
                        }
                            {" "} </div>
                    </div>
                </div>
            );
        }
    };
    const buttons = () => {
        if (idUser === idUserCookies) {
            return (
                <div className="row">
                    <div className="col-md-12 content-right"
                        style={
                            {marginBottom: "19px"}
                    }>
                        <input class="btn" id="editButton" name="editButton " type="button"
                            style={
                                {
                                    color: "rgba(255,255,255,0.90)",
                                    background: "rgba(0,0,0,0.40)",
                                    marginLeft: "10px"
                                }
                            }
                            value="Editar Información"
                            onClick={editMode}/>
                        <input value="Cerrar Sesión" className="btn" type="button"
                            style={
                                {
                                    color: "rgba(255,255,255,0.90)",
                                    background: "rgba(0,0,0,0.80)"
                                }
                            }
                            onClick={logOut}></input>
                    </div>
                </div>
            );
        }
    };

    const NotFoundProfileBar = () => {
        if (error != "Not Found") {
            return (
                <nav className="navbar navbar-dark navbar-expand-md bg-dark py-3">
                    {
                    NavBarMultimedia()
                }
                    {" "} </nav>
            );
        }
    };

    return (
        <> {" "}
            {
            NotFoundProfileBar()
        }
            <form onSubmit={UpdateProfile}>
                {
                NotFoundProfile(edit)
            }</form>
        </>
    );
}
export default Profile;
