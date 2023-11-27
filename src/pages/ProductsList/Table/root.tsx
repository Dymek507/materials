import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';

import { db } from '../../../../firebase';
import { useAppSelector } from '../../../store/app/hooks';
import { IDistanceList, IProduct } from '../../../types/model';
import deleteProduct from '../../../utils/productUtils/deleteProduct';

import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreIcon from '@mui/icons-material/More';

type TableProps = {
  handleOpenAddModal: () => void
}

const Table = ({ handleOpenAddModal }: TableProps) => {

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
        accessorKey: 'company',
        header: 'Firma',
        size: 300,
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
        header: 'Odl.',
        size: 50,
      },
      {
        accessorFn: row => (row.price + (row.distance ? row.distance * 0.35 : 0)).toFixed(0),
        enableClickToCopy: true,
        header: 'Franco',
        size: 50,
      },
      {
        accessorFn: (row) => (
          <IconButton
            onClick={() => {
              navigate(`/products/${row.id}`)
            }}
          >
            <MoreIcon />
          </IconButton>
        ),
        header: 'Więcej',
        size: 40,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    positionToolbarAlertBanner: 'bottom',
    renderTopToolbarCustomActions: ({ table }) => (
      //Add button icon and after delete clear array of selected rows
      <div>
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
    muiTableBodyCellProps: {
      sx: {
        borderRight: '2px solid #e0e0e0', //add a border between columns
        '&:last-child': {
          borderRight: 'none', //remove the border on the last column
        },
        padding: '0.5rem 1rem', //add some padding to the cells
      },
    },
  });


  return (
    <MaterialReactTable table={table} />
  )

};

export default Table;
