import "./Header.css";
import logoImage from "../../img/Logo.png";
import { LinkButton } from "../LinkButton/LinkButton";
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();

  return (
    <div className="headerDesign">
      <div className="image-logo" onClick={() => navigate("/")}>
        <img src={logoImage} alt="Logo" />
      </div>
      <div className="elements-nav">
        <LinkButton path={"/actividad-acuatica"} title={"Actividades acuáticas"} />
        <LinkButton path={"/actividad-terrestre"} title={"Actividades terrestres"} />
        <LinkButton path={"/contacto"} title={"Contacto"} />
        <LinkButton path={"/registro"} title={"Registarse"} />
        <div className="buttonSession" onClick={() => navigate("/login")}> Inicia sesión </div>        
        {/* <div className="buttonSession" onClick={() => navigate("/")}> RESERVA </div>         */}
      </div>
    </div>
  );
};
