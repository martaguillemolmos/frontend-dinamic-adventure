import "./Modal.css";
import { updateAppointment } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";
import { CustomInput } from "../CustomInput/CustomInput";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { validator } from "../../services/userful";

const Modal = ({ isOpen, onClose, appointment }) => {
    const rdxToken = useSelector(userData);

    const navigate = useNavigate();
    const [total, setTotal] = useState(0);
  
    const { id, activity_name, date, participants, price, status_appointment } =
      appointment || {};
  
    const [appointmentData, setAppointmentData] = useState({
      date: "",
      participants: "",
    });

    //Validación de errores
    const [appointmentDataError, setAppointmentDataError] = useState({
      dateError: "",
      participantsError: "",
    });
    
    const errorCheck = (e) => {
      let error = "";
      error = validator(e.target.name, e.target.value);
      setAppointmentDataError((prevState) => ({
        ...prevState,
        [e.target.name + "Error"]: error,
      }));
    };
    
    const [isEnabled, setIsEnabled] = useState(false);
  
    const functionHandler = (e) => {
      setAppointmentData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };

    useEffect(() => {
        console.log(appointment);
        setAppointmentData({
          date : date ? dayjs(date).format("YYYY-MM-DDTHH:mm") : "",
          participants,
        });
        const calculateTotal = () => {
          setTotal(appointmentData.participants * price);
        };
    
        calculateTotal();
      }, [appointment]);
      console.log(setAppointmentData, "soy appointments data")
  
  
    const sendData = async () => {
      try {
        // Verifica si la fecha está vacía
        if (!appointmentData.date) {
          console.log("Fecha vacía");
          return;
        }
        console.log(appointmentData, "soy appo")

        // Verifica si el número de participantes está vacío
        if (!appointmentData.participants) {
          console.log("Número de participantes vacío");
          return;
        }
  
        const token = rdxToken.credentials.token;
  
        const newAppointment = await updateAppointment(
          {
            id,
            date: appointmentData.date,
            participants: appointmentData.participants,
          },
          token
        );
        if (newAppointment) {
          navigate("/");
          console.log("se ha creado la cita");
        }
      } catch (error) {
        console.error("Error al comprobar la disponibilidad", error);
      } finally {
        setIsEnabled(false);
      }
    };
  
    const modifyAppointment = () => {
        const dateAppointment = dayjs(date);
        const dateNow = dayjs();
        const diferenciaDias = dateAppointment.diff(dateNow, 'days');
        console.log("datenow", dateNow)
      if (status_appointment === "pending" || (status_appointment == "approved" && diferenciaDias >= 10) ) {
        return (
          <div className="buttonModal">
            <button
              className="cancel-Appointment"
              onClick={() => cancelAppointment(id)}
            >
              Cancelar Reserva
            </button>

            {isEnabled ? (
              <Button
                variant="contained"
                className="button"
                onClick={() => sendData()}
                style={{ textTransform: "none", fontFamily: "" }}
              >
                Enviar datos
              </Button>
            ): (
                        <Button
              variant="contained"
              className="button"
              onClick={() => setIsEnabled(!isEnabled)}
              style={{ textTransform: "none", fontFamily: "" }}
            >
             Modificar reserva
            </Button>
            )}
          </div>
        );
      } else {
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
          console.log(modify, "modificada");
        }
      } else console.log("enviarlo fuera");
    };
  
    return (
      <>
        {isOpen && (
          <div className="modal-overlay">
            <div className="modal-container">
              <div className="modal-header">
                <h3>Detalles de la Cita</h3>
                <button className="modal-close" onClick={onClose}>
                  X
                </button>
              </div>
              <div className="modal-content">
                <div className="identification">
                  <div className="title-identification">
                    <h4>Identificador de reserva</h4>
                  </div>
                  <div className="infor-identification">
                  <p>#{id}</p>
                  </div>
                

                </div>
                <div className="activitySelect">
                <h4>Actividad seleccionada: {activity_name}</h4>
                </div>
                
                <div className="inputsModal">
                <CustomInput
                  disabled={isEnabled}
                  label={"Fecha"}
                  design={"inputDesign"}
                  type={"datetime-local"}
                  name={"date"}
                  placeholder={""}
                  value={appointmentData.date}
                  functionProp={functionHandler}
                  functionBlur={errorCheck}
                  helperText={appointmentDataError.dateError}
                />
                <CustomInput
                  disabled={isEnabled}
                  label={"Número de participantes"}
                  design={"inputDesign"}
                  type={"number"}
                  name={"participants"}
                  placeholder={""}
                  value={appointmentData.participants}
                  max={"12"}
                  functionProp={functionHandler}
                  functionBlur={errorCheck}
                  helperText={appointmentDataError.participantsError}
                />
                </div>
                <div className="modalPrice"><h4>Total: {total} €</h4></div>
              </div>
              {modifyAppointment()}
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default Modal;