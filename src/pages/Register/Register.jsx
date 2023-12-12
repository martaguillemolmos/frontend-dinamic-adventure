import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/userful";
import "./Register.css";
import letterLogo from "../../img/Letras.png";
import { json, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { login, userData } from "../userSlice";
import { createUser } from "../../services/apiCalls";

export const Register = () => {
  //Declaramos esta constante para que nos permita dirigirnos desde esta vista a otras.
  const navigate = useNavigate();

  //Declaramos esta constante, que nos permitirá leer el contenido.
  const dispatch = useDispatch();

  const rdxCredentials = useSelector(userData);

  const [registerData, setRegisterData] = useState({
    name: "",
    surname: "",
    phone: 0,
    email: "",
    password: "",
  });

  const [registerDataError, setRegisterDataError] = useState({
    nameError: "",
    surnameError: "",
    phoneError: "",
    emailError: "",
    passwordError: "",
  });

  const functionHandler = (e) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const errorCheck = (e) => {
    let error = "";
    error = validator(e.target.name, e.target.value);
    setRegisterDataError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  useEffect(() => {
    //Comprobamos si ya hay un token almacenado en Redux
    if (rdxCredentials?.credentials.token) {
      console.log(rdxCredentials);
      //Si ya contamos con un token, redirigimos al usuario a su perfil.
      navigate("/perfil");
    }
  });

  //Registrar nuevos usuarios.
  const registerUser = () => {
    const dataErrorValues = Object.values(registerDataError);
    console.log("dataerrpr", dataErrorValues);
    if (dataErrorValues.some((value) => value == "")) {
      console.log("datos", registerData);
      console.log("dataerror", registerDataError);
      const data = {
        ...registerData,
        phone: parseInt(registerData.phone),
      };
      console.log("¿y aqui?", data);
      createUser(data)
        .then((resultado) => {
          dispatch(login({ credentials: resultado.data }));
          setTimeout(() => {
            navigate("/");
          }, 100);
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
    } else {
      console.log("Habido un problema.");
    }
  };

  return (
    <div className="registerDesign">
        <div className="headerLogo">
        <img
          src={letterLogo}
          alt="Logo"
          style={{ height: "4.1em" }}
        />
        </div>
        <div className="content">
            <div className="titleRegister">Crear cuenta</div>
          <div className="elementsRegister">
          <CustomInput
            required
            label={"Nombre"}
            design={"inputDesign"}
            type={"text"}
            name={"name"}
            placeholder={""}
            value={""}
            maxLength={"50"}
            functionProp={functionHandler}
            functionBlur={errorCheck}
          />
          <CustomInput
            requiered
            label={"Apellidos"}
            design={"inputDesign"}
            type={"text"}
            name={"surname"}
            placeholder={""}
            value={""}
            maxLength={"50"}
            functionProp={functionHandler}
            functionBlur={errorCheck}
          />
          <CustomInput
            required
            label={"Teléfono"}
            design={"inputDesign"}
            type={"tel"}
            name={"phone"}
            placeholder={""}
            min={600000000}
            max={900000000}
            value={""}
            functionProp={functionHandler}
            functionBlur={errorCheck}
          />
          <CustomInput
            required
            label={"Dirección de e-mail"}
            design={"inputDesign"}
            type={"email"}
            name={"email"}
            placeholder={""}
            value={""}
            maxLength={"100"}
            functionProp={functionHandler}
            functionBlur={errorCheck}
          />
          <CustomInput
            required
            label={"Password"}
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
          <div className="buttonCreateUser" onClick={registerUser} path={"/"}>
              Registarme
            </div>
          
        </div>
    </div>
  );
};
