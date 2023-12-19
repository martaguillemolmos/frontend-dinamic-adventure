import { useEffect, useState } from "react";
import "./Activity.css";
import { disponibilityDate, getAllActivities } from "../../services/apiCalls";
import { CustomActivity } from "../../common/CustomActivity/CustomActivity";
import { arrayBufferToBase64 } from "../../common/functions";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

export const Activity = () => {
  const navigate = useNavigate();
  // Instanciamos Redux en lectura
  const rdxToken = useSelector(userData);
  
  const [allActivities, setAllActivities] = useState([]);

  //Recuperamos la fecha
  const [date, setDate] = useState({
    date: "",
  });

  const functionHandler = (e) => {
    setDate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const checkAvailability = async () => {
    try {
      if (!rdxToken.credentials) {
        console.log("Token no válido");
        return;
      }

      const token = rdxToken.credentials.token;
      const decoredToken = jwtDecode(token);

      if (!decoredToken.is_active) {
        console.log("Usuario inactivo, redirigiendo a /login");
        navigate("/login");
        return;
      }

      if (!date.date) {
        console.log("Fecha vacía");
        return;
      }

      const formatDate = dayjs(date.date).toISOString();
      const body = { date: formatDate };

      const results = await disponibilityDate(body, token);
      const participants = results.data.data;

      if (participants.length > 0) {
        const updatedActivities = allActivities.map((activity) => {
          const participantInfo = participants.find(
            (participant) => participant.id_activity === activity.id
          );

          return {
            ...activity,
            availability: participantInfo ? participantInfo.allParticipants : 0,
          };
        });
        setAllActivities(updatedActivities);
      } else {
        console.log("Toda la disponibilidad");
      }
    } catch (error) {
      console.error("Error al comprobar la disponibilidad", error);
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
                availability={results.availability}
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
