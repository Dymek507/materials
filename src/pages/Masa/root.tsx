import { Box, Grid, MenuItem, TextField } from '@mui/material'
import React from 'react'


const Masa = () => {
  const materials = [
    {
      supplier: 'Supplier 1',
      material: '2/5',
      price_loco: 100,
      distance: 10,
    },
    {
      supplier: 'Supplier 2',
      material: '2/5',
      price_loco: 100,
      distance: 10,
    }]

  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];

  return (
    <div className='h-full bg-sky-700'>
      <Grid container gap={4} justifyContent="center">
        <Grid item xs={5}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <TextField fullWidth id="outlined-basic" label="Outlined" variant="outlined" />
            <TextField fullWidth id="filled-basic" label="Filled" variant="filled" />
            <TextField fullWidth id="standard-basic" label="Standard" variant="standard" />
            <TextField
              id="filled-select-currency"
              select
              label="Select"
              defaultValue="EUR"
              helperText="Please select your currency"
              variant="filled"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <TextField fullWidth id="outlined-basic" label="Outlined" variant="outlined" />
            <TextField fullWidth id="filled-basic" label="Filled" variant="filled" />
            <TextField fullWidth id="standard-basic" label="Standard" variant="standard" />
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default Masa