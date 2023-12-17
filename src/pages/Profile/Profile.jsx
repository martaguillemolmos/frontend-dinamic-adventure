import "./Profile.css";
import { json, useNavigate } from "react-router-dom";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../userSlice";
import { useEffect, useState } from "react";
import {
  deactivateAccount,
  profileUser,
  updatePassword,
  updateUser,
} from "../../services/apiCalls";
import { Button } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { TabBar } from "../../common/CustomTabs/CustomTabs";

export const Profile = () => {
  //Declaramos esta constante para que nos permita dirigirnos desde esta vista a otras.
  const navigate = useNavigate();
  // Instanciamos Redux en lectura
  const rdxToken = useSelector(userData);
  console.log(rdxToken, "dime que tienes tokennn");
  const dispatch = useDispatch();

  // Creamos un Hook con las propiedades que queremos mostrar en pantalla del perfil
  const [profile, setProfile] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    is_active: true,
  });

  const [newPassword, setNewPassword] = useState({
    passwordOld: "",
    password: "",
  });

  const [isEnabled, setIsEnabled] = useState(true);

  const [originalProfile, setOriginalProfile] = useState(false);

  const functionHandler = (e) => {
    setProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const functionHandlerPassword = (e) => {
    setNewPassword((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const Update = () => {
    if (
      newPassword.password !== "" &&
      newPassword.passwordOld !== "" &&
      newPassword.password !== newPassword.passwordOld
    ) {
      const token = rdxToken.credentials.token;
      console.log(token);
      updatePassword(token, newPassword)
        .then(() => {
          //Añadir control Snackbar
          dispatch(logout({ credentials: "" }));
          navigate("/");
        })
        .catch((error) => {
          if (error.response.status !== 200) {
            console.log(error.response);
            return json({
              show: true,
              title: `Error ${error.response.status}`,
              message: `${error.response.data}`,
            });
          }
        });
    }
  };
  console.log(newPassword);

  const profileChange = () => {
    return (
      profile.name !== originalProfile.name ||
      profile.surname !== originalProfile.surname ||
      profile.phone !== originalProfile.phone ||
      profile.email !== originalProfile.email
    );
  };

  const [tabValue, setTabValue] = useState("null");

  const customTabs = [
    { label: "Perfil", value: "null" },
    { label: "Cuenta y seguridad", value: "cuenta" },
  ];

  const handlerTab = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === "null") {
      return;
    } else {
      newValue === "cuenta";
      return;
    }
  };

  const passwordPattern = "^[a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ]+$";

  useEffect(() => {
    if (rdxToken.credentials !== "") {
      const token = rdxToken.credentials.token;
      const decoredToken = jwtDecode(token);
      profileUser(token)
        .then((results) => {
          console.log("aquí results", results);
          setProfile(results.data.data);
          setOriginalProfile(results.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
      if (decoredToken.is_active !== true) {
        navigate("/");
      }
    } else {
      //Si no contamos con un token almacenado en Redux, redirigimos al usuario a inicio.
      navigate("/");
    }
  }, [rdxToken]);

  const sendData = async () => {
    if (profileChange()) {
      await updateUser(rdxToken.credentials.token, profile)
        .then(() => {
          dispatch(logout({ credentials: "" }));
          navigate("/");
          return json(
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

  const sendAccount = async () => {
    if (profile.is_active === true) {
      try {
        await deactivateAccount(rdxToken.credentials.token, {
          is_active: "false",
        });
        dispatch(logout({ credentials: "" }));
        navigate("/");
        console.log(
          `Enhorabuena, ${profile.name}, los cambios se han realizado con éxito.`
        );
      } catch (error) {
        console.log(
          "Aquí quiero recuperar el error de la base de datos.",
          error
        );
      }
    }
  };
  return (
    <div className="profileDesign">
      <div className="contentProfile">
        <div className="summaryProfile">
          <div className="infoCabecera">
            <div className="nameUser">
              {" "}
              {profile.name} {profile.surname}
            </div>
            <div className="roleUser">
              {profile.role}: {profile.email}
            </div>
            <div className="avatarUser">Avatar</div>
            <div className="userSince">Miembro desde: {profile.created_at}</div>
          </div>
        </div>

        <div className="inforProfile">
          <TabBar tabs={customTabs} value={tabValue} handler={handlerTab} />
          {tabValue === "null" && (
            <div className="inforUser">
              <div className="titleProfile">Información básica</div>
              <div className="fieldsProfile">
                <CustomInput
                  disabled={isEnabled}
                  label={"Nombre"}
                  design={"inputDesign"}
                  type={"text"}
                  name={"name"}
                  placeholder={""}
                  value={profile.name}
                  maxLength={"25"}
                  functionProp={functionHandler}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <CustomInput
                  disabled={isEnabled}
                  label={"Apellidos"}
                  design={"inputDesign"}
                  type={"text"}
                  name={"surname"}
                  placeholder={""}
                  maxLength={"25"}
                  value={profile.surname}
                  functionProp={functionHandler}
                />
              </div>
              <div className="titleProfile">Información de contacto</div>
              <div className="fieldsProfile">
                <CustomInput
                  disabled={isEnabled}
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
                  disabled={isEnabled}
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
          )}
          {tabValue === "cuenta" && (
            <div className="inforUser">
              Contraseña
              <CustomInput
                label={"Contraseña actual"}
                design={"inputDesign"}
                type={"password"}
                name={"passwordOld"}
                placeholder={""}
                value={""}
                maxLength={"12"}
                functionProp={functionHandlerPassword}
              />
              <CustomInput
                label={"Nueva contraseña"}
                design={"inputDesign"}
                type={"password"}
                name={"password"}
                pattern={passwordPattern}
                placeholder={""}
                value={""}
                maxLength={"12"}
                functionProp={functionHandlerPassword}
              />
              <Button
                variant="contained"
                className="button"
                onClick={Update}
                style={{ textTransform: "none", fontFamily: "" }}
              >
                Cambiar contraseña
              </Button>
              <div className="accountChange">
                Inactivar la cuenta
                <Button
                  variant="contained"
                  className="button"
                  onClick={() => {
                    sendAccount();
                  }}
                  style={{ textTransform: "none", fontFamily: "" }}
                >
                  Deshabilita tu cuenta
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
