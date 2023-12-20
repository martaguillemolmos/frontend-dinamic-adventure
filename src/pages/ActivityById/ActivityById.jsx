import { useEffect, useState } from "react";
import "./ActivityById.css";
import { createAppointment, getActivityById } from "../../services/apiCalls";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import dayjs from "dayjs";

export const ActivityById = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { activityId, date } = location.state || {};

  const rdxToken = useSelector(userData);
  const [activityDetails, setActivityDetails] = useState(null);
  const [selectedDate, setSelectedDate] = useState(date ? date : "");
  const [participants, setParticipants] = useState("");
  const [acceptRequirements, setAcceptRequirements] = useState(false);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleParticipantsChange = (e) => {
    setParticipants(e.target.value);
  };

  const handleAcceptRequirementsChange = (e) => {
    setAcceptRequirements(e.target.checked);
  };

  useEffect(() => {
    const fetchActivityDetails = async () => {
      try {
        console.log(activityDetails, "soy activityDetails");
        if (activityId) {
          console.log(activityId, "soy activityID");
        }

        if (date) {
          console.log(date, "soy date");
        }

        const response = await getActivityById(activityId);
        const data = response.data;
        console.log(response, "soy activityDetails");

        if (data) {
          setActivityDetails(data);
        } else {
          console.error("La respuesta de la API no tiene el formato esperado");
        }
      } catch (error) {
        console.error("Error al obtener los detalles de la actividad", error);
      }
    };

    fetchActivityDetails();
  }, [activityId]);

  const checkAvailability = async () => {
    try {
      // Verifica si la fecha está vacía
      if (!selectedDate) {
        console.log("Fecha vacía");
        return;
      }

      // Verifica si el número de participantes está vacío
      if (!participants) {
        console.log("Número de participantes vacío");
        return;
      }

      // Verifica si no se aceptan las condiciones
      if (!acceptRequirements) {
        console.log("Debe aceptar las condiciones");
        return;
      }

      // Formatea la fecha
      const formatDate = dayjs(selectedDate).toISOString();

      // Crea el cuerpo de la solicitud
      const body = {
        activity: activityId,
        participants: parseInt(participants),
        date_activity: formatDate,
        accept_requirements: acceptRequirements,
      };

      const token = rdxToken.credentials.token;

      const newAppointment = await createAppointment(body, token);
      if (newAppointment) {
        navigate("/reservas");
        console.log("se ha creado la cita");
      }
    } catch (error) {
      console.error("Error al comprobar la disponibilidad", error);
    }
  };

  return (
    <div className="activityDesign">
      <div className="center">
        <div className="detailsAppointmentActivity">
          <CustomInput
            design={"inputDesign"}
            type={"datetime-local"}
            name={"date"}
            value={selectedDate}
            functionProp={handleDateChange}
          />

          <CustomInput
            required
            label={"Número de participantes"}
            design={"inputDesign"}
            type={"number"}
            name={"participants"}
            value={participants}
            min={1}
            max={30}
            functionProp={handleParticipantsChange}
          />

          <CustomInput
            required
            label={"Condiciones"}
            design={"inputDesign"}
            type={"checkbox"}
            name={"accept_requirements"}
            checked={acceptRequirements}
            functionProp={handleAcceptRequirementsChange}
          />
          <Button
            variant="contained"
            className="buttonSend"
            onClick={checkAvailability}
            style={{ textTransform: "none", fontFamily: "" }}
          >
            Comprobar disponibilidad
          </Button>
        </div>
        {activityDetails ? (
          <>
            <h1>{activityDetails.data.activity.title}</h1>
            <p>{activityDetails.data.activity.description}</p>

            {activityDetails.data.activityDetails.length === 0 ? (
              <h1>Ponte en contacto con nosotros para más información</h1>
            ) : (
              <p>Hola, soy details, encantada</p>
            )}
          </>
        ) : (
          <p>Cargando detalles de la actividad...</p>
        )}
      </div>
    </div>
  );
};
