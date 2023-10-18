import React from 'react'
import { Grid } from '@mui/material'
import { HEADER_ITEMS } from './data/header-data'

interface ITablerHeaderProps {
  handleSorting: (sortingAtr: string, sortingDir: boolean) => void
}
interface IChosenSorting {
  atr: string
  dir: boolean
}

const TablerHeader = ({ handleSorting }: ITablerHeaderProps) => {
  const [chosenSorting, setChosenSorting] = React.useState<IChosenSorting>({ atr: 'loadingDate', dir: true })

  const sortingHandler = (sortingAtr: string) => {
    if (sortingAtr === 'price' || sortingAtr === 'loadingDate') {
      handleSorting(sortingAtr, true)
      switch (chosenSorting.atr) {
        case sortingAtr:
          setChosenSorting({ atr: sortingAtr, dir: !chosenSorting.dir })
          break;
        default:
          setChosenSorting({ atr: sortingAtr, dir: true })
          break;
      }
    }
  }
  return (
    <Grid container spacing={1} className='w-full overflow-x-hidden text-white text-md xl:text-lg flex-center bg-gradient-to-r from-gray-700 via-gray-900 to-black'
    >
      {HEADER_ITEMS.map(({ name, atr, xxs, md }, index) => (
        <Grid item key={index} xxs={xxs} md={md} onClick={() => sortingHandler(atr)} className="text-[0.8em] text-center flex-center" >
          {name}
        </Grid>
      ))}
    </Grid>
  )

}

export default TablerHeader