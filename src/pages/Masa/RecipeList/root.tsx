import React from 'react'
import RecipeItem from './RecipeItem'
import { Box, Grid } from '@mui/material'

type RecipeListProps = {
  selectedAsphalt: AsphaltType
}

const aggregateTypes = [
  '0-2',
  '2-4',
  '4-8',
  '8-11',
  '11-16',
  '16-22',
  '22-31.5',
]


const RecipeList = ({ selectedAsphalt }: RecipeListProps) => {
  return (
    <Grid item xs={12} className='flex-center'>
      <Box className='flex flex-col gap-8 '>
        {aggregateTypes.map((aggregate, index) => (
          <RecipeItem key={index} aggregate={aggregate} percentage={selectedAsphalt.recipe[aggregate] ?? 0} />
        ))}
      </Box>
    </Grid>
  )
}

export default RecipeList



{/* <Grid item xs={3} className='pt-6 pl-6 '>
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
</Grid> */}