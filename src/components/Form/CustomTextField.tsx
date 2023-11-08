import { TextField } from '@mui/material'
import { TextFieldType } from './types/formTypes'

const CustomTextField = ({ id, type = "text", label, defaultValue = "", disabled = false }: TextFieldType) => {
  return (
    < TextField
      margin="normal"
      fullWidth
      id={id}
      type={type}
      label={label}
      name={id}
      defaultValue={defaultValue}
      autoFocus
      disabled={disabled}
    />
  )
}

export default CustomTextField


