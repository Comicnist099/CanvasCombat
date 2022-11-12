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


export function Navbar()
{
    AOS.init({

      });

return (
    <>
    <nav className="navbar navbar-light navbar-expand-md sticky-top" style={{background: "rgba(0,0,0,0.69)", position: "relative", display: "-ms-flexbox", display:"flex", paddingTop: "1.5rem", paddingBottom: "1.5rem", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap"}}>



        <div className="container">
            <a className="navbar-brand" href="index.php" 
        style={{color: "rgb(255,255,255)",
            fontWeight: "bold",
            letterSpacing: "1px",
            borderStyle: "double"}}
        >
            &nbsp;CANVAS COMBAT&nbsp;
            </a>
            <button 
            data-bs-toggle="collapse" 
            className="navbar-toggler" 
            data-bs-target="#navcol-1">
                <span 
                className="visually-hidden">
                Toggle navigation
                </span>
                <span 
                className="navbar-toggler-icon">
                </span>
            </button>
            <div className="collapse navbar-collapse" id="navcol-1">
                
                <ul className="navbar-nav" style={{marginLeft: "0px"}}>

                    <li className="nav-item">
                        <a className="nav-link active" 
                        data-bss-hover-animate="pulse" 
                        href="index.php"
                        style={{color: "rgb(255,255,255)", marginRight: "0"}}>
                        <i className="fas fa-home"></i>&nbsp;INICIO</a></li>
                    <li 


                    className="nav-item dropdown">
                        <a className="dropdown-toggle nav-link" 
                        aria-expanded="false" 
                        data-bs-toggle="dropdown" 
                        href="#" style={{color: "rgb(255,255,255)", margintop: "0px"}}>
                        <i className="fa fa-search">
                        </i>&nbsp;BUSCAR&nbsp;</a>

                        <div className="dropdown-menu">
                        <a className="dropdown-item" href="products.php" style={{background: "#c2f2cc"}}>VER TODO</a>
                        <a className="dropdown-item" href="artistas.php">ARTISTAS</a>
                        <a className="dropdown-item" href="arte.php">ARTE</a>
                        <a className="dropdown-item" href="lights.php">COMPETENCIAS</a>
                        <a className="dropdown-item" href="decour.php">EXTRAS</a>
                        </div>
                    </li>


                    <li className="nav-item">
                        <a className="nav-link active" 
                        data-bss-hover-animate="pulse" 
                        href="aboutUs.php" 
                        style={{color: "rgb(255,255,255)", marginRight: "0px"}}>
                        <i className="fas fa-users"></i>&nbsp;NOSOTROS</a>
                    </li>


                    <li className="nav-item" id="loginNavbar">
                        <a className="nav-link active" 
                        data-bss-hover-animate="pulse" 
                        id="login" href="logIn.php" 
                        style={{color: "rgb(255,255,255)", marginRight: "0px"}}>
                        <i className="fas fa-key" style={{color: "rgb(0,240,255)"}}></i>&nbsp;INGRESAR</a>
                    </li>


                    <li className="nav-item" id="profile">
                        <a className="nav-link active" 
                        data-bss-hover-animate="pulse"  
                        href="profile.php" 
                        style={{color: "rgb(255,255,255)", marginRight: "0px"}}>
                        <i className="fas fa-user" style={{color: "rgb(0,255,10)"}}></i>&nbsp;PERFIL</a>
                    </li>


                </ul>
            </div>
        </div>
    </nav>
    </>
)


}