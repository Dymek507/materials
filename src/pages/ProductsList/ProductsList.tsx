import React from 'react'
import Table from './Table/Table'
import { Button } from '@mui/material'
import AddProduct from './AddProduct'
import InfoModal from '../../components/InfoModal/InfoModal'

const Products = () => {
  const [openAddProduct, setOpenAddProduct] = React.useState(false)

  const handleClose = () => {
    setOpenAddProduct(false)
  }


  return (
    <div className='flex-col flex-center'>
      <InfoModal open={openAddProduct} onClose={() => setOpenAddProduct(false)}>
        <AddProduct open={openAddProduct} handleClose={handleClose} />
      </InfoModal >
      <Button onClick={() => setOpenAddProduct(true)} variant='contained' color='primary' sx={{ mb: 2 }}>Dodaj produkt</Button>
      <Table />
    </div>
  )
}

export default Products