/*import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle' 

import '../node_modules/aos/dist/aos.css'
import '../node_modules/aos/dist/aos.js'
import '../node_modules/animate.css/animate.min.css'
/
/*
import './App.css';
import './fonts/fontawesome-all.min.css';
import './fonts/font-awesome.min.css';
import './fonts/fontawesome5-overrides.min.css';
import './css/-Filterable-Gallery-with-Lightbox-BS4-.css';
import './css/-Login-form-Page-BS4-.css';
import './css/best-carousel-slide.css';
import './css/Pretty-Footer.css';
import './css/Profile-Edit-Form.css';
import './css/Standard-Picture-Header.css';
import './css/styles.css';
import './css/Timeline.css';
*/
import AOS from 'aos';
import Cookies from "universal-cookie";
import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";


export function Navbar() {
    let [renderedResponsea, setRenderedResponsea] = useState();
    const getResponse = async () => {
        const response = await fetch(`/teams/`);
        const body = await response.json();

        setRenderedResponsea(body[0].points);
        console.log(body);

        if (response.status !== 200) 
            throw Error(body.message);
        


    };

    useEffect(() => {
        getResponse();
    }, []);


    const cookiesNew = new Cookies();
    const idUserCookies = cookiesNew.get("idUser");

    const ProfileID = (source) => {
        if (source) {
            return (
                <li className="nav-item" id="profile">
                    <a className="nav-link active" data-bss-hover-animate="pulse"
                        href={
                            "profile?idUser=" + idUserCookies
                        }
                        style={
                            {
                                color: "rgb(255,255,255)",
                                marginRight: "0px"
                            }
                    }>
                        <i className="fas fa-user"
                            style={
                                {color: "rgb(0,255,10)"}
                        }></i>&nbsp;PERFIL</a>
                </li>
            )
        } else {
            return (
                <li className="nav-item" id="loginNavbar">
                    <a className="nav-link active" data-bss-hover-animate="pulse" id="login" href="logIn.php"
                        style={
                            {
                                color: "rgb(255,255,255)",
                                marginRight: "0px"
                            }
                    }>
                        <i className="fas fa-key"
                            style={
                                {color: "rgb(0,240,255)"}
                        }></i>&nbsp;INGRESAR</a>
                </li>
            );
        }

    }


    AOS.init({});

    return (
        <>
            <nav className="navbar navbar-light navbar-expand-md sticky-top"
                style={
                    {
                        background: "rgba(0,0,0,0.69)",
                        position: "relative",
                        display: "-ms-flexbox",
                        display: "flex",
                        paddingTop: "1.5rem",
                        paddingBottom: "1.5rem",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap"
                    }
            }>


                <div className="container">
                    <img style={
                            {
                                width: "80px",
                                height: "80px",
                                marginRight: "20px"

                            }
                        }
                        src="https://cdn.discordapp.com/attachments/921926176484773909/1042324661100367882/canvascombat.png"></img>
                    <a className="navbar-brand" href="/"
                        style={
                            {
                                color: "rgb(255,255,255)",
                                fontWeight: "bold",
                                letterSpacing: "1px",
                                borderStyle: "double"
                            }
                    }>
                        &nbsp;CANVAS COMBAT&nbsp;
                    </a>
                    <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1">
                        <span className="visually-hidden">
                            Toggle navigation
                        </span>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navcol-1">

                        <ul className="navbar-nav"
                            style={
                                {marginLeft: "0px"}
                        }>

                            <li className="nav-item">
                                <a className="nav-link active" data-bss-hover-animate="pulse" href="/DashBoardCharacter"
                                    style={
                                        {
                                            color: "rgb(82, 194, 222)",
                                            marginRight: "0"
                                        }
                                }>
                                    <i className="fas fa-users "></i>&nbsp;Characters</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" data-bss-hover-animate="pulse" href="/DashBoardAttacks"
                                    style={
                                        {
                                            color: "rgb(255,0,0)",
                                            marginRight: "0"
                                        }
                                }>
                                    <i className="fa fa-pencil"></i>&nbsp;Ataques</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"
                                    style={
                                        {
                                            color: "rgb(255,255,255)",
                                            margintop: "0px"
                                        }
                                }>
                                    <i className="fa fa-search"></i>&nbsp;BUSCAR&nbsp;</a>

                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="products.php"
                                        style={
                                            {background: "#c2f2cc"}
                                    }>VER TODO</a>
                                    <a className="dropdown-item" href="artistas.php">ARTISTAS</a>
                                    <a className="dropdown-item" href="arte.php">ARTE</a>
                                    <a className="dropdown-item" href="lights.php">COMPETENCIAS</a>
                                    <a className="dropdown-item" href="decour.php">EXTRAS</a>
                                </div>
                            </li>


                            <li className="nav-item">
                                <a className="nav-link active" data-bss-hover-animate="pulse" href="AboutUs"
                                    style={
                                        {
                                            color: "rgb(241, 210, 92)",
                                            marginRight: "0px"
                                        }
                                }>
                                    <i className="fa fa-id-card"></i>&nbsp;NOSOTROS</a>
                            </li>
                            {
                            ProfileID(idUserCookies)
                        } </ul>
                    </div>
                </div>
            </nav>

            <nav className="navbar navbar-light navbar-expand-md sticky-top"
                style={
                    {
                        background: "rgba(0,0,0,0.69)",
                        position: "relative",
                        display: "-ms-flexbox",
                        display: "flex",
                        paddingTop: "1.5rem",
                        paddingBottom: "1.5rem",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap"
                    }
            }>

                <div class="container text-center">
                    <img class="rounded-circle mt-2"
                        style={
                            {width: "100px"}
                        }
                        src="https://imgs.search.brave.com/ENUo9l3BOvV5yLCCUowVZN0Dq0bb5gZJ_ll_dkodoJU/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vei9jYXJ0/b29uLWhhcHB5LXNw/aWN5LXJlZC1jaGls/bHktaG90LXBlcHBl/ci12ZWN0b3ItaWxs/dXN0cmF0aW9uLWNo/LWV4dHJlbWVseS1z/dXBlci1jaGlsbGkt/cGFwcmlrYS1zbWls/aW5nLWFudGhyb3Bv/bW9ycGhpYy1jaGFy/YWN0ZXItNzgwMjI2/MzEuanBn"></img>

                    <h1>{renderedResponsea}</h1>
                    <img style={
                            {width: "130px"}
                        }
                        src="https://imgs.search.brave.com/I2dUrj3S0tsfefPU8uRnydukNfHiNoRSAv7RRy81Nik/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzA2LzFk/L2RlLzA2MWRkZTFj/MTY5NzdmN2QyYWUz/YTJjNjk3NmU2YTk5/LnBuZw"></img>
                    <h1>PUNTOS</h1>
                    <img class="rounded-circle mt-2"
                        style={
                            {width: "100px"}
                        }
                        src="https://imgs.search.brave.com/ENUo9l3BOvV5yLCCUowVZN0Dq0bb5gZJ_ll_dkodoJU/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vei9jYXJ0/b29uLWhhcHB5LXNw/aWN5LXJlZC1jaGls/bHktaG90LXBlcHBl/ci12ZWN0b3ItaWxs/dXN0cmF0aW9uLWNo/LWV4dHJlbWVseS1z/dXBlci1jaGlsbGkt/cGFwcmlrYS1zbWls/aW5nLWFudGhyb3Bv/bW9ycGhpYy1jaGFy/YWN0ZXItNzgwMjI2/MzEuanBn"></img>


                </div>


            </nav>


        </>
    )


}
export default Navbar;
