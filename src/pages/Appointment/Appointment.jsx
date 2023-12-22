import { Button } from "@mui/material";
import "./Appointment.css";
import { useNavigate } from "react-router-dom";
import { userData } from "../userSlice";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import {
  getAllApointments,
  getAppointmentByUser,
} from "../../services/apiCalls";
import { TabBar } from "../../common/CustomTabs/CustomTabs";
import CardAppointments from "../../common/CardAppointments/CardAppointments";
import Modal from "../../common/Modal/Modal";

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
  const [uniqueActivities, setUniqueActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
    setIsModalOpen(false);
  };

  const customTabs1 = [
    { label: "Todos", value: "null" },
    { label: "Aprobadas", value: "approved" },
    { label: "Pendientes", value: "pending" },
    { label: "Canceladas", value: "canceled" },
    { label: "Finalizadas", value: "made" },
  ];

  const handlerTab1 = (event, newValue) => {
    console.log(newValue, "soy value???");
    setTabValue(newValue);

    if (newValue === "null") {
      const orderAllAppointments = allAppointments.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      setAppointments(orderAllAppointments);
      return;
    }
    const filterAppointments = allAppointments.filter(
      (appointment) => appointment.status_appointment === newValue
    );
    console.log(newValue, "soy new");
    const orderFilterAppointment = filterAppointments.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    console.log(orderFilterAppointment, "soy orderApp");
    setAppointments(orderFilterAppointment);
  };

  useEffect(() => {
    const infoAppointment = async () => {
      try {
        if (rdxToken.credentials !== "") {
          const token = rdxToken.credentials.token;
          const decoredToken = jwtDecode(token);

          let appointmentsByRole;
          if (decoredToken.role == "super_admin") {
            const appointmentSuper = await getAllApointments(token);
            appointmentsByRole = appointmentSuper.data;
            console.log("soy appo de super", appointmentSuper.data);
          } else {
            appointmentsByRole = await getAppointmentByUser(token);
            console.log("soy appo de NO super", appointmentsByRole);
          }

          if (Array.isArray(appointmentsByRole.data)) {
            const allAppointments = appointmentsByRole.data;
            const orderAppointment = allAppointments.sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            );
            setAllAppointments(orderAppointment);
            setAppointments(orderAppointment);

            const uniqueActivityNames = [
              ...new Set(
                allAppointments.map((appointment) => appointment.activity_name)
              ),
            ];
            setUniqueActivities(uniqueActivityNames);
          } else {
            console.log("No tienes citas agendadas");
          }
        } else {
          navigate("/");
        }
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.data);
        } else {
          console.log("Hubo un error al cargar las citas.", error);
        }
      }
    };

    infoAppointment();
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
        <div className="appointmentsDesign">
          <div className="dropdown-container">
            {uniqueActivities.length > 0 && (
              <select
                value={selectedActivity || ""}
                onChange={(e) => setSelectedActivity(e.target.value || null)}
              >
                <option value="">Selecciona una actividad</option>
                {uniqueActivities.map((activity) => (
                  <option key={activity} value={activity}>
                    {activity}
                  </option>
                ))}
              </select>
            )}
          </div>
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
                      handleOpenModal={handleOpenModal}
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
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        appointment={selectedAppointment}
      />
    </div>
  );
};
