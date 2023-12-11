import "./Header.css";
import logoImage from "../../img/Logo.png";
import { LinkButton } from "../LinkButton/LinkButton";
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();

  return (
    <div className="headerDesign">
      <div className="image-logo">
        <img src={logoImage} alt="Logo" />
      </div>
      <div className="elements-nav">
        <LinkButton path={"/"} title={"Actividades acuáticas"} />
        <LinkButton path={"/"} title={"Actividades terrestres"} />
        <LinkButton path={"/"} title={"Contacto"} />
        <LinkButton path={"/"} title={"Registarse"} />
        <div className="buttonSession" onClick={() => navigate("/")}> Inicia sesión </div>        
        {/* <div className="buttonSession" onClick={() => navigate("/")}> RESERVA </div>         */}
      </div>
    </div>
  );
};
