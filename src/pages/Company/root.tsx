import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../../firebase';
import { ICompany } from '../../types/model';
import { useAppSelector } from '../../store/app/hooks';
import CompanyMap from './Map/root';
import { Grid } from '@mui/material';
import InfoModal from '../../components/InfoModal/InfoModal';
import CompanyForm from './CompanyForm';
import InfoSection from './InfoSection';

const Company = () => {
  const [companyData, setCompanyData] = React.useState({} as ICompany)
  const [distance, setDistance] = React.useState(0)
  const [changed, setChanged] = React.useState(false)

  const [editModalOpen, setEditModalOpen] = React.useState(false)

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

  const handleEdit = () => {
    setEditModalOpen(true)
  }

  return (
    <Grid container className='h-full'>
      <InfoModal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <CompanyForm handleClose={() => setEditModalOpen(false)} companyData={companyData} getRefresh={() => setChanged(true)} edit={true} />
      </InfoModal>
      {/* Company info section */}
      <Grid item xs={6}>
        <InfoSection companyData={companyData} distance={distance} handleEdit={handleEdit} />
      </Grid>
      {/* Map section */}
      <Grid item xs={6} className='w-full h-full '>
        <CompanyMap companyCords={companyData.cords} siteCords={siteCords} setDistance={getDistance} changed={changed} />
      </Grid>
    </Grid>
  )
}

export default Company