import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import {Link, Navigate, useNavigate, useSearchParams} from "react-router-dom";
import $, {data} from "jquery";

export function SubirAtaque() {

    const cookiesNew = new Cookies();
    const idUser = cookiesNew.get("idUser");
    const navigate = useNavigate();
    const [errorA, setErrora] = useState("");

    const [friendsUser, setfriendsUser] = useState();
    const [valBody, setValBody] = useState("");
    const [valLineart, setValLineart] = useState("");
    const [valDetail, setValDetail] = useState("");
    const [valBackground, setValBackground] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const [puntuacionHok, setPuntacionHok] = useState("");
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
        


    };

    const attackCharacterHandler = async (e) => { // Evento que sucede cuando presionas el boton de registrar
        e.preventDefault();
        console.log("hola");
        const title = $("#nameCharacter").val();
        const descripcion = $("#descripcionCharacter").val();
        const file = $("#characterPic")[0].files[0];
        const reader = new FileReader();
        const vBody = $("#cbBody").val();
        const vLineart = $("#cbLineart").val();
        const vDetail = $("#cbDetail").val();
        const vBackground = $("#cbBackground").val();
        console.log(title);

        if (title === '' || descripcion === '') {
            setErrora('Llene los campos vacios.');
        } else if (title.length < 5) {
            setErrora('El titulo debe tener más de 5 caracteres');
        } else if (descripcion.length < 5) {
            setErrora('La descripción debe tener más de 5 caracteres');
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
                        owner: "owner",
                        cartoonist: idUser,
                        creationDate: creationDate,
                        team: friendsUser.team,
                        body: vBody,
                        lineart: vLineart,
                        detail: vDetail,
                        background: vBackground,
                        image: characterPic,
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
                    } else {
                        navigate('/MisAtaques?idUser=' + idUser);
                    }

                });
                reader.readAsDataURL(file);
            } else {
                setErrora("Sube la imagen del ataque");
            }
        }
        console.log(file);
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
                        <div className="row center"
                            style={
                                {
                                    background: "rgb(120, 120, 120)",
                                    marginTop: "20px",
                                    marginBottom: "20px"
                                }
                        }>
                            <div className="col center">
                                <div className="row"
                                    style={
                                        {margin: "15px"}
                                }></div>

                                <img height="200" width="200"
                                    src={src}
                                    alt={alt}
                                    className="form-img__img-preview"/>
                                <br></br>
                                <input id="characterPic" name="characterPic" type="file" accept=".jpeg, .jpg, .png, .bmp"
                                    onChange={handleImg}/>
                            </div>
                            <br></br>
                        </div>

                        <div className="row"
                            style={
                                {margin: "30px"}
                        }></div>
                        <div className="form-group mb-3">
                            <div className="row center">
                                <div className="col center">
                                    <label className="form-label text-secondary"
                                        style={
                                            {color: "rgb(255,255,255)!important"}
                                    }>
                                        ID CHARACTER
                                    </label>
                                    <input disabled
                                        value={idCharacter}
                                        oninput="this.value = this.value.toUpperCase()"
                                        id="idCharacter"
                                        name="idCharacter"
                                        className="form-control"
                                        type="text"
                                        placeholder="Nombre"></input>
                                </div>
                            </div>
                        </div>

                        <div className="form-group mb-3">
                            <div className="row center">
                                <div className="col center">
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
                                    <select value={valBody}
                                        id="cbBody"
                                        name="cbBody"
                                        onChange={
                                            (e) => setValBody(e.target.value)
                                        }
                                        class="form-select"
                                        aria-label="Default select example">
                                        {
                                        body.map((opt) => (
                                            <option value={opt}>
                                                {opt}</option>
                                        ))
                                    } </select>

                                    <p>Detalles del lineart</p>
                                    <select value={valLineart}
                                        id="cbLineart"
                                        name="cbLineart"
                                        onChange={
                                            (e) => setValLineart(e.target.value)
                                        }
                                        class="form-select"
                                        aria-label="Default select example">
                                        {
                                        lineart.map((opt) => (
                                            <option value={opt}>
                                                {opt}</option>
                                        ))
                                    } </select>

                                    <p>Detalles del Render</p>
                                    <select value={valDetail}
                                        id="cbDetail"
                                        name="cbDetail"
                                        onChange={
                                            (e) => setValDetail(e.target.value)
                                        }
                                        class="form-select"
                                        aria-label="Default select example">
                                        {
                                        detail.map((opt) => (
                                            <option value={opt}>
                                                {opt}</option>
                                        ))
                                    } </select>

                                    <p>Detalles del background</p>

                                    <select value={valBackground}
                                        id="cbBackground"
                                        name="cbBackground"
                                        onChange={
                                            (e) => setValBackground(e.target.value)
                                        }
                                        class="form-select"
                                        aria-label="Default select example">
                                        {
                                        background.map((opt) => (
                                            <option value={opt}>
                                                {opt}</option>
                                        ))
                                    } </select>

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
