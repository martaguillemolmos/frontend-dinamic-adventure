import './CardAppointments.css'; // Asegúrate de tener un archivo CSS asociado

const CardAppointments = ({
  id,
  activity_name,
  date,
  participants,
  price,
  status_appointment,
  is_active,
}) => {
  // Lógica para determinar el color según el estado de la cita
  const getStatusColor = () => {
    switch (status_appointment) {
      case 'pending':
        return 'pendingColor';
      case 'approved':
        return 'approvedColor';
      case 'canceled':
        return 'cancelledColor';
      case 'made':
        return 'completedColor';
      default:
        return 'defaColor';
    }
  };

  if (!is_active) {
    return null;
  }
  return (
    <div className={`card${getStatusColor()}`}>
        <div className="infoValue">{id}</div>
        <div className="infoValue">{activity_name}</div>
        <div className="infoValue">{date}</div>
        <div className="infoValue">{participants}</div>
        <div className="infoValue">{price}</div>
        <div className="infoValue">Total : {price}*{participants} €</div>
    </div>
  );
};

export default CardAppointments;