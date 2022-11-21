import NavBarMultimedia from "./NavBarMode";

export function DrawNavBar(props) {
  console.log(props.Errores.advice);
  if (props.Errores.advice != "Not Found") {
    return (
      <nav className="navbar navbar-dark navbar-expand-md bg-dark py-3">
        <NavBarMultimedia Propiedades={props.Errores}></NavBarMultimedia>
      </nav>
    );
  }
}
export default DrawNavBar;
