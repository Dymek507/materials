import React, { useEffect, useState } from 'react'
import Map from './Map/root'
import { Checkbox, IconButton, Slider } from '@mui/material'
import { ICategory } from '../../types/model'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../firebase'
import CsvDownloadButton from 'react-json-to-csv'
import { Link } from 'react-router-dom'
import CompanyForm from '../CardCompany/CompanyForm'
import InfoModal from '../../components/InfoModal/InfoModal'
import { useAppSelector } from '../../store/app/hooks'
import { getLineDistance } from '../../utils/lineDistance'
import { dataToExport } from '../../utils/dataToExport'
import { ICompanywithDistance } from './helpers/types'

import GridOnIcon from '@mui/icons-material/GridOn';
import ImportCompaniesFromExcel from './ImportCompaniesFromExcel/root'
import { LeafletRightClickProvider } from 'react-leaflet-rightclick'

const Locations = () => {
  const [category, setCategory] = React.useState<string>("")

  const [companyList, setCompanyList] = useState<ICompanywithDistance[]>([])

  const [companyListFiltered, setCompanyListFiltered] = useState<ICompanywithDistance[]>([])

  const [categories, setCategories] = useState<ICategory[]>()

  const [radius, setRadius] = useState<number>(0)

  const [openAddModal, setOpenAddModal] = useState<boolean>(false)

  const [openImportModal, setOpenImportModal] = useState<boolean>(false)

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
      const newList: ICompanywithDistance[] = []
      querySnapshot.forEach((doc) => {
        const data = doc.data() as ICompanywithDistance
        data.distance = getLineDistance(data.cords, siteCords)
        newList.push(data as ICompanywithDistance)
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
  }
    , [radius, companyList, category, refresh, siteCords])

  const checkboxHandler = (category: string) => {
    setCategory(category)
    //save default category
    localStorage.setItem("def_category", category);
  }

  const valuetext = (value: number) => {
    return `${value}`;
  }


  return (
    <div className='wh-full'>
      <InfoModal open={openAddModal} onClose={() => setOpenAddModal(false)}>
        <CompanyForm handleClose={() => setOpenAddModal(false)} getRefresh={() => setRefresh(true)} edit={false} />
      </InfoModal>
      {/* This component change navbar color */}
      <ImportCompaniesFromExcel open={openImportModal} onClose={() => setOpenImportModal(false)} />
      <div className='absolute top-32 bg-slate-300 w-72 h-[600px] z-[999] p-4 ml-4  '>
        <CsvDownloadButton data={dataToExport(companyListFiltered)} className='text-black' >
          Export
        </CsvDownloadButton>
        <Link to='/table' state={{ data: companyListFiltered }}>
          <button className='ml-4 text-black'>Tabela</button>
        </Link>
        <button onClick={() => setOpenAddModal(true)} className='ml-4 text-black'>Dodaj</button>
        <IconButton onClick={() => setOpenImportModal(true)} sx={{ ml: '1rem' }}>
          <GridOnIcon />
        </IconButton>
        <Slider
          aria-label="Temperature"
          defaultValue={0}
          getAriaValueText={valuetext}
          onChange={e => {
            const radius = e.target as HTMLInputElement
            const value = Number(radius.value)
            setRadius(value)
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
            <li key={item.key} ><Checkbox onChange={() => checkboxHandler(item.key)} checked={item.key == category} />{item.name}</li>
          ))
          }
        </ul>
      </div>
      <LeafletRightClickProvider>
        <Map list={companyList} circleRadius={radius} />
      </LeafletRightClickProvider>
    </div>
  )
}

export default Locations