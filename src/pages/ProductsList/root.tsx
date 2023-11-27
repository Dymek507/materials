import React from 'react'
import Table from './Table/root'

const Products = () => {
  const [openAddProduct, setOpenAddProduct] = React.useState(false)

  const handleClose = () => {
    setOpenAddProduct(false)
  }

  return (
    <div className='flex-col wh-full flex-center'>
      <Table handleOpenAddModal={() => setOpenAddProduct(true)} />
    </div>
  )
}

export default Products