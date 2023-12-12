import { Button } from "@mui/material";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/userful";
import "./Register.css";
import { json, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../userSlice";
import { createUser } from "../../services/apiCalls";

export const Register = () => {
  //Declaramos esta constante para que nos permita dirigirnos desde esta vista a otras.
  const navigate = useNavigate();

  //Declaramos esta constante, que nos permitirá leer el contenido.
  const dispatch = useDispatch();

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
          console.log("guardamos token", resultado);
          //Guardanos el token
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
      console.log("Hay un problema");
    }
  };

  return (
    <div className="pagesAuth">
      <div className="container">
        <div className="left"></div>
        <div className="center">
          Register AQUÍ
          <CustomInput
            required
            className="inputRegister"
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
          <Button variant="contained" className="button" onClick={registerUser}>
            Crea tu cuenta
          </Button>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
};
