import { useEffect, useState } from "react";
import { CardUser } from "../../common/CardUser/CardUser";
import "./Users.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";
import { jwtDecode } from "jwt-decode";
import { getAllUsers, loginSuper } from "../../services/apiCalls";

export const Users = () => {
  const navigate = useNavigate();
  const rdxToken = useSelector(userData);
  const [users, setUsers] = useState([]);
  const [msgError, setMsgError] = useState("");
  const dispatch = useDispatch();

  const handleUserClick = (userId) => {
    const token = rdxToken.credentials.token;
    const body = {"id_user": userId}
    loginSuper(token,  body)
      .then((results) => {
        dispatch(login({ credentials: results.data }));
        console.log(results.data);
      })
      .catch((error) => {
        console.error("Error en loginSuper:", error);
      });
  };

  useEffect(() => {
    if (rdxToken.credentials !== "") {
      const token = rdxToken.credentials.token;
      const decoredToken = jwtDecode(token);
      console.log(decoredToken);
      if (decoredToken.role == "super_admin") {
        getAllUsers(token)
          .then((results) => {
            console.log("esto", results.data);
            setUsers(results.data.data);
          })
          .catch((error) => {
            if (error.response && error.response.data) {
              setMsgError(error.response.data);
            } else {
              setMsgError("Hubo un error al cargar las citas.");
            }
          });
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [rdxToken, navigate]);

  
  return (
    <div className="usersDesign">
      {users.length > 0 ? (
        <div className="containerUsers">
          {users.map((user) => (
            <CardUser
              key={user.id}
              name={user.name || ""}
              surname={user.surname || ""}
              role={user.role || ""}
              email={user.email || ""}
              phone={user.phone || ""}
              onUserClick={handleUserClick ? () => handleUserClick(user.id) : undefined}            />
          ))}
        </div>
      ) : (
        <div>{msgError}</div>
      )}
    </div>
  );
};
