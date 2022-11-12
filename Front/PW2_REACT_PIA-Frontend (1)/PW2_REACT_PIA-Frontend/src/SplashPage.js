export function SplashPage()
{
return ( 
<>
<div className="carousel slide" data-bs-ride="carousel" data-bs-interval="false" data-bs-pause="false" data-bs-wrap="false" data-bs-keyboard="false" data-aos="fade-up" data-aos-delay="350" id="carousel-1" style=
    {{
    background: "url(https://cdn.bootstrapstudio.io/placeholders/1400x800.png)",
    marginBottom: "116px"}}>
    <div className="carousel-inner">
        <div className="carousel-item active" style={{background: "url(https://cdn.bootstrapstudio.io/placeholders/1400x800.png)"}}>
            <img className="w-100 d-block pulse animated" alt="Slide Image" style={{background: "url(assets/img/header-bg.jpg)"}} src="assets/img/wallpaperbetter.com_1920x1080.jpg" loading="lazy"></img>
        </div>
    </div>
</div>



<h2 className="display-4 text-center" data-aos="fade-up" data-aos-delay="350" style={{marginbottom: "53px", color: "rgb(255,255,255)"}}>¿ESTAS LISTO PARA PELEAR?</h2>


<section data-aos="fade-up" data-aos-delay="350">
    <div className="container">
        <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2">
                <div className="p-5"><img className="img-thumbnail img-fluid" src="assets/img/pexels-eduardo-dutra-2115217.jpg"></img></div>
            </div>
            <div className="col-lg-6 order-lg-1">
                <div className="p-5">
                    <h2 className="display-4" style={{color: "rgb(255,255,255)"}}>REGISTRATE</h2>
                    <p style={{color: "rgb(125,125,125)"}}>Al registrarte puedes ver tu perfil y subir arte propio para compartir y competir con otros usuarios.</p>
                    <div style={{textAlign: "center"}}><a className="btn btn-primary plat" role="button" href="login.php" style={{backgroundColor: "rgb(0,145,6)!important"}}>Registrate</a></div>
                </div>
            </div>
        </div>
    </div>
</section>



<section data-aos="fade-up" data-aos-delay="350">
    <div className="container">
        <div className="row align-items-center">
            <div className="col-lg-6 order-lg-1">
                <div className="p-5"><img className="img-thumbnail img-fluid" src="assets/img/luigi-lucarelli-opposites-01.jpg"></img></div>
            </div>
            <div className="col-lg-6 order-lg-2">
                <div className="p-5">
                    <h2 className="display-4" style={{color: "rgb(255,255,255)"}}>CONOCE</h2>
                    <p style={{color: "rgb(125,125,125)"}}>En nuestra seccion de artistas conoce a los mejores miembros para que puedas retarlos.</p>
                </div>
            </div>
        </div>
    </div>
</section>


<section data-aos="fade-up" data-aos-delay="350">
    <div className="container">
        <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2">
                <div className="p-5"><img className="img-thumbnail img-fluid" src="assets/img/pexels-kindel-media-6868185.jpg"></img></div>
            </div>
            <div className="col-lg-6 order-lg-1">
                <div className="p-5">
                    <h2 className="display-4" style={{color: "rgb(255,255,255)"}}>COMPITE</h2>
                    <p style={{color: "rgb(125,125,125)"}}> Una vez seleccionado el artista, tienen el tiempo limite especificado para competir.</p>
                </div>
            </div>
        </div>
    </div>
</section>


<section data-aos="fade-up" data-aos-delay="350" id="services" style={{background: "#818181"}}>
    <div className="container">
        <div className="row">
            <div className="col-lg-12 text-center">
                <h2 className="text-uppercase section-heading" style={{color: "rgb(255,255,255)"}}>COMUNIDAD</h2>
                <h3 className="section-subheading" style={{color: "rgb(255,255,255)"}}>COMPROMETIDOS CON USTEDES</h3>
            </div>
        </div>
        <div className="row text-center">
            <div className="col-md-4"><span className="fa-stack fa-4x"><i className="fa fa-circle fa-stack-2x text-primary"></i><i className="fa fa-users fa-stack-1x fa-inverse" style={{color: "rgb(0,255,255)"}}></i></span>
                <h4 className="section-heading" style={{color: "rgb(255,255,255)"}}>Competencia sana</h4>
                <p className="section-heading" style={{color: "rgb(255,255,255)"}}>Nuestros moderadores estan encargados de que la experiencia entre usuarios sea la mejor.</p>
            </div>
            <div className="col-md-4"><span className="fa-stack fa-4x"><i className="fa fa-circle fa-stack-2x text-primary"></i><i className="fa fa-star fa-stack-1x fa-inverse" style={{color: "rgb(255,229,0)"}}></i></span>
                <h4 className="section-heading" style={{color: "rgb(255,255,255)"}}>CALIDAD DE SERVICIO</h4>
                <p className="section-heading" style={{color: "rgb(255,255,255)"}}>Nuestros mejores ingenieros y desarrolladores buscan brindar la mejor experiencia para el usuario.</p>
            </div>
            <div className="col-md-4"><span className="fa-stack fa-4x"><i className="fa fa-circle fa-stack-2x text-primary"></i><i className="fa fa-lock fa-stack-1x fa-inverse" style={{color: "rgb(255,69,69)"}}></i></span>
                <h4 className="section-heading" style={{color: "rgb(255,255,255)"}}>Seguridad Web</h4>
                <p className="section-heading" style={{color: "rgb(255,255,255)"}}>Nuestro sitio es seguro, ninguna informacion que se te pida sera revelada a terceros.</p>

            </div>
        </div>
    </div>
</section>


<h2 className="display-4 text-center" data-aos="fade-up" data-aos-delay="350" style={{marginbottom: "12px", margintop: "72px", color: "rgb(255,255,255)"}}>NUESTROS&nbsp; PATROCINADORES OFICIALES</h2>


<section data-aos="fade-up" data-aos-delay="350" className="py-5" style={{marginbottom: "0px", margintop: "13px"}}>
    <div className="container">
        <div className="row">
            <div className="col-sm-6 col-md-3"><a><img className="img-fluid d-block mx-auto" src="assets/img/clients/creative-market.jpg"></img></a></div>
            <div className="col-sm-6 col-md-3"><a><img className="img-fluid d-block mx-auto" src="assets/img/clients/designmodo.jpg"></img></a></div>
            <div className="col-sm-6 col-md-3"><a><img className="img-fluid d-block mx-auto" src="assets/img/clients/envato.jpg"></img></a></div>
            <div className="col-sm-6 col-md-3"><a><img className="img-fluid d-block mx-auto" src="assets/img/clients/themeforest.jpg"></img></a></div>
        </div>
    </div>
</section>
</>
)


}