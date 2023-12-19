import { useEffect, useState } from "react";
import "./Activity.css";
import { disponibilityDate, getAllActivities } from "../../services/apiCalls";
import { CustomActivity } from "../../common/CustomActivity/CustomActivity";
import { arrayBufferToBase64 } from "../../common/functions";
import { CustomInput } from "../../common/CustomInput/CustomInput";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { Button } from "@mui/material";
// import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

export const Activity = () => {
  // const navigate = useNavigate();
  // Instanciamos Redux en lectura
  const rdxToken = useSelector(userData);
  console.log(rdxToken, "dime que tienes tokennn");
  const [allActivities, setAllActivities] = useState([]);

  //Recuperamos la fecha
  const [date, setDate] = useState({
    date: "",
  });

  console.log(date, "esta es la date.");

  const functionHandler = (e) => {
    setDate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const checkAvailability = async () => {
    try {
      // console.log(rdxToken, "rdx");
      // if (rdxToken.credentials !== "") {
      //   const token = rdxToken.credentials.token;
      //   console.log(token, "yo soy el token");
      //   const decoredToken = jwtDecode(token);
      //   if (!decoredToken.is_active) {
      //     console.log("Usuario inactivo, redirigiendo a /login");
      //     navigate("/login");
      //     return;
      //   }

        if (date.date !== "") {
          // Formatear la fecha
         
          const formatDate = dayjs(date.date).toISOString();
          console.log(formatDate, "format")
          const body = {
            date: formatDate
          };
          console.log(body, "soy el body")
          // Enviar la fecha formateada al backend

          // console.log(token, body, "cucu")
          const response = await disponibilityDate(body);
          console.log(response, "soy la respuesta del backend");
        } else {
          console.log("Fecha vacía");
        }
      // } else {
      //   console.log("Token no válido");
      // }
    } catch (error) {
      console.error("Error al comprobar la disponibilidad:", error);
      // Manejar el error de manera adecuada (mostrar mensaje al usuario, etc.)
    }
  };

  const disponibiltyActivity = async () => {
    if (allActivities.length === 0) {
      getAllActivities()
        .then((results) => {
          console.log(results, "soy results");
          if (Array.isArray(results.data.data)) {
            const parseImage = results.data.data.map((activity) => {
              return {
                imageBase64: arrayBufferToBase64(activity.image.data),
                ...activity,
              };
            });
            setAllActivities(parseImage);
          } else {
            console.error(
              "La respuesta de la API no tiene el formato esperado"
            );
          }
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    disponibiltyActivity();
  }, [allActivities]);

  return (
    <div className="activityDesign">
      <CustomInput
        design={"inputDesign"}
        type={"datetime-local"}
        name={"date"}
        placeholder={""}
        value={""}
        functionProp={functionHandler}
      />
      <Button
        variant="contained"
        className="buttonSend"
        onClick={checkAvailability}
        style={{ textTransform: "none", fontFamily: "" }}
      >
        Comprobar disponibilidad
      </Button>
      {allActivities.length > 0 ? (
        <div className="activityCard">
          {allActivities.map((results) => {
            return (
              <CustomActivity
                key={results.id}
                image={results.imageBase64}
                title={results.title}
                description={results.description}
                price={results.price}
              />
            );
          })}
        </div>
      ) : (
        <div>Esperando las actividades</div>
      )}
    </div>
  );
};
