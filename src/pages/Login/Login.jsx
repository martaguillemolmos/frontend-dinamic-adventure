import "./Login.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { useEffect, useState } from "react";

export const Login = () => {
  // Declaramos las credenciales que vamos a solicitar para poder realizar el login.
  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });

  const functionHandler = (e) => {
    setCredenciales((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    console.log(credenciales);
  }, [credenciales]);

  return (
    <div className="pagesAuth">
      <CustomInput
        design={"inputDesign"}
        type={"email"}
        name={"email"}
        placeholder={""}
        // value={}
        functionProp={functionHandler}
        // onBlur={}
      />
      <CustomInput
        design={"inputDesign"}
        type={"password"}
        name={"password"}
        placeholder={""}
        // value={}
        functionProp={functionHandler}
        // onBlur={}
      />
    </div>
  );
};
