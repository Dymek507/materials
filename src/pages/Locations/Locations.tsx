import React, { useEffect, useState } from 'react'
import Map from './Map/Map'
import { Box, Button, Checkbox, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Slider } from '@mui/material'
import { ICompany } from '../../types/model'
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import { PRODUCT_TYPES } from './productTypes'
import CsvDownloadButton from 'react-json-to-csv'

export type Type = {
  kruszywo: boolean
  cement: boolean
}

const Locations = () => {
  const [type, setType] = React.useState<string>("")

  const [companyList, setCompanyList] = useState<ICompany[]>([])

  const [types, setTypes] = useState<string[]>(PRODUCT_TYPES)

  const [radius, setRadius] = useState<number>(50)

  //Get data once

  useEffect(() => {
    const getCompanies = async () => {
      setCompanyList([])
      const q = query(collection(db, "companies"), where("type", "==", type));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setCompanyList(prev => [...prev, doc.data() as ICompany])
      });
    }
    getCompanies()
  }, [type])

  const checkboxHandler = (type: string) => {
    setType(type)
  }



  const valuetext = (value: number) => {
    return `${value}°C`;
  }

  return (
    <div>
      <div className='absolute top-40 bg-slate-300 w-72 h-[600px] z-[999] p-4 ml-4  overflow-y-scroll'>
        <CsvDownloadButton data={companyList} />
        <Slider
          aria-label="Temperature"
          defaultValue={50}
          getAriaValueText={valuetext}
          onChange={e => setRadius(e?.target?.value ? e.target.value : 50)}
          valueLabelDisplay="auto"
          step={50}
          marks
          min={50}
          max={250}
        />
        <ul className='flex flex-col gap-2 text-black'>
          {types.map((item) => (
            <li key={item} ><Checkbox onChange={e => checkboxHandler(item)} checked={item == type} />{item}</li>
          ))
          }
        </ul>
      </div>
      <Map list={companyList} circleRadius={radius} />
    </div>
  )
}

export default Locations