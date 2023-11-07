import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import ActionMenu from './ActionMenu';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { useAppSelector } from '../../../store/app/hooks';
import { IDistanceList, IProduct } from '../../../types/model';
import { Button } from '@mui/material';

type TableProps = {
  handleOpenAddModal: () => void
}

const Table = ({ handleOpenAddModal }: TableProps) => {

  const constructionSite = useAppSelector(state => state.construction.constructionSite)

  const [data, setData] = useState<IProduct[]>([])

  const [accDistArray, setAccDistArray] = useState<IDistanceList[]>([{ id: "1", acc_dist: 0 }])

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

  const productsRef = collection(db, "products");

  useEffect(() => {
    const unsub = onSnapshot(productsRef, (products) => {
      const firebaseProductsList = [] as IProduct[]
      products.forEach((product) => {
        const productData = product.data() as IProduct
        productData.distance = getAccDistance(productData.id)
        firebaseProductsList.push(productData)
      });
      setData(firebaseProductsList)
    });
    return () => {
      unsub()
    }
  }, [constructionSite, constructionSite.cords, accDistArray])

  const columns = useMemo<MRT_ColumnDef<IProduct>[]>(
    () => [
      {
        accessorKey: 'key',
        header: 'Grupa',
        size: 200,
      },
      {
        accessorKey: 'category',
        header: 'Asortyment',
        size: 100,
      },
      {
        accessorKey: 'material',
        header: 'Materiał',
        size: 350,
      },
      {
        accessorKey: 'price',
        enableClickToCopy: true,
        header: 'Cena',
        size: 100,
      },
      {
        accessorFn: (row) => (row.distance ?? 0).toFixed(0),
        enableClickToCopy: true,
        header: 'Odległość dok.',
        size: 100,
      },
      {
        accessorFn: row => (row.price + (row.distance ?? 0 * 0.65)).toFixed(0),
        enableClickToCopy: true,
        header: 'Cena franco',
        size: 100,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowActions: true,
    enableRowSelection: true,
    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <ActionMenu key={row.id} closeMenu={closeMenu} row={row} />
    ],
    renderTopToolbarCustomActions: () => (
      <Button
        variant="contained"
        onClick={() => {
          handleOpenAddModal()
        }}

      >
        Dodaj produkt
      </Button>
    )
  });


  return (
    <MaterialReactTable table={table} />
  )

};

export default Table;
