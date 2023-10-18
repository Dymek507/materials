import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { keyToName } from './helpers/keyToName';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../../firebase';
import { ICompany, IProduct } from '../../types/model';
import { useAppSelector } from '../../store/app/hooks';
import { Grid } from '@mui/material';
import ProductMap from './ProductMap';

const Product = () => {
  const [productData, setProductData] = React.useState({} as IProduct)
  const [distance, setDistance] = React.useState(0)
  const { cords_storage, company, category, price } = productData

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
      <Grid item xs={6} className='h-screen flex-center'>
        <div className='flex flex-col items-center text-3xl'>
          {category !== "" ? <h1 className='mb-2 text-3xl'>{category}</h1> : null}
          {company !== "" ? <h1 className='pb-2 mb-4 border-b-2'>{company}</h1> : null}
          <h1>{price} zł</h1>
          <h1>{distance.toFixed(2)} km</h1>
        </div>
      </Grid>
      <Grid item xs={6} className='h-screen flex-center'>
        <div className='w-[400px] h-[400px] mt-8'>
          <ProductMap companyCords={cords_storage} siteCords={siteCords} setDistance={getDistance} />
        </div>
      </Grid>
    </Grid>
  )
}

export default Product