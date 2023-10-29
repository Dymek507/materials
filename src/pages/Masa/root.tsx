import { Box, Grid, MenuItem, TextField } from '@mui/material'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { db } from '../../../firebase'
import { IProduct } from '../../types/model'


const Masa = () => {
  const [materials, setMaterials] = React.useState<IProduct[]>([])

  useEffect(() => {
    const getMaterials = async () => {
      setMaterials([])
      const q = query(collection(db, "products"), where('masa', "==", true))
      const materialsSnapshot = await getDocs(q);
      const newList: IProduct[] = []
      materialsSnapshot.forEach((doc) => {
        const data = doc.data() as IProduct
        newList.push(data as IProduct)
      });
      setMaterials(newList)
    }
    getMaterials()
  }, [])

  return (
    <div className='h-full bg-white'>
      {materials.map((material) => (
        <Grid key={material.id} container gap={4} justifyContent="center">
          {material.masa_type}
        </Grid>))}
      {/* <Grid container gap={4} justifyContent="center">
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
      </Grid> */}
    </div>
  )
}

export default Masa