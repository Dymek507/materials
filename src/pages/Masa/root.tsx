import { Box, Grid, MenuItem, TextField, Typography } from '@mui/material'
import React from 'react'
import { ASPHALT_RECIPES } from './data/ASPHALT_RECIPES'
import RecipeItem from './RecipeList/RecipeItem';
import RecipeList from './RecipeList/root';


const asphaltsArray = [
  {
    value: 'AC_22_P_PMB_25/55-60',
    label: 'AC 22 P PMB 25/55-60',
  },
  {
    value: 'AC_16_W_PMB_25/55-60',
    label: 'AC 16 W PMB 25/55-60',
  },
  {
    value: 'AC_11_W_50/70_WT-2_2014',
    label: 'AC 11 W 50/70 WT-2 2014',
  },
  {
    value: 'AC_11_S_50/70',
    label: 'AC 11 S 50/70',
  },
];



const AggregatePriceItem = ({ type }: { type: string }) => {
  return (
    <Box className='flex justify-end gap-6 p-2'>
      <Typography variant='h4' className='flex items-center w-32'>{type}</Typography>
      <TextField
        id="outlined-number"
        label="Cena"
        type="number"
        defaultValue={126}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Box>
  )
}


const Masa = () => {
  const [selectedAsphalt, setSelectedAsphalt] = React.useState<AsphaltType>({
    name: 'AC_16_W_PMB_25/55-60',
    recipe: {
      '0-2': 5,
      '2-4': 12,
      '4-8': 18,
      '8-11': 4,
      '11-16': 0,
      '16-22': 16,
      '22-31.5': 40,
    }
  });

  const getAsphaltData = (value: string) => {
    const asphaltObject = ASPHALT_RECIPES.filter((asphalt) => asphalt.name === value)
    setSelectedAsphalt(asphaltObject[0])
  }


  return (
    <Grid container className='px-8 wh-full'>
      {/* Chose the asphalt bar */}
      <Grid item xs={12} className='h-32 border-b-2 border-black flex-center '>
        <TextField
          id="outlined-select-currency"
          select
          defaultValue="AC_16_W_PMB_25/55-60"
          onChange={(e) => getAsphaltData(e.target.value)}
          helperText="Wybierz masę"
        >
          {asphaltsArray.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      {/* Recipe list */}
      <Grid item xs={12} className='flex-center'>
        <RecipeList selectedAsphalt={selectedAsphalt} />
      </Grid>

    </Grid>
  )
}

export default Masa
