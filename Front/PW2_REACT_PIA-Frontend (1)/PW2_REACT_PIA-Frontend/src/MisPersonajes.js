import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import $, {get} from "jquery";
import {Link, useNavigate, useSearchParams} from "react-router-dom";


export function MisPersonajes() {

    const cookiesNew = new Cookies();
    const idUserCookies = cookiesNew.get("idUser");


    let [renderedResponsea, setRenderedResponsea] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    const [friends, setFriends] = useState([]);

    const idUser = searchParams.get("idUser");

    const getResponse = async () => {
        const response = await fetch(`/draw`);
        const body = await response.json();

        setRenderedResponsea(body);
        setFriends(body);
        // console.log(body);

        if (response.status !== 200) 
            throw Error(body.message);
        


    };

    useEffect(() => {
        getResponse();
    }, []);

    return (

        <>
            <div className="col-11 center"
                style={
                    {
                        marginTop: "30px",
                        marginLeft: "50px"
                    }
            }>
                <div className="row">
                    <div className="one">
                        <h1 style={
                            {color: "white"}
                        }>MIS PERSONAJES</h1>
                    </div>
                </div>
            </div>

            {/* tarjeta de personajes  */}

            {
            friends.map((character) => {
                if (character.owner === character.cartoonist && character.owner === idUser) {
                    return (
                        <div className="container profile profile-view" data-aos="fade-up" id="profile"
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
                                <div className="col-md-4 center">
                                    <div className="p-5">
                                        <img className="img-fluid" alt=" "
                                            src={
                                                character.image.path
                                        }></img>
                                    </div>
                                </div>

                                <input className="form-control" type="hidden" name="idCharacter" id="idCharacter"
                                    value={
                                        character._id
                                }></input>

                                <div className="col-md-8 center">
                                    <h1> {
                                        character.character
                                    } </h1>
                                    <hr></hr>

                                    <div className="row">
                                        <div className="col-sm-12 col-md-6">
                                            <div className="form-group mb-3">
                                                <p>Descripcion:
                                                </p>
                                                <input className="form-control" type="text" name="firstname"
                                                    value={
                                                        character.descripcion
                                                    }
                                                    disabled></input>
                                            </div>
                                        </div>
                                    </div>
                                    <input className="form-control" type="hidden" name="idCharacter" id="idCharacter"
                                        value={
                                            character._id
                                    }></input>

                                    <hr></hr>
                                    <a href={
                                            '/ProfileCharacter?idCharacter=' + character._id + '&idUser=' + idUser
                                        }
                                        class="btn btn-primary btn-lg">Ir a</a>

                                </div>
                            </div>
                            <div className="row"
                                style={
                                    {margin: "10px"}
                            }></div>
                        </div>
                    );
                } else {
                    return (
                        <div class="container text-center">
                            <h1 style={
                                {color: "white"}
                            }>NO HA SUBIDO PERSONAJES</h1>
                            <img style={
                                    {
                                        width: 300,
                                        maxHeight: 600
                                    }
                                }
                                src="https://cdn.discordapp.com/attachments/921926176484773909/1042250822240714823/Sad-Drawing-PNG-HD-Isolated.png"></img>

                            <a class="btn btn-danger" id="myProducts"
                                href={
                                    'profile?idUser=' + idUser
                                }
                                style={
                                    {textAlign: "center"}
                            }>
                                Regresar al perfil
                            </a>

                        </div>
                    );
                }
            })
        }

            {/* tarjeta de personajes  */} </>
    );
}
