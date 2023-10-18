import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { keyToName } from './helpers/keyToName';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../../firebase';
import { ICompany } from '../../types/model';
import { useAppSelector } from '../../store/app/hooks';
import CompanyMap from './CompanyMap';
import { Grid } from '@mui/material';

const Company = () => {
  const [companyData, setCompanyData] = React.useState({} as ICompany)
  const [distance, setDistance] = React.useState(0)
  const { name, group, phone, mail, person, cords } = companyData


  const { id } = useParams();

  const siteCords = useAppSelector((state) => state.construction.constructionSite.cords);

  const docRef = doc(db, `companies/${id}`);

  useEffect(() => {
    const getData = async () => {
      const docSnap = await getDoc(docRef);
      setCompanyData(docSnap.data() as ICompany)
    }
    getData()
  }, [])

  const getDistance = (distance: number) => {
    setDistance(distance / 1000)
  }

  return (
    <Grid container spacing={2} className='h-full p-2'>
      <Grid item xs={6} className='h-full flex-center'>
        <div className='flex flex-col items-center text-xl'>
          {/* {group !== "" ? <h1 className='mb-2 text-3xl'>{group}  </h1> : null} */}
          {name !== "" ? <h1 className='pb-2 mb-4 border-b-2'>{name}</h1> : null}
          <h1>{phone}</h1>
          <h1>{mail}</h1>
          <h1>{person}</h1>
          <h1 className='mt-8'>{distance.toFixed(2)} km</h1>
          <div className='w-[800px] h-[400px] mt-8'>
            <CompanyMap companyCords={cords} siteCords={siteCords} setDistance={getDistance} />
          </div>
        </div>
      </Grid>
      {/* <Grid item xs={6} className='h-full'>
        <VirtualizedList />
      </Grid> */}
    </Grid>
    // <div className='flex flex-col items-center text-2xl'>
    //   <div>
    //     <button className='px-4 py-2 my-4 text-white bg-blue-500 rounded hover:bg-blue-600' onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&origin=${siteCords.lat},${siteCords.lng}&destination=${cords.lat},${cords.lng}&travelmode=driving`, '_blank')}>Get directions</button>
    //   </div>
    //   {//list of materials and prices based on distance
    //   }
    //   <ul>
    //     <li>
    //       <h1>{keyToName('cement')} {distance} zł</h1>
    //     </li>
    //   </ul>
    //
    // </div >
  )
}

export default Company