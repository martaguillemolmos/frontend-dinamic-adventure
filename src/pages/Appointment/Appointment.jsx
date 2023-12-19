import { Button } from "@mui/material"
import "./Appointment.css"
import { useNavigate } from "react-router-dom";


export const Appointment = () => {
    const navigate = useNavigate();

    const newAppointment = () => {
        setTimeout(() => {
            navigate("/actividad");
          }, 200);
    }

return (
    <div className="pagesAuth">
        <div className="container">
        <div className="newAppointmentButton">
          <Button
            variant="contained"
            className="buttonSend"
            onClick={newAppointment}
            style={{ textTransform: "none", fontFamily: "" }}>
            Nueva Reserva
          </Button>
        </div>
          Appointment
        </div>
    </div>
)}