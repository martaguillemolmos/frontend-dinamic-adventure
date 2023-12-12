import dayjs from "dayjs";

export const validator = (type, value) => {
    
    const emailRegex = "/^(([^<>()[].,;:s@\"]+(.[^<>()[].,;:s@\"]+)*)|(\".+\"))@(([^<>()[].,;:s@\"]+.)+[^<>()[].,;:s@\"]{2,})$/i";
    
    switch(type){
        //Validación del email
        case 'email':
        case 'correo':
        case 'mail':

        if (value === undefined || value.trim() === "") {
            return "El email no puede estar vacío.";
          } else if (value.length > 50) {
            return "Número máx. de caracteres 50.";
          } else if (!emailRegex.test(value)) {
            return "Formato de email incorrecto.";
          }
          return "";
        
        
        //Validación del name y surname
        case 'name':
        case 'surname':

            if( value !== undefined && value.trim() !== "" && value.length > 50){
                return "Número máx. de caracters 50."
            } else {
                return "";
            }
            
        // Validación del teléfono
        case 'phone':
        case 'telefono':

            if (value !== undefined  && (value >999999999 || value < 600000000 )) {
                return "Formato de teléfono incorrecto.";
            } else {
                return "";
            }
        
        // Validación del password
        case 'password':
        case 'passwordOld':
        case 'contraseña':

            if(value !== undefined  && value.trim() !== "" && (value.length < 6 || value.length > 12)){
                return "La contraseña debe contener de 6 a 12 caracteres"
            } else {
                return "";

            }
        
        //Validación de id
        case 'profile_id':

        if (value !== undefined) {
            return "Introduce un id válido";
        } else {
            return "";
        }

        // Validación de fecha
        case 'date': {
            const dateBody = dayjs(value, "'{AAAA} MM-DDTHH:mm:ss SSS [Z] A'");
            const dateNow = dayjs();

            if (!dateBody.isValid() || dateBody < dateNow) {
                return "El formato de la fecha no es válido o es anterior a la creación de la cita. Es {AAAA} MM-DDTHH:mm:ss SSS [Z] A'";
            }

            if (!dateBody) {
                return "La fecha y hora no puede ser nula.";
            }
            break;
        }
        // Validación de un boolean
        case 'is_active':

            if (value !== true && value !== false) {
                return "El valor debe ser true o false.";
            } else {
                return "";
            }
        }

    
    }