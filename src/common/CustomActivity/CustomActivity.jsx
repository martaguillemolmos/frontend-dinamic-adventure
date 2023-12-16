import { useSelector } from "react-redux";
import "./CustomActivity.css";
import { userData } from "../../pages/userSlice";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import mediumIntensity from "../../img/medium.png";
import highIntensity from "../../img/high.png";
import lowIntensity from "../../img/low.png";
import photo from "../../img/photo.png";
import child from "../../img/child.png";
import { useNavigate } from "react-router-dom";

export const CustomActivity = ({ id, title, image, description, price, intensity, minium_age }) => {
  const rdxToken = useSelector(userData);
  const [is_active, setIsActive] = useState(false);
  const [isReservable, setIsReservable] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (location.pathname === "/actividad") {
        // Si estamos en la página de actividad, configuramos como reservable
        setIsReservable(true);
      } else {
        console.log("no estas en actividad.")
      }
        
    
    if (rdxToken.credentials !== "") {
      const token = rdxToken.credentials?.token;
      const decoredToken = jwtDecode(token);
      const activeStatus = decoredToken.is_active;
      setIsActive(activeStatus);
    } else {
      console.log("No se encontró token");
    }

   
  }, [rdxToken.credentials, location.pathname]);

  return (
    <div className="activity" key={id}>
      <div className="imgActivity">
        <img src={image} alt="Imagen" />
      </div>
      <div className="contentActivity">
        <div className="headerActivity">
          <div className="titleCustomActivity"><h1>{title}</h1></div>
          <div className="descriptionCustomActivity"><p>{description}</p></div>
        </div>
        <div className="icons">
          {intensity == "high" ? (
          <img src={highIntensity} alt="`Intensity ${intensity}" />
          ) : intensity === 'medium' ? (
            <img src={mediumIntensity} alt={`Intensity ${intensity}`} />
          ) : (
            <img src={lowIntensity} alt="Low Intensity" />
          )}
        {minium_age <= "9" ? (
          <img src={child} alt="`Child" />
          ) : (
                null
            )}
  
          <img src={photo} alt="Photo" />
          <p>{price}</p>
        </div>
      </div>
      {!isReservable ? (
        <button className="buttonActivity">MÁS INFORMACIÓN</button>
      ) : rdxToken.credentials !== "" && is_active ?  (
        <button className="buttonActivity">RESERVAR</button>
      ): (
        <button className="buttonActivity" onClick={() => navigate("/login")}>RESERVAR</button>
      )}
    </div>
  );
};
