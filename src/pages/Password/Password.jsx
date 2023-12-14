import { json, useNavigate } from "react-router-dom";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import "./Password.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../userSlice";
import { useEffect, useState } from "react";
import { validator } from "../../services/userful";
import { updatePassword } from "../../services/apiCalls";
import { Button } from "@mui/material";

export const Password = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const rdxToken = useSelector(userData);

  const [newPassword, setNewPassword] = useState({
    passwordOld: "",
    password: "",
  });
  const [newPasswordError, setNewPasswordError] = useState({
    passwordOld: "",
    password: "",
  });

  console.log(newPasswordError);
  const passwordPattern = "^[a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ]+$";

  useEffect(() => {
    if (rdxToken.credentials == "") {
      navigate("/");
    }
  }, [rdxToken]);

  const functionHandler = (e) => {
    setNewPassword((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const errorCheck = (e) => {
    let error = "";
    error = validator(e.target.name, e.target.value);
    setNewPasswordError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const Update = () => {
    if (
      newPassword.password !== "" &&
      newPassword.passwordOld !== "" &&
      newPassword.password !== newPassword.passwordOld
    ) {
      const token = rdxToken.credentials.token;
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

  return (
    <div className="passwordDesign">
      <div className="container">
        Password
        <CustomInput
          label={"Contraseña actual"}
          design={"inputDesign"}
          type={"password"}
          name={"passwordOld"}
          placeholder={""}
          value={""}
          maxLength={"12"}
          functionProp={functionHandler}
          functionBlur={errorCheck}
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
          functionProp={functionHandler}
          functionBlur={errorCheck}
        />
      </div>
      <Button
        variant="contained"
        className="button"
        onClick={Update}
        style={{ textTransform: "none", fontFamily: "" }}
      >
        Cambiar contraseña
      </Button>
    </div>
  );
};
