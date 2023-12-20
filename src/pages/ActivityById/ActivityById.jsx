import { useEffect, useState } from "react";
import "./ActivityById.css";
import { getActivityById } from "../../services/apiCalls";
import { useLocation } from "react-router-dom";

export const ActivityById =  () => {

  const location = useLocation();
  const { activityId, date } = location.state || {};

  const [activityDetails, setActivityDetails] = useState(null);

  useEffect(() => {
    const fetchActivityDetails = async () => {
      try {
        if (activityId) {
          console.log(activityId, "soy activityID");
        }
         
        if(date){
          console.log(date, "soy date")
        }

        const response = await getActivityById(activityId);
        const data = response.data;

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

  return (
    <div className="activityDesign">
      <div className="center">
        {activityDetails ? (
          <>
            <h1>{activityDetails.data.title}</h1>
            <p>{activityDetails.data.description}</p>

          </>
        ) : (
          <p>Cargando detalles de la actividad...</p>
        )}
      </div>
    </div>
  );
};