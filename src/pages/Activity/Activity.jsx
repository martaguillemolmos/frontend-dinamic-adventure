import { useEffect, useState } from "react";
import "./Activity.css"
import { getAllActivities } from "../../services/apiCalls";

export const Activity = () => {
    const [allActivities, setAllActivities] = useState([]);
    
    useEffect(() => {
      if (allActivities.length === 0) {
        getAllActivities()
          .then((results) => {
            setAllActivities(results.data);
            const searchData = results.data;
            console.log("soy search", searchData);
  
          })
          .catch((error) => console.log(error));
      }
    }, [allActivities]);

return (

    <div className="activityDesign">
            <div className="center">Actividad
            </div>
            
        </div>
)}