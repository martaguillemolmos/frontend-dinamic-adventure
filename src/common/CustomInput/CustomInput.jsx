import TextField from '@mui/material/TextField';

export const CustomInput = ({required, label, textError,functionBlur, disabled,display, design, type, pattern, name, placeholder, value, maxLength, functionProp, min, max}) => {
    return (
        <div className='customInputDesing'>
        <TextField 
        required={required}
        id="outlined-start-adornment"
        label= {label}
        display={display}
        disabled={disabled}
        className={design}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value || undefined }
        onChange={(e) => functionProp(e)}
        onBlur={(e)=>functionBlur(e)}
        maxLength = {maxLength}
        pattern={pattern}        
        min={min}
        max={max}
        helperText={textError}
        fullWidth
        InputLabelProps={{
            shrink: true,
          }}
         />
        </div>
    )
}