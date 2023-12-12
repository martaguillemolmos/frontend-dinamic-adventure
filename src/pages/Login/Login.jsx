import "./Login.css";
import letterLogo from "../../img/Letras.png";

import { CustomInput } from "../../common/CustomInput/CustomInput";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { validator } from "../../services/userful";
import { loginUser } from "../../services/apiCalls";
import { json, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rdxCredentials = useSelector(userData);

  // Declaramos las credenciales que vamos a solicitar para poder realizar el login.
  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });

  const [credencialesError, setCredencialesError] = useState({
    emailError: null,
    passwordError: null,
  });

  const functionHandler = (e) => {
    setCredenciales((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const errorCheck = (e) => {
    let error = "";
    error = validator(e.target.name, e.target.value);
    setCredencialesError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  useEffect(() => {
    //Comprobamos si ya hay un token almacenado en Redux
    if (rdxCredentials?.credentials.token) {
      console.log(rdxCredentials);
      //Si ya contamos con un token, redirigimos al usuario a inicio.
      navigate("/perfil");
    }
  });

  //Declaramos la constante logMe para que, en caso de logearnos guarde el token y nos envíe al profile y por el contrario, nos muestre el error que nos impide hacerlo.
  const logMe = () => {
    console.log("Email", credenciales.email);
    console.log("Password", credenciales.password);
    console.log("errores", credencialesError);
    if (
      credenciales.email != "" &&
      credenciales.password != "" &&
      credencialesError.emailError == null &&
      credencialesError.passwordError == null
    ) {
      console.log("aqui llega", credenciales);
      loginUser(credenciales)
        .then((resultado) => {
          console.log(resultado, "este es el resultado");
          dispatch(login({ credentials: resultado.data }));
          console.log("Mensaje", resultado.data.message);
        })
        .catch((error) => {
          if (error.response.status !== 200) {
            console.log(error.response.message);
            return json({
              show: true,
              title: `Error ${error.response.status}`,
              message: `${error.response.data.message}`,
            });
          }
        });
    }
  };

  return (
    <div className="loginDesign">
      <div className="contentLogin">
       <div className="headerLogo">
        <img
          src={letterLogo}
          alt="Logo"
          style={{ height: "4.1em" }}
        />
        </div>
        <div className="titleLogin">Inicia sesión</div>
        <div className="elementsLogin">
      <CustomInput
        required
        className="inputRegister"
        label={"Dirección de e-mail"}
        design={"inputDesign"}
        type={"email"}
        name={"email"}
        placeholder={""}
        value={""}
        maxLength={"50"}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <CustomInput
        required
        design={"inputDesign"}
        type={"password"}
        name={"password"}
        placeholder={""}
        value={""}
        maxLength={"12"}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      </div>
      <div className="loginButton">
      <Button
        variant="contained"
        className="button"
        onClick={logMe}
        style={{ textTransform: "none", fontFamily: "" }}
      >
        Iniciar sesión
      </Button>
      </div>
    </div>
    </div>
  );
};
