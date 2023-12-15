import { useEffect, useState } from "react";
import "./Activity.css";
import { getAllActivities } from "../../services/apiCalls";
import { CustomActivity } from "../../common/CustomActivity/CustomActivity";

export const Activity = () => {
  const [allActivities, setAllActivities] = useState([]);

  useEffect(() => {
    if (allActivities.length === 0) {
      getAllActivities()
        .then((results) => {
            console.log(results, "soy results")
          if (Array.isArray(results.data.data)) {
            setAllActivities(results.data.data);
          } else {
            console.error(
              "La respuesta de la API no tiene el formato esperado:"
            );
          }
        })
        .catch((error) => console.log(error));
    }
  }, [allActivities]);

  return (
    <div className="activityDesign">
      {allActivities.length > 0 ? (
        <div className="activityCard">
          {allActivities.map((results) => {
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
  );
};
