import { useEffect, useState } from "react";
import "./ActivityById.css";
import { getActivityById } from "../../services/apiCalls";

export const ActivityById = ({ id }) => {
  const [activityDetails, setActivityDetails] = useState(null);

  useEffect(() => {
    const fetchActivityDetails = async () => {
      try {
        const response = await getActivityById(id);
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
  }, [id]);

  return (
    <div className="activityDesign">
      <div className="center">
        {activityDetails ? (
          <>
            <h1>{activityDetails.title}</h1>
            <p>{activityDetails.description}</p>
            {/* Agrega más detalles según sea necesario */}
          </>
        ) : (
          <p>Cargando detalles de la actividad...</p>
        )}
      </div>
    </div>
  );
};