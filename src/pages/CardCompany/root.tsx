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
import Products from './Products/root';
import ImportFromExcel from './Products/ImportFromExcel/root';
import CommentsSection from './CommentsSection/root';

const Company = () => {
  const [companyData, setCompanyData] = React.useState({} as ICompany)
  const [distance, setDistance] = React.useState(0)
  const [changed, setChanged] = React.useState(false)
  const [showImportModal, setShowImportModal] = React.useState(false);
  const [swithView, setSwithView] = React.useState(false)

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
  }, [editModalOpen, showImportModal])

  const getRefresh = () => {
    setChanged(prev => !prev)
  }

  const getDistance = (distance: number) => {
    setDistance(distance / 1000)
  }

  const handleEdit = () => {
    setEditModalOpen(true)
    setSwithView(false)
  }

  const showImportModalHandler = () => {
    setShowImportModal(true)
  }


  return (
    <Grid container className='h-full'>
      <InfoModal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <CompanyForm handleClose={() => setEditModalOpen(false)} companyData={companyData} getRefresh={getRefresh} edit={true} />
      </InfoModal>
      <ImportFromExcel open={showImportModal} onClose={() => setShowImportModal(false)} companyData={companyData} />
      {/* Company info section */}
      <Grid item xs={6} className='h-full'>
        <InfoSection companyData={companyData} distance={distance} handleEdit={handleEdit} handleImport={showImportModalHandler} />
        <Products companyData={companyData} distance={distance} />
      </Grid>
      {/* Map section */}
      <Grid item xs={6} className='wh-full'>
        {swithView ?
          <CompanyMap companyCords={companyData.cords} siteCords={siteCords} setDistance={getDistance} changed={changed} />
          :
          <div className='flex justify-center mt-8 wh-full'>
            <CommentsSection companyData={companyData} />
          </div>
        }
      </Grid>
    </Grid>
  )
}

export default Company