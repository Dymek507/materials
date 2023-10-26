import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { keyToName } from './helpers/keyToName';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../../firebase';
import { ICompany, IProduct } from '../../types/model';
import { useAppSelector } from '../../store/app/hooks';
import { Grid } from '@mui/material';
import ProductMap from './ProductMap';
import InfoModal from '../../components/InfoModal/InfoModal';

const Product = () => {
  const [productData, setProductData] = React.useState({} as IProduct)
  const [distance, setDistance] = React.useState(0)
  const [openEditModal, setOpenEditModal] = React.useState(false)
  const { cords, key, category, price } = productData

  const { id } = useParams();

  const siteCords = useAppSelector((state) => state.construction.constructionSite.cords);

  const docRef = doc(db, `products/${id}`);

  useEffect(() => {
    const getData = async () => {
      const docSnap = await getDoc(docRef);
      setProductData(docSnap.data() as IProduct)
    }
    getData()
  }, [])

  const getDistance = (distance: number) => {
    setDistance(distance / 1000)
  }

  return (
    <Grid container spacing={2} className='h-full p-2'>
      <InfoModal open={openEditModal} onClose={() => setOpenEditModal(false)}>

      </InfoModal >
      <Grid item xs={6} className='h-screen flex-center'>
        <div className='flex flex-col items-center text-3xl'>
          {category !== "" ? <h1 className='mb-2 text-3xl'>{category}</h1> : null}
          {key !== "" ? <h1 className='pb-2 mb-4 border-b-2'>{key}</h1> : null}
          <h2>{price} zł</h2>
          <h2>{distance.toFixed(2)} km</h2>
          <h1>{(price + distance * 0.5).toFixed(2)} zł</h1>
        </div>
      </Grid>
      <Grid item xs={6} className='h-screen flex-center'>
        <div className='w-[400px] h-[400px] mt-8'>
          <ProductMap companyCords={cords} siteCords={siteCords} setDistance={getDistance} />
        </div>
      </Grid>
    </Grid>
  )
}

export default Product