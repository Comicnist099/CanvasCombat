import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import $, {get} from "jquery";
import Cookies from "universal-cookie";
export function ProfileCharacter() { // /COOCKIES/////////

    const cookiesNew = new Cookies();
    const idUserCookies = cookiesNew.get("idUser");

    // /////////hook///////////
    let [renderedResponsea, setRenderedResponsea] = useState({});
    const [friends, setFriends] = useState([]);
    const [friendsUser, setfriendsUser] = useState();
    const [friendsUser2, setfriendsUser2] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const [commentarios, setCommentarios] = useState([]);
    const [image, setImage] = useState();
    const [idUser, setIdUser] = useState();
    const [idOwner, setIdOwner] = useState();
    const [idUserCommit, setidUserCommit] = useState([]);
    let [styleTeam, setStyleTeam] = useState(" ");
    let [styleTeamBack, setStyleTeamBack] = useState(" ");
    let [error, setError] = useState(" ");
    // let [i, setI] = useState(-1);
    let idCharacter = searchParams.get("idCharacter");

    // /////////////////////////////////////////

    /*  if (idUserCommit == Commit._id) {
      let nicknameCommit = idUserCommit; */

    const getResponseComments = async () => {
        const response = await fetch(`/draw/comments/${idCharacter}`);
        const body = await response.json();
        setError(body.error);
        setCommentarios(body);


        console.log(body);
        if (response.status !== 200) 
            throw Error(body.message);
        


    };
    async function refresh2(id) { /*     const element = "#" + id;
        $(element).hide(); */

        const response = await fetch(`http://localhost:5000/draw/comments/${id}`, {method: "DELETE"});
        const respJson = await response.json();
        console.log(respJson);
        if (respJson.error == "Bad Request") {
            return console.log("NO JALO");
        };
        getResponseComments();
    }

    let getResponseIdActive = async () => {
        const response = await fetch(`/users/`);
        const body = await response.json();
        setidUserCommit(body);

        if (response.status !== 200) 
            throw Error(body.message);
        


    };

    useEffect(() => {
        getResponse();
        getResponseComments();
        getResponseIdActive();
    }, []);

    // ///COMENTARIO Y RESPUESTA///////////

    const PushCommit = async (e) => {
        e.preventDefault();
        const contentCommit = $("#CharacterCommit").val();
        console.log(contentCommit);

        const response2 = await fetch(`/users/${idUserCookies}`);
        const body2 = await response2.json();


        let d = Date(Date.now());
        let a = d.toString();
        const creationDate = a.substr(4, 20);

        const body = {
            isActive: true,
            idDraw: idCharacter,
            name: idUserCookies,
            image: body2.image,
            creationDate: creationDate,
            nicknameCom: body2.nickname,
            descripcion: contentCommit
        };
        document.getElementById("CharacterCommit").value = "";
        const response = await fetch(`http://localhost:5000/draw/comments/`, {
            method: "POST",
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
        getResponseComments();
    };

    const answers = () => {
        return (
            <form onSubmit={PushCommit}>
                <div class="card">
                    <div class="row">
                        <div style={
                            {left: "20"}
                        }>
                            <div class="container text-center">
                                <h4>¡Dinos que piensas!</h4>
                                <div class="comment-area">
                                    <textarea id="CharacterCommit" class="form-control" placeholder="what is your view?" rows="4"></textarea>
                                </div>
                                <div class="comment-btns mt-2">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="pull-right">
                                                <button class="btn btn-success send btn-sm">
                                                    Send
                                                    <i class="fa fa-long-arrow-right ml-1"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    };

    const getResponse = async () => {
        const response = await fetch(`/draw/${idCharacter}`);
        const body = await response.json();

        if (body.isActive) {
            setRenderedResponsea(body);
            setFriends(body);

            if (body.title !== body.character) {
                const response2 = await fetch(`/draw/${
                    body.character
                }`);
                const body2 = await response2.json();
                const responseUser2 = await fetch(`/users/${
                    body2.owner
                }`);
                const bodyUser2 = await responseUser2.json();

                setIdOwner(body2.owner);
                setfriendsUser2(bodyUser2.nickname);
            } else {
                const responseUser2 = await fetch(`/users/${
                    body.owner
                }`);
                const bodyUser2 = await responseUser2.json();
                setIdOwner(body.owner);
                setfriendsUser2(bodyUser2.nickname);
            }

            const responseUser = await fetch(`/users/${
                body.cartoonist
            }`);
            const bodyUser = await responseUser.json();

            setIdUser(body.cartoonist);

            setfriendsUser(bodyUser.nickname);
            setImage(body.image.path);

            // ///////////////////////VALIDAR ESTILOS
            if (body.team == 0) {
                setStyleTeam("Sweet");
                setStyleTeamBack("rgb(215, 71, 155)");
            } else {
                setStyleTeam("Spicy");
                setStyleTeamBack("rgb( 179, 31, 15)");
            }
        }

        if (response.status !== 200) 
            throw Error(body.message);
        


    };

    const validarUser = () => {

        if (friends.title === friends.character) {
            if (idOwner !== idUserCookies && idUserCookies !== "") {
                return (
                    <>
                        <a href={
                                "/SubirAtaque?idCharacter=" + friends._id
                            }
                            class="btn btn-lg"
                            style={
                                {background: "rgba(0,0,0,0.80)"}
                        }>
                            <h2 style={
                                {color: "white"}
                            }>&#9876; ATACAR &#9876;</h2>
                        </a>
                        <a style={
                                {
                                    marginTop: "20px",
                                    background: "rgba(0,0,0,0.20)"
                                }
                            }
                            href={
                                "/MisDefensas?idCharacter=" + idCharacter + '&idUser=' + friends.owner
                            }
                            class="btn">
                            <b className="far fa-eye"
                                style={
                                    {color: "white"}
                            }>
                                Ataques recibidos
                                <b className="far fa-eye"
                                    style={
                                        {color: "white"}
                                }></b>
                            </b>
                        </a>
                    </>
                );
            } else {
                return (
                    <>
                        <a style={
                                {
                                    marginTop: "20px",
                                    background: "rgba(0,0,0,0.20)"
                                }
                            }
                            href={
                                "/MisDefensas?idCharacter=" + idCharacter + '&idUser=' + friends.owner
                            }
                            class="btn">
                            <b className="far fa-eye"
                                style={
                                    {color: "white"}
                            }>
                                Ataques recibidos
                                <b className="far fa-eye"
                                    style={
                                        {color: "white"}
                                }></b>
                            </b>
                        </a>
                    </>
                );
            }
        }
    };

    const valEditarDelete = () => {
        if (friends.cartoonist === idUserCookies) {
            return (
                <>
                    <a href={
                            "/Editar?idCharacter=" + friends._id
                        }
                        class="btn"
                        style={
                            {
                                border: "2px solid",
                                color: "rgba(255,255,255,0.50)",
                                background: "rgba(0,0,0,0.70)",
                                float: "right",
                                marginTop: "20px"
                            }
                    }>
                        <small class="fas fa-trash-alt"
                            style={
                                {color: "white"}
                        }>
                            {" "}
                            Eliminar
                        </small>
                    </a>
                    <a href={
                            "/Editar?idCharacter=" + friends._id
                        }
                        class="btn"
                        style={
                            {
                                border: "2px solid",
                                color: "rgba(255,255,255,0.50)",
                                background: "rgba(0,0,0,0.20)",
                                float: "right",
                                marginTop: "20px",
                                marginRight: "20px",
                                marginBottom: "10px"
                            }
                    }>
                        <small class="fas fa-pen"
                            style={
                                {color: "white"}
                        }>
                            {" "}
                            Editar
                        </small>
                    </a>
                </>
            );
        }
    };

    useEffect(() => {
        getResponse();
    }, []);


    const hola = () => {
        render()
    }

    return (
        <>
            <div className="col-11 center"
                style={
                    {
                        marginTop: "30px",
                        marginLeft: "90px"
                    }
            }>
                <div className="row">
                    <div className="one">
                        <h1 style={
                            {color: "white"}
                        }>Perfil de Personaje</h1>
                    </div>
                </div>
            </div>

            <div class="container text-center">
                <div className="container profileCharacter profile-view" data-aos="fade-up" id="profile"
                    style={
                        {
                            border: "8px solid",
                            color: "rgba(0,0,0,0.50)",
                            marginTop: "50px",
                            background: styleTeamBack
                        }
                }>
                    <div className="row"
                        style={
                            {background: "rgba(255,255,255,0.15)"}
                    }>
                        <div className="col-md-12 ">
                            {
                            valEditarDelete()
                        }

                            <hr style={
                                {width: "1000px"}
                            }></hr>
                            <h1 className={styleTeam}>
                                {
                                friends.title
                            } </h1>
                            <hr style={
                                {width: "1000px"}
                            }></hr>
                            <div>
                                <img style={
                                        {
                                            width: "1050px",
                                            maxHeight: "2400",
                                            border: "15px solid",
                                            color: "rgba(255,255,255,0.50)"
                                        }
                                    }
                                    src={image}
                                    alt=" "
                                    className="form-img__img-preview"></img>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group mb-3">
                                        <p className={styleTeam}>Nombre</p>
                                        <input value={
                                                friends.title
                                            }
                                            className="form-control"
                                            disabled
                                            name="firstname"></input>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-6">
                                    <p className={styleTeam}>Fecha de creacion</p>
                                    <input value={
                                            friends.creationDate
                                        }
                                        className="form-control"
                                        disabled
                                        name="firstname"></input>
                                    <br></br>
                                </div>

                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group mb-3">
                                        <p className={styleTeam}>Descripcion</p>
                                        <textarea value={
                                                friends.descripcion
                                            }
                                            class="form-group"
                                            rows="5"
                                            className="form-control"
                                            disabled
                                            style={
                                                {resize: "none"}
                                            }
                                            name="lastname"></textarea>
                                    </div>
                                </div>

                                <br></br>

                                <div className="col-sm-12 col-md-6">
                                    <div style={
                                            {marginBottom: "500px"}
                                        }
                                        className="form-group mb-3">
                                        <p className={styleTeam}>Character info:</p>
                                        <table class="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <td class="w-25 text-right"
                                                        style={
                                                            {background: "rgba(255,255,255,0.50)"}
                                                    }>
                                                        <b className={styleTeam}>Owner</b>
                                                    </td>
                                                    <td style={
                                                        {backgroundColor: "white"}
                                                    }>
                                                        <strong>
                                                            <a href={
                                                                "/Profile?idUser=" + idOwner
                                                            }>
                                                                {friendsUser2} </a>
                                                        </strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="w-25 text-right"
                                                        style={
                                                            {background: "rgba(255,255,255,0.50)"}
                                                    }>
                                                        <b className={styleTeam}>Designer</b>
                                                    </td>
                                                    <td style={
                                                        {backgroundColor: "white"}
                                                    }>
                                                        <strong>
                                                            <a href={
                                                                "/Profile?idUser=" + idUser
                                                            }>
                                                                {friendsUser} </a>
                                                        </strong>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <br></br>
                                    </div>
                                </div>

                                {
                                validarUser()
                            } </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div class="row">
                    <div class="panel panel-default widget">
                        <div class="panel-heading">
                            <span class="glyphicon glyphicon-comment"></span>
                            <h3 class="panel-title"
                                style={
                                    {color: "white"}
                            }>
                                Recent Comments
                            </h3>
                            <span class="label label-info">78</span>
                        </div>
                        {
                        commentarios.map((Commit) => {
                            console.log(Commit);

                            if (Commit.name == idUserCookies) {
                                return (
                                    <div class="panel-body">
                                        <ul class="list-group">
                                            <li class="list-group-item">
                                                <div class="row">
                                                    <div class="col-xs-2 col-md-1">
                                                        <img width={80}
                                                            lenght={80}
                                                            src={
                                                                Commit.image.path
                                                            }
                                                            class="img-circle img-responsive"
                                                            alt=""/>
                                                    </div>
                                                    <div class="col-xs-10 col-md-11">
                                                        <div>
                                                            <div class="mic-info">

                                                                <a href={
                                                                    "/profile?idUser=" + Commit.name
                                                                }>
                                                                    {
                                                                    Commit.nicknameCom
                                                                }</a>
                                                                <p id={
                                                                        Commit._id
                                                                    }
                                                                    style={
                                                                        {color: "grey"}
                                                                }>
                                                                    {
                                                                    Commit.creationDate
                                                                }</p>
                                                            </div>
                                                        </div>
                                                        <div class="comment-text">
                                                            {
                                                            Commit.descripcion
                                                        } </div>


                                                        <div class="action">
                                                            <form>
                                                                <button type="button" class="btn btn-success btn-xs" title="Approved">
                                                                    <span class="glyphicon glyphicon-ok"></span>
                                                                </button>
                                                                <button type="button" class=" btn btn-danger btn-xs" title="Edit"
                                                                    onClick={
                                                                        async () => refresh2(Commit._id)
                                                                }>
                                                                    <span class="far fa-trash-alt"></span>
                                                                </button>


                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                        <br></br>
                                        <br></br>
                                    </div>
                                );
                            } else {
                                return (
                                    <div class="panel-body">
                                        <ul class="list-group">
                                            <li class="list-group-item">
                                                <div class="row">
                                                    <div class="col-xs-2 col-md-1">
                                                        <img width={80}
                                                            lenght={80}
                                                            src={
                                                                Commit.image.path
                                                            }
                                                            class="img-circle img-responsive"
                                                            alt=""/>
                                                    </div>
                                                    <div class="col-xs-10 col-md-11">
                                                        <div>
                                                            <div class="mic-info">

                                                                <a href={
                                                                    "/profile?idUser=" + Commit.name
                                                                }>
                                                                    {
                                                                    Commit.nicknameCom
                                                                }</a>
                                                                <p style={
                                                                    {color: "grey"}
                                                                }>
                                                                    {
                                                                    Commit.creationDate
                                                                }</p>
                                                            </div>
                                                        </div>
                                                        <div class="comment-text">
                                                            {
                                                            Commit.descripcion
                                                        } </div>

                                                        <div class="action">´
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                        <br></br>
                                        <br></br>
                                    </div>
                                );
                            }

                        })
                    }
                        {" "} </div>
                </div>
                {
                answers()
            }
                {" "} </div>
        </>
    );
}
