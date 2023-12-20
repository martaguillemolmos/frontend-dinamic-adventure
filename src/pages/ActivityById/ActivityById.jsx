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
        console.log(activityDetails, "soy activityDetails")
        if (activityId) {
          console.log(activityId, "soy activityID");
        }
         
        if(date){
          console.log(date, "soy date")
        }

        const response = await getActivityById(activityId);
        const data = response.data;
        console.log(response, "soy activityDetails")

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
            <h1>{activityDetails.data.activity.title}</h1>
            <p>{activityDetails.data.activity.description}</p>
            
            {/* Corregir la condición aquí */}
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