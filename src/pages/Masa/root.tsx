import { Box, Grid, MenuItem, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { db } from '../../../firebase'
import { IProduct } from '../../types/model'

const currencies = [
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

const aggregateTypes = [
  '0-2',
  '2-4',
  '4-8',
  '8-11',
  '11-16',
  '16-22',
  '22-31.5',
]
const ASPHALT_DATA = [
  {
    name: 'AC_22_P_PMB_25/55-60',
    recipe: {
      '0-2': 8,
      '2-4': 4,
      '4-8': 30,
      '8-11': 20,
      '11-16': 20,
      '16-22': 16,
      '22-31.5': 2,
    }
  },
  {
    name: 'AC_16_W_PMB_25/55-60',
    recipe: {
      '0-2': 30,
      '2-4': 20,
      '4-8': 16,
      '8-11': 2,
      '11-16': 20,
      '16-22': 8,
      '22-31.5': 4,
    }
  },
  {
    name: 'AC_11_W_50/70_WT-2_2014',
    recipe: {
      '0-2': 2,
      '2-4': 4,
      '4-8': 65,
      '8-11': 5,
      '11-16': 4,
      '16-22': 16,
      '22-31.5': 45,
    }
  },
  {
    name: 'AC_11_S_50/70',
    recipe: {
      '0-2': 9,
      '2-4': 7,
      '4-8': 15,
      '8-11': 35,
      '11-16': 25,
      '16-22': 16,
      '22-31.5': 3,
    }
  },
]

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
  const [selectedAsphalt, setSelectedAsphalt] = React.useState<any>({
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
    const asphaltObject = ASPHALT_DATA.filter((asphalt) => asphalt.name === value)
    setSelectedAsphalt(asphaltObject[0])
  }

  const RecipeItem = ({ value }: { value: string }) => {
    return (
      <Box className='flex justify-end p-2'>
        <TextField
          id="outlined-start-adornment"
          label="Procent"
          value={selectedAsphalt.recipe[value] ?? 0}
        />
      </Box>
    )
  }
  return (
    <Grid container className='px-8 wh-full'>
      <Grid item xs={12} className='border-b-2 border-black h-1/9 flex-center'>
        <TextField
          id="outlined-select-currency"
          select
          label="Masa"
          defaultValue="AC_16_W_PMB_25/55-60"
          onChange={(e) => getAsphaltData(e.target.value)}
          helperText="Wybierz masę"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={3} className='pt-6 pl-6 '>
        <Box className='flex flex-col gap-8 '>
          {aggregateTypes.map((type, index) => (
            <AggregatePriceItem key={index} type={type} />
          ))}
        </Box>
      </Grid>
      <Grid item xs={2} className='pt-6 pl-6 '>
        <Box className='flex flex-col gap-8 '>
          {aggregateTypes.map((value, index) => (
            <RecipeItem key={index} value={value} />
          ))}
        </Box>
      </Grid>
      <Grid item xs={6} className=''>
      </Grid>
    </Grid>
  )
}

export default Masa
