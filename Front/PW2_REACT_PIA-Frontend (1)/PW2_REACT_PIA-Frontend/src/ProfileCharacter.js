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
    const [Commentarios, setCommentarios] = useState([]);
    const [image, setImage] = useState();
    const [idUser, setIdUser] = useState();
    const [idOwner, setIdOwner] = useState();
    let [error, setError] = useState(" ");
    const idCharacter = searchParams.get("idCharacter");
    // /////////////////////////////////////////

    const getResponseComments = async () => {
        const response = await fetch(`/draw/comments/`);
        const body = await response.json();
        setError(body.error);
        setCommentarios(body);
        console.log(body);
        if (response.status !== 200) 
            throw Error(body.message);
        


    };


    useEffect(() => {
        getResponse();
        getResponseComments();
    }, []);


    // ///COMENTARIO Y RESPUESTA///////////
    const Comments = () => {
        return (
            <div class="row">
                <div class="panel panel-default widget">
                    <div class="panel-heading">
                        <span class="glyphicon glyphicon-comment"></span>
                        <h3 class="panel-title"
                            style={
                                {color: "white"}
                        }>
                            Recent Comments</h3>
                        <span class="label label-info">
                            78</span>
                    </div>
                    {
                    Commentarios.map((Commit) => {
                        if (Commit.idDraw === idCharacter) {
                            return (
                                <div class="panel-body">
                                    <ul class="list-group">
                                        <li class="list-group-item">
                                            <div class="row">
                                                <div class="col-xs-2 col-md-1">
                                                    <img width={80}
                                                        lenght={80}
                                                        src="https://imgs.search.brave.com/AHLpYMvoMk9Sj0GIXCuDKarbSslo36wkqvbXAealMxo/rs:fit:1200:1080:1/g:ce/aHR0cHM6Ly9pbWcu/Zm90b2NvbW11bml0/eS5jb20vYXRhcmRl/Y2VyZXMtMWIyODI5/YmQtZTI4Zi00N2U1/LTlhNTUtOGQ5OTg4/ZjhlMTg0LmpwZz9o/ZWlnaHQ9MTA4MA"
                                                        class="img-circle img-responsive"
                                                        alt=""/></div>
                                                <div class="col-xs-10 col-md-11">
                                                    <div>
                                                        <a href="http://www.jquery2dotnet.com/2013/10/google-style-login-page-desing-usign.html">
                                                            Google Style Login Page Design Using Bootstrap</a>
                                                        <div class="mic-info">
                                                            By:
                                                            <a href="#">Bhaumik Patel</a>
                                                            on 2 Aug 2013
                                                        </div>
                                                    </div>
                                                    <div class="comment-text">
                                                        {
                                                        Commit.descripcion
                                                    } </div>
                                                    <div class="action">
                                                        <button type="button" class="btn btn-primary btn-xs" title="Edit">
                                                            <span class="glyphicon glyphicon-pencil"></span>
                                                        </button>
                                                        <button type="button" class="btn btn-success btn-xs" title="Approved">
                                                            <span class="glyphicon glyphicon-ok"></span>
                                                        </button>
                                                        <button type="button" class="btn btn-danger btn-xs" title="Delete">
                                                            <span class="glyphicon glyphicon-trash"></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                    </ul>
                                    <br></br>
                                    <br></br>
                                </div>
                            )
                        }
                    })
                } </div>
            </div>
        )
    }
    const PushCommit = async (e) => {
        e.preventDefault();
        const contentCommit = $("#CharacterCommit").val();
        console.log(contentCommit);


        const body = {
            isActive: true,
            idDraw: idCharacter,
            name: idUserCookies,
            descripcion: contentCommit
        };

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

    }

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
                                                <button class="btn btn-success send btn-sm">Send
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
        )
    }


    // /Variable de la imagen///////////////////////////////////////

    const myImageStyle = {
        width: "1090px",
        maxHeight: "2400"
    };


    const getResponse = async () => {
        const response = await fetch(`/draw/${idCharacter}`);
        const body = await response.json();

        if (body.isActive) {
            setRenderedResponsea(body);
            setFriends(body);

            const responseUser = await fetch(`/users/${
                body.cartoonist
            }`);
            const bodyUser = await responseUser.json();
            const responseUser2 = await fetch(`/users/${
                body.owner
            }`);
            const bodyUser2 = await responseUser2.json();

            setIdUser(body.cartoonist);
            setIdOwner(body.owner);
            setfriendsUser(bodyUser.nickname);
            setfriendsUser2(bodyUser2.nickname);
            setImage(body.image.path);
        }

        if (response.status !== 200) 
            throw Error(body.message);
        


    };
    // ///////////////Redes Sociales////////////////////

    useEffect(() => {
        getResponse();
    }, []);

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
                            marginTop: "50px",
                            background: "rgb(129, 129, 129)"
                        }
                }>
                    <div className="row"
                        style={
                            {background: "rgba(255,255,255,0.37)"}
                    }>
                        <div className="col-md-12 ">
                            <h1> {
                                friends.character
                            } </h1>
                            <hr></hr>

                            <div>
                                <img style={myImageStyle}
                                    src={image}
                                    alt=" "
                                    className="form-img__img-preview"></img>
                            </div>

                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group mb-3">
                                        <p className="form-label">Nombre</p>
                                        <input value={
                                                friends.character
                                            }
                                            className="form-control"
                                            disabled
                                            name="firstname"></input>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group mb-3">
                                        <p className="form-label">Descripcion</p>
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
                                    <div className="form-group mb-3">
                                        <p className="form-label">Fecha de creacion</p>
                                        <input value={
                                                friends.creationDate
                                            }
                                            className="form-control"
                                            disabled
                                            name="firstname"></input>
                                        <br></br>
                                        <p className="form-label">Character info:</p>

                                        <table class="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <td class="w-25 text-right bg-light">
                                                        <b>Owner</b>
                                                    </td>
                                                    <td>
                                                        <strong>
                                                            <a href={
                                                                "/Profile?idUser=" + idOwner
                                                            }>
                                                                {friendsUser2}
                                                                {" "} </a>
                                                        </strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="w-25 text-right bg-light">
                                                        <b>Designer</b>
                                                    </td>
                                                    <td>
                                                        <strong>
                                                            <a href={
                                                                "/Profile?idUser=" + idUser
                                                            }>
                                                                {friendsUser}
                                                                {" "} </a>
                                                        </strong>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <br></br>
                                    </div>
                                </div>

                                <a href={
                                        "/SubirAtaque?idCharacter=" + friends._id
                                    }
                                    class="btn btn-danger btn-lg">
                                    <h3 style={
                                        {color: "white"}
                                    }>ATACAR</h3>
                                </a>

                                <a style={
                                        {marginTop: "20px"}
                                    }
                                    href={
                                        "/MisAtaques?idCharacter=" + friends._id
                                    }
                                    class="btn btn-primary">
                                    Ataques recibidos
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                {
                Comments()
            }

                {
                answers()
            } </div>
        </>
    );
}
