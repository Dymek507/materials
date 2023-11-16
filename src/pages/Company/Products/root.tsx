import React from 'react'
import Table from './Table/root'
import InfoModal from '../../../components/InfoModal/InfoModal'
import { ICompany } from '../../../types/model'
import AddProduct from './AddProduct'

type ProductsProps = {
  companyData: ICompany
}

const Products = ({ companyData }: ProductsProps) => {
  const [openAddProduct, setOpenAddProduct] = React.useState(false)

  return (
    <div className='h-1/2'>
      <InfoModal open={openAddProduct} onClose={() => setOpenAddProduct(false)}>
        <AddProduct handleClose={() => setOpenAddProduct(false)} companyData={companyData} />
      </InfoModal >
      <Table handleOpenAddModal={() => setOpenAddProduct(true)} companyData={companyData} />
    </div>
  )
}

export default Products