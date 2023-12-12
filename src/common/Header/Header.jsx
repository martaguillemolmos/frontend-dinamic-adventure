import "./Header.css";
import logoImage from "../../img/Logo.png";
import { LinkButton } from "../LinkButton/LinkButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../../pages/userSlice";

export const Header = () => {
  const navigate = useNavigate();
  const rdxToken = useSelector(userData);
  // console.log("este token es lo mejor", rdxToken);

  const dispatch = useDispatch();

  const logOutMe = () => {
    dispatch(logout({ credentials: "" }));
    navigate("/");
  };

  return (
    <div className="headerDesign">
      {/* Vistas públicas */}
      <div className="image-logo" onClick={() => navigate("/")}>
        <img src={logoImage} alt="Logo" />
      </div>
      <div className="elements-nav">
        <LinkButton
          path={"/actividad-acuatica"}
          title={"Actividades acuáticas"}
        />
        <LinkButton
          path={"/actividad-terrestre"}
          title={"Actividades terrestres"}
        />
        <LinkButton path={"/contacto"} title={"Contacto"} />
        {/* Vistas si tienes o no token almacenado en Redux*/}
        {/* No tienes token almacenado en Redux*/}
        {rdxToken.credentials == "" ? (
          <>
            <LinkButton path={"/registro"} title={"Registarse"} />
            <div className="buttonSession" onClick={() => navigate("/login")}>
              Inicia sesión
            </div>
          </>
        ) : (
          <>
            <LinkButton path={"/profile"} title={"Perfil"} />
            <div className="buttonSession" onClick={logOutMe} path={"/"}>
              Cerrar sesión
            </div>
          </>
        )}
      </div>
    </div>
  );
};
