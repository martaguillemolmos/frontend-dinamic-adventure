import "./Modal.css";
import { updateAppointment } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";

const Modal = ({ isOpen, onClose, appointment }) => {
  const { id, activity_name, date, participants, price, status_appointment } =
    appointment || {};

  const rdxToken = useSelector(userData);

  const modifyAppointment = () => {
    if (status_appointment === "pending") {
      return (
        <div className="buttonAppointments">
          <button
            className="cancel-Appointment"
            onClick={() => cancelAppointment(id)}
          >
            Cancelar Reserva
          </button>
          <button className="modify-Appointment">Modificar Reserva</button>
        </div>
      );
    }  else {
      return null;
    }
  };

  const cancelAppointment = async (id_appointment) => {
    if (rdxToken.credentials !== "" && id_appointment) {
      const token = rdxToken.credentials.token;
      const modify = await updateAppointment(
        {
          id: id_appointment,
          status_appointment: "canceled",
        },
        token
      );
      if (modify) {
        console.log("modificada");
        console.log(modify, "modificada")
      }
    } else "enviarlo fuera";
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Detalles de la Cita</h2>
              <button className="modal-close" onClick={onClose}>
                X
              </button>
            </div>
            <div className="modal-content">
              <p>ID: {id}</p>
              <p>Actividad: {activity_name}</p>
              <p>Fecha: {date}</p>
              <p>Participantes: {participants}</p>
              <p>Precio: {price}</p>
            </div>
            {modifyAppointment()}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
