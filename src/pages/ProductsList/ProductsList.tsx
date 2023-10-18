import React from 'react'
import List from '../../components/List/List'
import Table from './Table/Table'
import { Button, Modal } from '@mui/material'
import AddProduct from './AddProduct'

const Products = () => {
  const [openAddProduct, setOpenAddProduct] = React.useState(false)

  const handleClose = () => {
    setOpenAddProduct(false)
  }


  return (
    <div className='flex-col flex-center'>
      <AddProduct open={openAddProduct} handleClose={handleClose} />
      <Button onClick={() => setOpenAddProduct(true)} variant='contained' color='primary' sx={{ mb: 2 }}>Dodaj produkt</Button>
      <Table />
    </div>
  )
}

export default Products