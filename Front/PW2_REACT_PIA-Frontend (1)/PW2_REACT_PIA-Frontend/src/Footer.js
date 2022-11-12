
export function Footer()
{
return (
    <footer data-aos="fade" data-aos-duration="550" data-aos-delay="800" id="footer" style={{backgroundColor: "rgb(0,0,0)"}}>
    <div className="row">
        <div className="col-sm-6 col-md-4 footer-navigation"><a className="navbar-brand" href="index.php" style={{color: "rgb(255,255,255)", fontWeight: "bold", letterSpacing: "1px", borderStyle: "double"}}>&nbsp;CANVAS COMBAT&nbsp;</a>
            <p className="company-name">Canvas Combat © 2022 </p>
        </div>
        <div className="col-sm-6 col-md-4 footer-contacts">
            <div><span className="fa fa-map-marker footer-contacts-icon"> </span>
                <p><span className="new-line-span">Calle Pino #8</span> Paris, Francia</p>
            </div>
            <div><i className="fa fa-phone footer-contacts-icon"></i>
                <p className="footer-center-info email text-start"> +1 555 123456</p>
            </div>
            <div><i className="fa fa-envelope footer-contacts-icon"></i>
                <p> <a href="#" target="_blank">canvasCombat@outlook.com</a></p>
            </div>
        </div>
        <div className="col-md-4 footer-about">
            <h4>Acerca de este sitio</h4>
            <p> ¡Diviertete y conoce gente!&nbsp;</p>
            <div className="social-links social-icons">
                <a href="https://www.facebook.com/">
                    <i className="fa fa-facebook"></i>
                </a>
                <a href="https://twitter.com/">
                    <i className="fa fa-twitter"></i>
                </a>
                </div>
        </div>
    </div>
</footer>
)

}