import { Box, TextField, Typography } from "@mui/material";

type RecipeItemProps = {
  aggregate: string,
  percentage: number
}

const RecipeItem = ({ aggregate, percentage }: RecipeItemProps) => {
  // function that get data specific aggregate type from server
  // function that get distance 
  // function that get franco price

  return (
    <Box className='flex justify-end p-2'>
      <Typography
        className="flex items-center w-16"
      >
        {aggregate}
      </Typography>
      <TextField
        id="outlined-start-adornment"
        label="Cena"
        type="number"
        value={percentage ?? 0}
      />
      <TextField
        id="outlined-start-adornment"
        label="Procent"
        value={percentage ?? 0}
      />
    </Box>
  )
}

export default RecipeItem;

