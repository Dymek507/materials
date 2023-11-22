import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../../firebase';
import { IProduct } from '../../types/model';
import { useAppSelector } from '../../store/app/hooks';
import { Grid } from '@mui/material';
import ProductMap from './Map/rootMap';
import InfoModal from '../../components/InfoModal/InfoModal';
import InfoSection from './InfoSection';
import UpdateProductForm from './UpdateProductForm/root';

const Product = () => {
  const [productData, setProductData] = React.useState({} as IProduct)
  const [distance, setDistance] = React.useState(0)
  const [openEditModal, setOpenEditModal] = React.useState(false)

  const { cords } = productData

  const { id } = useParams();

  const siteCords = useAppSelector((state) => state.construction.constructionSite.cords);

  const docRef = doc(db, `products/${id}`);

  useEffect(() => {
    const getData = async () => {
      const docSnap = await getDoc(docRef);
      setProductData(docSnap.data() as IProduct)
    }
    getData()
  }, [openEditModal])

  const getDistance = (distance: number) => {
    setDistance(distance / 1000)
  }
  const handleEdit = () => {
    setOpenEditModal(true)
  }

  // console.log('cardProduct refresh')

  return (
    <Grid container className='h-full'>
      <InfoModal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <UpdateProductForm handleClose={() => setOpenEditModal(false)} productData={productData} />
      </InfoModal >
      {/* Product info section */}
      <Grid item xs={6}>
        <InfoSection productData={productData} distance={distance} handleEdit={handleEdit} />
      </Grid>
      {/* Map section */}
      <Grid item xs={6} className='w-full h-full '>
        <ProductMap companyCords={cords} siteCords={siteCords} setDistance={getDistance} />
      </Grid>
    </Grid>
  )
}

export default Product