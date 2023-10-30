// @ts-nocheck

import React, { useEffect, useState } from 'react'
import Map from './Map/Map'
import { Checkbox, Slider } from '@mui/material'
import { ICategory, ICompany } from '../../types/model'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import CsvDownloadButton from 'react-json-to-csv'
import { Link } from 'react-router-dom'
import CompanyForm from '../Company/CompanyForm'
import InfoModal from '../../components/InfoModal/InfoModal'
import { useAppSelector } from '../../store/app/hooks'
import { getLineDistance } from '../../utils/lineDistance'
import { dataToExport } from '../../utils/dataToExport'

export type Type = {
  kruszywo: boolean
  cement: boolean
}

export interface ICompanyDistance extends ICompany {
  distance: number
}

const Locations = () => {
  const [category, setCategory] = React.useState<string>("")

  const [companyList, setCompanyList] = useState<ICompanyDistance[]>([])

  const [companyListFiltered, setCompanyListFiltered] = useState<ICompanyDistance[]>([])

  const [categories, setCategories] = useState<ICategory[]>()

  const [radius, setRadius] = useState<number>(0)

  const [openAddModal, setOpenAddModal] = useState<boolean>(false)

  const [refresh, setRefresh] = useState<boolean>(false)

  const siteCords = useAppSelector(state => state.construction.constructionSite.cords)

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
      //load default category
      setCategory(localStorage.getItem("def_category") || "")
    }
    getCategories()
  }, [])


  useEffect(() => {
    const getCompanies = async () => {
      setCompanyList([])
      const q = query(collection(db, "companies"), where("category", "array-contains", category))
      const querySnapshot = await getDocs(q);
      const newList: ICompanyDistance[] = []
      querySnapshot.forEach((doc) => {
        const data = doc.data() as ICompanyDistance
        data.distance = getLineDistance(data.cords, siteCords)
        newList.push(data as ICompanyDistance)
      });
      setCompanyList(newList)
    }
    getCompanies()
    setRefresh(false)
  }, [category, refresh, siteCords])

  useEffect(() => {
    if (radius == 0) {
      return setCompanyListFiltered(companyList)
    }
    const filreredList = companyList.filter(item => item.distance <= radius)
    setCompanyListFiltered(filreredList)
    console.log(filreredList)
  }
    , [radius, companyList, category, refresh, siteCords])

  const checkboxHandler = (category: string) => {
    setCategory(category)
    //save default category
    localStorage.setItem("def_category", category);
  }

  const valuetext = (value: number) => {
    return `${value}°C`;
  }


  return (
    <div>
      <InfoModal open={openAddModal} onClose={() => setOpenAddModal(false)}>
        <CompanyForm handleClose={() => setOpenAddModal(false)} getRefresh={() => setRefresh(true)} edit={false} />
      </InfoModal>
      <div className='absolute top-40 bg-slate-300 w-72 h-[600px] z-[999] p-4 ml-4  '>
        <CsvDownloadButton data={dataToExport(companyListFiltered)} className='text-black' />
        <Link to='/table' state={{ data: companyListFiltered }}>
          <button className='ml-4 text-black'>Tabela</button>
        </Link>
        <button onClick={() => setOpenAddModal(true)} className='ml-4 text-black'>Dodaj</button>
        <Slider
          aria-label="Temperature"
          defaultValue={0}
          getAriaValueText={valuetext}
          onChange={e => {
            setRadius(e?.target?.value ? e.target.value : 0)
          }
          }
          valueLabelDisplay="auto"
          step={50}
          marks
          min={0}
          max={350}
        />
        <ul className='flex flex-col gap-2 h-[500px] overflow-y-scroll text-black'>
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