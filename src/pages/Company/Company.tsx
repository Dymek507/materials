import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { keyToName } from './helpers/keyToName';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../../firebase';
import { ICompany } from '../../types/model';
import { useAppSelector } from '../../store/app/hooks';
import CompanyMap from './CompanyMap';
import { Grid } from '@mui/material';
import InfoModal from '../../components/InfoModal/InfoModal';
import AddSite from '../../components/Layout/ChangeSite/AddSite';
import CompanyForm from './CompanyForm';

const Company = () => {
  const [companyData, setCompanyData] = React.useState({} as ICompany)
  const [distance, setDistance] = React.useState(0)
  const [changed, setChanged] = React.useState(false)


  const [editModalOpen, setEditModalOpen] = React.useState(false)

  const { company, group, phone, mail, person, cords, comment } = companyData

  const { id } = useParams();

  const siteCords = useAppSelector((state) => state.construction.constructionSite.cords);

  const docRef = doc(db, `companies/${id}`);

  useEffect(() => {
    const getData = async () => {
      const docSnap = await getDoc(docRef);
      setCompanyData(docSnap.data() as ICompany)
    }
    getData()
    setChanged(false)
  }, [changed])

  const getDistance = (distance: number) => {
    setDistance(distance / 1000)
  }

  return (
    <Grid container spacing={2} className='h-full p-2'>
      <InfoModal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <CompanyForm handleClose={() => setEditModalOpen(false)} companyData={companyData} getRefresh={() => setChanged(true)} edit={true} />
      </InfoModal>
      <Grid item xs={6} className='h-full flex-center'>
        <div className='flex flex-col items-center text-xl'>
          {/* {group !== "" ? <h1 className='mb-2 text-3xl'>{group}  </h1> : null} */}
          {company !== "" ? <h1 className='pb-2 mb-4 border-b-2'>{company}</h1> : null}
          <h1>{phone}</h1>
          <h1>{mail}</h1>
          <h1>{person}</h1>
          <h1>{comment}</h1>
          <button onClick={() => setEditModalOpen(true)}>Edit</button>
          <h1 className='mt-8'>{distance.toFixed(2)} km</h1>
        </div>
      </Grid>
      <Grid item xs={6} className='h-full flex-center'>
        <div className='w-[800px] h-[400px] mt-8'>
          <CompanyMap companyCords={cords} siteCords={siteCords} setDistance={getDistance} changed={changed} />
        </div>
      </Grid>
    </Grid>
  )
}

export default Company