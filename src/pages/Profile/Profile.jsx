import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { useEffect, useState } from "react";
import { profileUser } from "../../services/apiCalls";

export const Profile = () => {
  //Declaramos esta constante para que nos permita dirigirnos desde esta vista a otras.
  const navigate = useNavigate();
  // Instanciamos Redux en lectura
  const rdxToken = useSelector(userData);

  // Creamos un Hook con las propiedades que queremos mostrar en pantalla del perfil
  const [profile, setProfile] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    is_active: true,
  });

  const functionHandler = (e) => {
    setProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (rdxToken.credentials.success === true) {
      const token = rdxToken.credentials.token;

      profileUser(token)
        .then((results) => {
          console.log("aquí results", results);
          setProfile(results.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      //Si no contamos con un token almacenado en Redux, redirigimos al usuario a inicio.
      navigate("/");
    }
  }, []);

  return (
    <div className="profileDesign">
        <div className="contentProfile">
          <div className="cabecera">
            <div className="infoCabecera">
              {profile.name} {profile.surname}
            </div>
          </div>
          <div className="inforProfile">
            <div className="inforUser">
              Información básica
              <CustomInput
                label={"Nombre"}
                design={"inputDesign"}
                type={"text"}
                name={"name"}
                placeholder={""}
                value={profile.name}
                maxLength={"25"}
                functionProp={functionHandler}
              />
              <CustomInput
                label={"Apellidos"}
                design={"inputDesign"}
                type={"text"}
                name={"surname"}
                placeholder={""}
                maxLength={"25"}
                value={profile.surname}
                functionProp={functionHandler}
              />
              Información de contacto
              <CustomInput
                label={"Dirección de email"}
                design={"inputDesign"}
                type={"email"}
                name={"email"}
                placeholder={""}
                maxLength={"50"}
                value={profile.email}
                functionProp={functionHandler}
              />
              <CustomInput
                label={"Dirección de email"}
                design={"inputDesign"}
                type={"tel"}
                name={"phone"}
                placeholder={""}
                min={600000000}
                max={900000000}
                value={profile.phone || ""}
                functionProp={functionHandler}
              />
            </div>
          </div>
        </div>
    </div>
  );
};
