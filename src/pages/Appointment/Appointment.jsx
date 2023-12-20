import { Button } from "@mui/material";
import "./Appointment.css";
import { useNavigate } from "react-router-dom";
import { userData } from "../userSlice";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { getAppointmentByUser } from "../../services/apiCalls";
import { TabBar } from "../../common/CustomTabs/CustomTabs";
import CardAppointments from "../../common/CardAppointments/CardAppointments";

export const Appointment = () => {
  const navigate = useNavigate();
  const rdxToken = useSelector(userData);

  const newAppointment = () => {
    setTimeout(() => {
      navigate("/actividad");
    }, 200);
  };

  const [tabValue1, setTabValue] = useState("null");
  const [appointments, setAppointments] = useState([]);
  const [msgError, setMsgError] = useState("");
  const [allAppointments, setAllAppointments] = useState([]);

  const customTabs1 = [
    { label: "Todos", value: "null" },
    { label: "Aprobadas", value: "approved" },
    { label: "Pendientes", value: "pending" },
    { label: "Canceladas", value: "canceled" },
    { label: "Finalizadas", value: "made" },
  ];

  const handlerTab1 = (event, newValue) => {
    console.log(newValue, "soy value???")
    setTabValue(newValue);
   
    if (newValue === 'null') {
      setAppointments(allAppointments);
      return
    } 
      const filterAppointments = allAppointments.filter(appointment => appointment.status_appointment === newValue);
      console.log(newValue, "soy new")
      setAppointments(filterAppointments);
    
  };

  useEffect(() => {
    if (rdxToken.credentials !== "") {
      const token = rdxToken.credentials.token;
      const decoredToken = jwtDecode(token);
      if (decoredToken !== "super_admin") {
        getAppointmentByUser(token)
          .then((results) => {
            if (Array.isArray(results.data)) {
              console.log(results.data);
              setAllAppointments(results.data);
              setAppointments(results.data);
            } else {
              console.log("No tienes citas agendadas");
            }
          })
          .catch((error) => {
            if (error.response && error.response.data) {
              // Si tenemos un mensaje en response.data, lo mostramos
              console.log(error.response.data);
            } else {
              // Si no tenemos un mensaje en response.data
              console.log("Hubo un error al cargar las citas.");
            }
          });
      } else {
        navigate("/login");
      }
    } else {
      console.log("redirigir");
      // Si no contamos con un token, redirigimos al usuario a login.
      navigate("/");
    }
  }, [rdxToken]);

  return (
    <div className="pagesAuth">
      <div className="container">
        <div className="newAppointmentButton">
          <Button
            variant="contained"
            className="buttonSend"
            onClick={newAppointment}
            style={{ textTransform: "none", fontFamily: "" }}
          >
            Nueva Reserva
          </Button>
        </div>
        <>
        <TabBar tabs={customTabs1} value={tabValue1} handler={handlerTab1} />
        <div className="appointmentsDesign">
          {appointments.length > 0 ? (
            <div className="appointmentsRoster">
              {appointments.map((appointment) => {
                return (
                  <CardAppointments
                    key={appointment.id}
                    id={appointment.id}
                    activity_name={appointment.activity_name}
                    date={appointment.date}
                    participants={appointment.participants}
                    price={appointment.price}
                    status_appointment={appointment.status_appointment}
                    is_active={appointment.is_active}
                  />
                );
              })}
            </div>
          ) : (
            <div>{msgError}</div>
          )}
        </div>
        </>
      </div>
    </div>
  );
};
