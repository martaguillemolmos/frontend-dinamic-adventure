import { useEffect, useState } from "react";
import "./Aquatic Activity.css"
import { getActivityByType } from "../../services/apiCalls";
import { CustomActivity } from "../../common/CustomActivity/CustomActivity";
import { arrayBufferToBase64 } from "../../common/functions";

export const Aquatic_Activities = () => {
    const [typeActivities, setTypeActivities] = useState([]);

  useEffect(() => {
    if (typeActivities.length === 0) {
        const defaultType = 'acuatica';
        getActivityByType(defaultType)
        .then((results) => {
            console.log(results, "soy results")
          if (Array.isArray(results.data.data)) {
            const parseImage = results.data.data.map((activity) =>{
              return {
                imageBase64: arrayBufferToBase64(activity.image.data),
                ...activity
              }
            });
            setTypeActivities(parseImage);
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
)}