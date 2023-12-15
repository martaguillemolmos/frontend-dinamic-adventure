import { useEffect, useState } from "react";
import "./Land Activity.css"
import { getActivityByType } from "../../services/apiCalls";
import { CustomActivity } from "../../common/CustomActivity/CustomActivity";

export const Land_Activity = () => {
    
    const [typeActivities, setTypeActivities] = useState([]);

  useEffect(() => {
    if (typeActivities.length === 0) {
        const defaultType = 'terrestre';
        getActivityByType(defaultType)
        .then((results) => {
          if (Array.isArray(results.data.data)) {
            setTypeActivities(results.data.data);
          } else {
            console.error(
              "La respuesta de la API no tiene el formato esperado:"
            );
          }
        })
        .catch((error) => console.log(error));
    }
  }, [typeActivities]);
return (
    <div className="activityDesign">
    {typeActivities.length > 0 ? (
      <div className="activityCard">
        {typeActivities.map((results) => {
          return (
            <CustomActivity
              key={results.id}
              image={results.image}
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
)}