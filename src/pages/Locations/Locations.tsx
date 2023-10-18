import React, { useEffect, useState } from 'react'
import Map from './Map/Map'
import { Box, Button, Checkbox, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Slider } from '@mui/material'
import { ICategory, ICompany } from '../../types/model'
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import { PRODUCT_TYPES } from './productTypes'
import CsvDownloadButton from 'react-json-to-csv'

export type Type = {
  kruszywo: boolean
  cement: boolean
}

const Locations = () => {
  const [category, setCategory] = React.useState<string>("kruszywo")

  const [companyList, setCompanyList] = useState<ICompany[]>([])

  const [categories, setCategories] = useState<ICategory[]>()
  console.log(categories)

  const [radius, setRadius] = useState<number>(50)


  //Get categories from server 

  useEffect(() => {
    const getCategories = async () => {
      const q = query(collection(db, "categories"))
      const querySnapshot = await getDocs(q);
      const newList: ICategory[] = []
      querySnapshot.forEach((doc) => {
        newList.push(doc.data() as ICategory)
      });
      setCategories(newList)
    }
    getCategories()
  }, [])

  //Get data once

  useEffect(() => {
    const getCompanies = async () => {
      setCompanyList([])
      const q = query(collection(db, "companies"), where("category", "array-contains", category))
      // const q = query(collection(db, "companies"), whereField("type", arrayContains: type))
      const querySnapshot = await getDocs(q);
      const newList: ICompany[] = []
      querySnapshot.forEach((doc) => {
        newList.push(doc.data() as ICompany)
      });
      setCompanyList(newList)
    }
    getCompanies()
  }, [category])

  const checkboxHandler = (category: string) => {
    setCategory(category)
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
          defaultValue={0}
          getAriaValueText={valuetext}
          onChange={e => setRadius(e?.target?.value ? e.target.value : 0)}
          valueLabelDisplay="auto"
          step={50}
          marks
          min={0}
          max={250}
        />
        <ul className='flex flex-col gap-2 text-black'>
          {categories && categories.map((item) => (
            <li key={item.key} ><Checkbox onChange={e => checkboxHandler(item.key)} checked={item.key == category} />{item.name}</li>
          ))
          }
        </ul>
      </div>
      <Map list={companyList} circleRadius={radius} />
    </div>
  )
}

export default Locations