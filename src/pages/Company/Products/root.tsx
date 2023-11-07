import React from 'react'
import Table from './Table/root'
import AddProduct from './AddProduct'
import InfoModal from '../../../components/InfoModal/InfoModal'
import { ICompany } from '../../../types/model'

type ProductsProps = {
  companyData: ICompany
}

const Products = ({ companyData }: ProductsProps) => {
  const [openAddProduct, setOpenAddProduct] = React.useState(false)

  const handleClose = () => {
    setOpenAddProduct(false)
  }

  return (
    <div className='h-1/2 bg-sky-700'>
      <InfoModal open={openAddProduct} onClose={() => setOpenAddProduct(false)}>
        <AddProduct open={openAddProduct} handleClose={handleClose} companyData={companyData} />
      </InfoModal >
      <Table handleOpenAddModal={() => setOpenAddProduct(true)} companyData={companyData} />
    </div>
  )
}

export default Products