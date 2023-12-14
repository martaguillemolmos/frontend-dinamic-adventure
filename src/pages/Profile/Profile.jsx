import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { useEffect, useState } from "react";
import { profileUser, updateUser } from "../../services/apiCalls";
import { Button } from "@mui/material";

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

  const [isEnabled, setIsEnabled] = useState(true);
  const [originalProfile, setOriginalProfile] = useState(false);

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
          setOriginalProfile(results.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      //Si no contamos con un token almacenado en Redux, redirigimos al usuario a inicio.
      navigate("/");
    }
  }, [rdxToken]);

  const sendData = async () => {
    if (profileChange()) {
      await updateUser(rdxToken.credentials.token, profile)
        .then((response) => {
          console.log(response, "esto es la response");
          console.log(
            `Enhorabuena, ${profile.name}, los cambios se han realizado con éxito.`
          );
        })
        .catch((error) => {
          console.log(
            "Aquí quiero recuperar el error de la base de datos.",
            error
          );
        });
      setTimeout(() => {
        setIsEnabled(true);
      }, 1000);
    } else {
      console.log(
        `${profile.name}, no se han actualizado los campos porque no se ha modificado ningún campo.`
      );
      profileChange(false);
    }
    setIsEnabled(true);
  };

  const profileChange = () => {
    return (
      profile.name !== originalProfile.name ||
      profile.surname !== originalProfile.surname ||
      profile.phone !== originalProfile.phone ||
      profile.email !== originalProfile.email
    );
  };

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
              disabled={isEnabled}
              // label={"Nombre"}
              design={"inputDesign"}
              type={"text"}
              name={"name"}
              placeholder={""}
              value={profile.name}
              maxLength={"25"}
              functionProp={functionHandler}
            />
            <CustomInput
              disabled={isEnabled}
              // label={"Apellidos"}
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
              disabled={isEnabled}
              // label={"Dirección de email"}
              design={"inputDesign"}
              type={"email"}
              name={"email"}
              placeholder={""}
              maxLength={"50"}
              value={profile.email}
              functionProp={functionHandler}
            />
            <CustomInput
              disabled={isEnabled}
              // label={"Dirección de email"}
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
        {isEnabled ? (
          <Button
            variant="contained"
            className="button"
            onClick={() => setIsEnabled(!isEnabled)}
            style={{ textTransform: "none", fontFamily: "" }}
          >
            Edita tus datos
          </Button>
        ) : (
          <Button
            variant="contained"
            className="button"
            onClick={() => sendData()}
            style={{ textTransform: "none", fontFamily: "" }}
          >
            Enviar cambios
          </Button>
        )}
      </div>
      <div className="passwordContent">
        Contraseña
        <div className="passwordButton" onClick={() => navigate("/password")}>
          Modificar contraseña
        </div>
      </div>
    </div>

  );
};
