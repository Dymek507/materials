import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../../firebase';
import { ICompany } from '../../types/model';
import { useAppSelector } from '../../store/app/hooks';
import CompanyMap from './CompanyMap';
import { Grid } from '@mui/material';
import InfoModal from '../../components/InfoModal/InfoModal';
import CompanyForm from './CompanyForm';

const Company = () => {
  const [companyData, setCompanyData] = React.useState({} as ICompany)
  const [distance, setDistance] = React.useState(0)
  const [changed, setChanged] = React.useState(false)


  const [editModalOpen, setEditModalOpen] = React.useState(false)

  const { company, category, phone, mail, person, cords, comment, siding } = companyData

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
      <Grid item xs={6} className='flex-col h-full flex-center'>
        {company !== "" ? <h1 className='pb-2 mb-4 border-b-2'>{company}</h1> : null}
        <h1>{phone}</h1>
        <h1>{mail}</h1>
        <h1>{person}</h1>
        <h1>{comment}</h1>
        <h1>{category && category[0] === "kruszywo" ? siding : null}</h1>
        <button onClick={() => setEditModalOpen(true)}>Edit</button>
        <h1 className='mt-8'>{distance.toFixed(2)} km</h1>
      </Grid>
      <Grid item xs={6} className='w-full h-full'>
        <CompanyMap companyCords={cords} siteCords={siteCords} setDistance={getDistance} changed={changed} />
      </Grid>
    </Grid>
  )
}

export default Company