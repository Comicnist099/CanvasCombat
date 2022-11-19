import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import {Link, Navigate, useNavigate, useSearchParams} from "react-router-dom";
import $, {data} from "jquery";

export function SubirAtaque() {
    const cookiesNew = new Cookies();
    const idUser = cookiesNew.get("idUser");
    const navigate = useNavigate();
    const [errorA, setErrora] = useState("");
    const [nameDraw, setNameDraw] = useState();
    const [imageDraw, setImageDraw] = useState();
    const [idOwner, setIdOwner] = useState();
    const [friendsUser, setfriendsUser] = useState();

    const [searchParams, setSearchParams] = useSearchParams();
    let puntuacion = 0;

    // cada cb suma el total de 100, por lo que body vale 25, lineart 25 y asi

    const body = ["Icon", "Headshot", "Midbody", "Fullbody"];
    // icon: 3, Headshot: 8, Midbody: 15, Fullbody: 25

    const lineart = ["Sketch", "Clean Lineart", "Color Lineart", "Lineless"];
    // Sketch: 3, Clean Lineart: 8, Color Lineart: 15, Lineless: 25

    const detail = ["No color", "Base Color", "Simple Shading", "Full Render"];
    // No color: 3, Base Color: 8, Simple Shading: 15, Full Render: 25

    const background = ["No background", "Base Color", "Simple Background", "Full Render Background",];
    // No background: 3, Base Color: 8, Simple Background: 15, Full Render Background: 25

    let attackPicData = null;
    let characterPicData2 = null;
    // ////////////////////////////////////////////////
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

    const [
        {
            alt2,
            src2
        }, setImg2
    ] = useState({src2: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg", alt2: "Upload an Image"});
    const handleImg2 = (e) => {
        if (e.target.files[0]) {
            setImg2({
                src2: URL.createObjectURL(e.target.files[0]),
                alt2: e.target.files[0].name
            });
        }
    };


    const idCharacter = searchParams.get("idCharacter");

    const refresh = async (e) => {
        e.preventDefault();
        console.log(attackPicData);
    };

    const points = (nombre) => {
        if (nombre === body[0] || nombre === lineart[0] || nombre === detail[0] || nombre === background[0]) 
            puntuacion = puntuacion + 3;
         else if (nombre === body[1] || nombre === lineart[1] || nombre === detail[1] || nombre === background[1]) 
            puntuacion = puntuacion + 8;
         else if (nombre === body[2] || nombre === lineart[2] || nombre === detail[2] || nombre === background[2]) 
            puntuacion = puntuacion + 15;
         else if (nombre === body[3] || nombre === lineart[3] || nombre === detail[3] || nombre === background[3]) 
            puntuacion = puntuacion + 25;
        


    };

    let getResponse = async () => {
        const response = await fetch(`/users/${idUser}`);
        const body = await response.json();
        setfriendsUser(body);

        if (response.status !== 200) 
            throw Error(body.message);
        


        const response2 = await fetch(`/draw/${idCharacter}`);
        const body2 = await response2.json();
        setNameDraw(body2.character);
        setImageDraw(body2.image.path);
        setIdOwner(body2.owner);

        if (response2.status !== 200) 
            throw Error(body2.message);
        


    };

    const attackCharacterHandler = async (e) => { // Evento que sucede cuando presionas el boton de registrar
        e.preventDefault();
        console.log("hola");
        const title = $("#nameCharacter").val();
        const descripcion = $("#descripcionCharacter").val();

        const file = $("#characterPic")[0].files[0];
        const reader = new FileReader();

        const file2 = $("#characterPic2")[0].files[0];
        const reader2 = new FileReader();
        const vBody = $("#cbBody").val();
        const vLineart = $("#cbLineart").val();
        const vDetail = $("#cbDetail").val();
        const vBackground = $("#cbBackground").val();
        console.log(title);

        if (title === "" || descripcion === "") {
            setErrora("Llene los campos vacios.");
        } else if (title.length < 5) {
            setErrora("El titulo debe tener más de 5 caracteres");
        } else if (descripcion.length < 5) {
            setErrora("La descripción debe tener más de 5 caracteres");
        } else {


            if (file) {
                setErrora("");
                reader.addEventListener("load", async function readFile(event) {
                    const nameparts = file.name.split(".");
                    const filename = nameparts[0];
                    const mime = nameparts[1];
                    attackPicData = event.target.result;

                    attackPicData = attackPicData.split("base64")[1];
                    const characterPic = {
                        name: filename,
                        extention: mime,
                        path: attackPicData
                    };
                    reader2.addEventListener("load", async function readFile(event2) {

                        const nameparts = file2.name.split(".");
                        const filename = nameparts[0];
                        const mime = nameparts[1];
                        characterPicData2 = event2.target.result;

                        characterPicData2 = characterPicData2.split("base64")[1];
                        const characterPic2 = {
                            name: filename,
                            extention: mime,
                            path: characterPicData2
                        };


                        // ///////////////////////////////////
                        let d = Date(Date.now());
                        let a = d.toString();
                        const creationDate = a.substr(4, 20);
                        points(vBody);
                        points(vLineart);
                        points(vDetail);
                        points(vBackground);
                        const body = {
                            // Agrega todos los datos en conjunto para así poder subirlo a mongo

                            isActive: true,
                            character: idCharacter,
                            title: title,
                            descripcion: descripcion,
                            owner: idOwner,
                            cartoonist: idUser,
                            creationDate: creationDate,
                            team: friendsUser.team,
                            body: vBody,
                            lineart: vLineart,
                            detail: vDetail,
                            background: vBackground,
                            image: characterPic,
                            imageProfile: characterPic2,
                            points: puntuacion

                        };

                        const response = await fetch(`http://localhost:5000/draw`, {
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
                        } else { /*
        TEAM SWEET ID : 6375936aad8bffc948b4d770
        TEAM SPICY ID : 63759398ad8bffc948b4d778
      
        */

                            let body3;
                            if (friendsUser.team == "0") {
                                const response3 = await fetch(`/teams/6375936aad8bffc948b4d770`);
                                body3 = await response3.json();
                            } else {
                                const response3 = await fetch(`/teams/63759398ad8bffc948b4d778`);
                                body3 = await response3.json();
                            }

                            let puntosteam = parseInt(body3.points);

                            let TotalPoints = puntuacion + puntosteam;
                            const stringpoints = TotalPoints.toString();
                            console.log(TotalPoints);
                            console.log(stringpoints);
                            const bodyTeam = {
                                points: stringpoints
                            };

                            const response = await fetch(`/teams/${
                                body3._id
                            }`, {
                                method: "PATCH",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(bodyTeam)
                            });
                            const respJson = await response.json();
                            window.location.assign("/MisAtaques?idUser=" + idUser);
                        }
                    });
                });
                reader.readAsDataURL(file);
                reader2.readAsDataURL(file2);
            } else {
                setErrora("Sube la imagen del ataque");
            }
        }
        console.log(file);
        console.log(file2);

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
                        }>SUBIR ATAQUE</h1>
                    </div>
                </div>
            </div>

            <div className="row w-100" data-aos="fade-up" id="profile"
                style={
                    {
                        marginTop: "150px",
                        marginBottom: "150px"
                    }
            }>
                <div className="m-auto w-25" data-aos="fade-up" data-aos-delay="450" id="loginSection"
                    style={
                        {background: "rgb(255, 255, 255)"}
                }>
                    <form className="character"
                        onSubmit={attackCharacterHandler}
                        style={
                            {
                                marginBottom: "50px",
                                marginTop: "50px"
                            }
                    }>
                        <div class="container text-center" className="row center">
                            <div class="container text-center" className="col center">
                                <h4 style={
                                    {
                                        background: "rgb(120, 120, 120)",
                                        color: "rgb(255, 255, 255)",
                                        marginBottom: "30px"
                                    }
                                }>
                                    Dibujo a atacar:{" "} </h4>
                                <p className="form-label text-secondary"
                                    style={
                                        {
                                            color: "rgb(0,0,0)",
                                            marginBottom: "30px"
                                        }
                                }>
                                    {nameDraw}
                                    {" "} </p>
                                <img height="80" width="80"
                                    src={imageDraw}
                                    alt=" "
                                    className="form-img__img-preview"/>
                                <br></br>
                                <br></br>
                                <small className="form-label text-secondary"
                                    style={
                                        {
                                            background: "rgba(120, 120, 120, 0.5)",
                                            color: "rgb(0,0,0)",
                                            marginBottom: "30px"
                                        }
                                }>
                                    Id: {idCharacter}
                                    {" "} </small>
                            </div>
                            <h4 style={
                                {
                                    background: "rgb(120, 120, 120)",
                                    color: "rgb(255, 255, 255)",
                                    marginTop: "30px"
                                }
                            }>
                                Ingrese los datos
                            </h4>
                        </div>

                        <div className="row center"
                            style={
                                {
                                    background: "rgb(120, 120, 120)",
                                    marginTop: "10px",
                                    marginBottom: "20px"
                                }
                        }>
                            <div className="col center">
                                <div className="row"
                                    style={
                                        {margin: "15px"}
                                }></div>
                                <h2>Miniatura Del personaje</h2>
                                <img height="200" width="200"
                                    src={src2}
                                    alt={alt2}
                                    className="form-img__img-preview"/>
                                <input id="characterPic2" name="characterPic" type="file" accept=".jpeg, .jpg, .png, .bmp"
                                    onChange={handleImg2}/>
                                <h2>Personaje completo</h2>
                                <img style={
                                        {
                                            width: 400,
                                            maxHeight: 2400
                                        }
                                    }
                                    src={src}
                                    alt={alt}
                                    className="form-img__img-preview"/>
                                <br></br>
                                <br></br>

                                <input id="characterPic" name="characterPic" type="file" accept=".jpeg, .jpg, .png, .bmp"
                                    onChange={handleImg}/>

                            </div>
                        </div>

                        <div className="row"
                            style={
                                {margin: "30px"}
                        }></div>
                        <div className="form-group mb-3"></div>

                        <div className="form-group mb-3">
                            <div className="row center">
                                <div className="col center">
                                    <br></br>
                                    <label className="form-label text-secondary"
                                        style={
                                            {color: "rgb(255,255,255)!important"}
                                    }>
                                        Nombre
                                    </label>
                                    <input oninput="this.value = this.value.toUpperCase()" id="nameCharacter" name="nameCharacter" className="form-control" type="text" placeholder="Nombre"></input>
                                </div>
                            </div>
                        </div>

                        <div className="row"
                            style={
                                {margin: "15px"}
                        }></div>

                        <div className="form-group mb-3">
                            <div className="row center">
                                <div className="col center">
                                    <label className="form-label text-secondary"
                                        style={
                                            {color: "rgb(255,255,255)!important"}
                                    }>
                                        Descripcion
                                    </label>
                                    <input id="descripcionCharacter" name="descripcionCharacter" className="form-control" type="text" placeholder="Descripcion"></input>
                                    <br></br>
                                    <label className="form-label text-secondary"
                                        style={
                                            {color: "rgb(255,255,255)!important"}
                                    }>
                                        Rating
                                    </label>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <p>Detalles del cuerpo</p>
                                    <select id="cbBody" name="cbBody" class="form-select" aria-label="Default select example">
                                        {
                                        body.map((opt) => (
                                            <option value={opt}>
                                                {opt}</option>
                                        ))
                                    }
                                        {" "} </select>

                                    <p>Detalles del lineart</p>
                                    <select id="cbLineart" name="cbLineart" class="form-select" aria-label="Default select example">
                                        {
                                        lineart.map((opt) => (
                                            <option value={opt}>
                                                {opt}</option>
                                        ))
                                    }
                                        {" "} </select>

                                    <p>Detalles del Render</p>
                                    <select id="cbDetail" name="cbDetail" class="form-select" aria-label="Default select example">
                                        {
                                        detail.map((opt) => (
                                            <option value={opt}>
                                                {opt}</option>
                                        ))
                                    }
                                        {" "} </select>

                                    <p>Detalles del background</p>

                                    <select id="cbBackground" name="cbBackground" class="form-select" aria-label="Default select example">
                                        {
                                        background.map((opt) => (
                                            <option value={opt}>
                                                {opt}</option>
                                        ))
                                    }
                                        {" "} </select>

                                    <div className="row"
                                        style={
                                            {margin: "30px"}
                                    }></div>
                                    <p style={
                                        {color: "red"}
                                    }>
                                        {errorA}</p>
                                    <button id="logInButton" className="btn btn-info mt-2" type="submit"
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
