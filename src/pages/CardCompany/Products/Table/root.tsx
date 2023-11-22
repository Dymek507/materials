import { useEffect, useMemo, useState } from 'react';

import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';

import { db } from '../../../../../firebase';
import { useAppSelector } from '../../../../store/app/hooks';
import deleteProduct from '../../../../utils/productUtils/deleteProduct';
import { ICompany, IDistanceList, IProduct } from '../../../../types/model';

import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';

type TableProps = {
  handleOpenAddModal: () => void,
  companyData: ICompany,
}

const Table = ({ handleOpenAddModal, companyData }: TableProps) => {
  const constructionSite = useAppSelector(state => state.construction.constructionSite)

  const [data, setData] = useState<IProduct[]>([])

  const [accDistArray, setAccDistArray] = useState<IDistanceList[]>([{ id: "1", acc_dist: 0 }])

  const navigate = useNavigate()

  useEffect(() => {
    const getDistanceArray = async () => {
      const accDistRef = doc(db, "sites", constructionSite.id);
      const distanceArray = await getDoc(accDistRef)
      setAccDistArray(distanceArray.data()?.dist_arr)
    }
    getDistanceArray()
  }, [constructionSite, constructionSite.cords])

  const getAccDistance = (id: string | undefined) => {
    if (!id || accDistArray?.length === 0) return 0

    const accDist = accDistArray?.find((accDist) => accDist.id === id)

    return accDist?.acc_dist
  }

  useEffect(() => {
    if (!companyData?.id) return
    const fetchData = async () => {
      const productsRef = collection(db, "products")
      const q = query(productsRef, where("key", "==", companyData?.id))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const firebaseProductsList = [] as IProduct[]
        querySnapshot.forEach((product) => {
          const productData = product.data() as IProduct
          productData.distance = getAccDistance(productData.id)
          firebaseProductsList.push(productData)
        });
        setData(firebaseProductsList)
      });
      return () => unsubscribe()
    }
    fetchData()
  }, [constructionSite, constructionSite.cords, accDistArray, companyData.id])

  const columns = useMemo<MRT_ColumnDef<IProduct>[]>(
    () => [
      {
        accessorKey: 'category',
        header: 'Asortyment',
        size: 100,
      },
      {
        accessorKey: 'material',
        header: 'Materiał',
        size: 300,
      },
      {
        accessorKey: 'price',
        enableClickToCopy: true,
        header: 'Cena',
        size: 50,
      },
      {
        accessorFn: row => (row.price + (row.distance ? row.distance * 0.35 : 0)).toFixed(0),
        enableClickToCopy: true,
        header: 'Cena franco',
        size: 50,
      },
      {
        accessorFn: (row) => (
          <IconButton
            onClick={() => {
              navigate(`/products/${row.id}`)
            }}
          >
            <InfoIcon />
          </IconButton>
        ),
        header: 'Więcej',
        size: 50,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    renderTopToolbarCustomActions: () => (
      <div>
        <IconButton onClick={() => {
          handleOpenAddModal()
        }}><AddIcon /></IconButton>
        <IconButton
          onClick={() => {
            const selectedRows = table.getSelectedRowModel().rows;
            selectedRows.forEach((row) => {
              deleteProduct(row.original.id)
            })
            selectedRows.length = 0;
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    ),
  });
  return (
    <div className='h-full overflow-scroll' >
      <MaterialReactTable table={table} />
    </div >
  )

};

export default Table;
