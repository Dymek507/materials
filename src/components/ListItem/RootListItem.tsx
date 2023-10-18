import React, { useEffect } from 'react'

import DateDisplay from './DateDisplay'
import PlaceDisplay from './PlaceDisplay'
import company_logos from '../../assets/company_logos'
import Grid from '@mui/material/Grid'

import { IProduct } from '../../types/model'


interface ListItemProps {
  product: IProduct
  openModal: (product: IProduct) => void
  selectedIDs: string[]
  select: (id: string) => void
}

const ListItem = ({ product, openModal, selectedIDs, select }: ListItemProps) => {
  const { category, material, price, company } = product

  const [selected, setSelected] = React.useState(false)

  useEffect(() => {
    if (selectedIDs.includes(product.id)) {
      setSelected(true)
    } else {
      setSelected(false)
    }
  }, [selectedIDs])

  const openModalHandler = () => {
    openModal(product)
  }

  const perKilometer = () => {
    return 0
  }

  return (
    <Grid container spacing={1} className='w-full overflow-x-hidden text-sm text-black xl:text-2xl'
      style={{ backgroundColor: selected ? "gray" : 'white' }}>
      {/* Checkbox */}
      <Grid item xxs={1} md={0.5} className="flex-center">
        <input type="checkbox" className='w-5 h-5' checked={selected} onChange={() => select(product.id)} />
      </Grid>
      {/* State */}
      <Grid item xxs={3} md={3} className=" wh-full">
        {/* <State cargo={cargo} /> */}
        <p>{category}</p>
      </Grid>
      <Grid item xxs={3} md={3} className="wh-full">
        {/* <State cargo={cargo} /> */}
        <p>{material}</p>
      </Grid>
      {/* Logo */}
      <Grid item xxs={2} md={1} className="" >
        {/* <img src={company_logos.get(cargo.company ?? "solbet")} alt="Company_logo" /> */}
        <p>{price}</p>
      </Grid>
      <Grid item xxs={2} md={1} className="" >
        {/* <img src={company_logos.get(cargo.company ?? "solbet")} alt="Company_logo" /> */}
        <p>{company}</p>
      </Grid>
      {/* Id*/}
    </Grid>
  )
}

export default ListItem

