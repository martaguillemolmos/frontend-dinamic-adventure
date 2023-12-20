import './Modal.css';

const Modal = ({ isOpen, onClose, appointment }) => {
  const { id, activity_name, date, participants, price, status_appointment, is_active } = appointment || {};

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
              <p>Estado: {status_appointment}</p>
              <p>Activa: {is_active ? 'Sí' : 'No'}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;