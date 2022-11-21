export function NavBarMode(props) {
  if (props.Propiedades.idUser === props.Propiedades.idUserCookies) {
    return (
      <div className="container">
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navcol-6"
        >
          <span className="visually-hidden">Toggle navigation</span>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          id="navcol-6"
          className="collapse navbar-collapse flex-grow-0 order-md-first"
        >
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a
                class="btn btn-dark"
                id="lists"
                href={"Logros?idUser=" + props.Propiedades.idUser}
                style={{ textSlign: "center" }}
              >
                LOGROS
              </a>
            </li>
            <li className="nav-item">
              <a
                class="btn btn-dark"
                id="orders"
                href="SubirPersonaje"
                style={{ textAlign: "center" }}
              >
                SUBIR PERSONAJE
              </a>
            </li>
            <li className="nav-item">
              <a
                class="btn btn-dark"
                id="editButton"
                name="editButton "
                type="button"
                href={"MisPersonajes?idUser=" + props.Propiedades.idUser}
              >
                Mis Personajes
              </a>
            </li>
            <li className="nav-item">
              <a
                class="btn btn-dark"
                id="myProducts"
                href={"MisAtaques?idUser=" + props.Propiedades.idUser}
                style={{ textAlign: "center" }}
              >
                MIS ATAQUES
              </a>
            </li>
            <li className="nav-item">
              <a
                class="btn btn-dark"
                id="myProducts"
                href={"MisDefensas?idUser=" + props.Propiedades.idUser}
                style={{ textAlign: "center" }}
              >
                MIS DEFENSAS
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navcol-6"
        >
          <span className="visually-hidden">Toggle navigation</span>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          id="navcol-6"
          className="collapse navbar-collapse flex-grow-0 order-md-first"
        >
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a
                class="btn btn-dark"
                id="lists"
                href={"Logros?idUser=" + props.Propiedades.idUser}
                style={{ textSlign: "center" }}
              >
                SUS LOGROS
              </a>
            </li>

            <li className="nav-item">
              <a
                class="btn btn-dark"
                id="myProducts"
                href={"MisPersonajes?idUser=" + props.Propiedades.idUser}
                style={{ textAlign: "center" }}
              >
                SUS PERSONAJES
              </a>
            </li>
            <li className="nav-item">
              <a
                class="btn btn-dark"
                id="myProducts"
                href={"MisAtaques?idUser=" + props.Propiedades.idUser}
                style={{ textAlign: "center" }}
              >
                SUS ATAQUES
              </a>
            </li>
            <li className="nav-item">
              <a
                class="btn btn-dark"
                id="editButton"
                name="editButton "
                type="button"
                href={"MisDefensas?idUser=" + props.Propiedades.idUser}
              >
                Sus Defensas
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default NavBarMode;
