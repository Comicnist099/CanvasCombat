

export function Profile()
{
return ( 
<>

<nav className="navbar navbar-dark navbar-expand-md bg-dark py-3" style={{background: "#696969 !important"}}>
    <div className="container"><button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-6"><span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
        <div id="navcol-6" className="collapse navbar-collapse flex-grow-0 order-md-first">
            <ul className="navbar-nav me-auto">

                <li className="nav-item"><a className="nav-link active" id="lists" href="Logros" style={{textSlign: "center"}}>LOGROS</a></li>
                <li className="nav-item"><a className="nav-link active" id="orders" href="SubirPersonaje" style={{textAlign: "center"}}>SUBIR PERSONAJE</a></li>

                <li className="nav-item"><a className="nav-link active" id="myProducts" href="SubirAtaque" style={{textAlign: "center"}}>SUBIR ATAQUE</a></li>
                <li className="nav-item"><a className="nav-link active" id="myProducts" href="MisPersonajes" style={{textAlign: "center"}}>MIS PERSONAJES</a></li>

            </ul>
        </div>
    </div>
</nav>





<div className="container profile profile-view" data-aos="fade-up" id="profile" style={{marginTop: "50px", background: "rgb(129, 129, 129)"}}>


            <div className="row" style={{background: "rgba(255,255,255,0.37)"}}>


                <div className="col-md-4 content-right">
                    <div className="avatar" style={{marginTop: "21px"}}>
                        <div className="avatar-bg center"></div>
                        <input className="form-control form-control" type="file" name="avatar-file" style={{marginTop: "24px"}}></input>
                    </div>
                </div>

                <div className="col-md-8 " >

                    <h1> USUARIO </h1>
                    <hr></hr>
                    
                <form>
                    <div className="row">

                        <div className="col-sm-12 col-md-6">
                            <div className="form-group mb-3">
                                <label className="form-label">Firstname </label>
                                <input className="form-control" type="text" name="firstname" value="NOMBRE COMPLETO" disabled></input>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-6">
                            <div className="form-group mb-3">
                                <label className="form-label">Lastname </label>
                                <input className="form-control" type="text" name="lastname" value="APELLIDOS" disabled></input>
                            </div>
                        </div>

                    </div>


                    <div className="form-group mb-3">
                        <label className="form-label">Email </label>
                        <input className="form-control" type="email" autocomplete="off" required="" name="email" disabled value="CORREO"></input>
                    </div>

                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <div className="form-group mb-3">
                                <label className="form-label">Password </label>
                                <input className="form-control" type="password" name="password" autocomplete="off" required="" value="CONTRA" disabled ></input>
                            </div>
                        </div>
                    </div>

                    <hr></hr>


                    <div className="row">
                        <div className="col-md-12 content-right" style={{marginBottom: "19px"}}>
                            <button className="btn btn-danger" type="button" onclick="logOut()">LOG OUT </button>
                        </div>
                    </div>
                    </form>
                    
                </div>
            </div>
        </div>
</>
)


}