import { useSelector } from "react-redux";
import "./CustomActivity.css";
import { userData } from "../../pages/userSlice";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export const CustomActivity = ({ id, title, image, description, price }) => {
  const rdxToken = useSelector(userData);
  const [is_active, setIsActive] = useState(false);

  useEffect(() => {
    if (rdxToken.credentials !== "") {
      const token = rdxToken.credentials?.token;
      const decoredToken = jwtDecode(token);
      const activeStatus = decoredToken.is_active;
      setIsActive(activeStatus);
    } else {
      console.log("No se encontró token");
    }
  }, [rdxToken.credentials]);

  return (
    <div className="activity" key={id}>
      <img src={image} alt="Imagen" />
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="price">{price}</div>
      <div className="icons">
        <img src="icon1.jpg" alt="Icon 1" />
        <img src="icon2.jpg" alt="Icon 2" />
        <img src="icon3.jpg" alt="Icon 3" />
      </div>
      {rdxToken.credentials !== "" && is_active ? (
        <button className="button">RESERVAR</button>
      ) : (
        <button className="button">MÁS INFORMACIÓN</button>
      )}
    </div>
  );
};