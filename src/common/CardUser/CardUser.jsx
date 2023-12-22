import LetterAvatars from "../Avatar/LetterAvatars";


export const CardUser = ({ id, name, surname, email, phone, role, onUserClick }) => {
    const handleUserClick = () => {
        onUserClick(id);
      };
    
  const inicial = name ? name.charAt(0) : "";
  return (
    <div className="card-user" onClick={handleUserClick}>
      <div className="card-user-header">
        <LetterAvatars initial={inicial} />
        <div className="role-box">
          <p className="card-user-description role">{role}</p>
        </div>
      </div>
      <div className="card-user-content">
        <div className="name">
          <p className="card-user-title">
            {name} {surname}
          </p>
          <p className="card-user-title">
            {id}
          </p>
        </div>
        <p className="card-user-description">{email}</p>
        <p className="card-use-description">{phone}</p>
      </div>
    </div>
  );
};