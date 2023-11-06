import React from 'react'
import Table from './Table/root'
import { Button } from '@mui/material'
import AddProduct from './AddProduct'
import InfoModal from '../../components/InfoModal/InfoModal'

const Products = () => {
  const [openAddProduct, setOpenAddProduct] = React.useState(false)

  const handleClose = () => {
    setOpenAddProduct(false)
  }

  return (
    <div className='flex-col mt-2 flex-center'>
      <InfoModal open={openAddProduct} onClose={() => setOpenAddProduct(false)}>
        <AddProduct open={openAddProduct} handleClose={handleClose} />
      </InfoModal >
      <Table handleOpenAddModal={() => setOpenAddProduct(true)} />
    </div>
  )
}

export default Products