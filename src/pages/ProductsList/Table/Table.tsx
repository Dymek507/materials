import React, { HTMLProps, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../../index.css'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  getFilteredRowModel,
} from '@tanstack/react-table'
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../../../firebase'
import { Cords, IDistanceList, IProduct } from '../../../types/model'
import { useAppSelector } from '../../../store/app/hooks'
import CsvDownloadButton from 'react-json-to-csv'
import deleteProduct from '../utils/deleteProduct'
import IndeterminateCheckbox from './IndeterminateCheckbox'

function Table() {

  const [sorting, setSorting] = React.useState<SortingState>([])

  const [data, setData] = React.useState<IProduct[]>([])

  const [accDistArray, setAccDistArray] = React.useState<IDistanceList[]>([{ id: "1", acc_dist: 0 }])

  const [rowSelection, setRowSelection] = React.useState({})

  const navigate = useNavigate()

  const constructionSite = useAppSelector(state => state.construction.constructionSite)

  const productsRef = collection(db, "products");

  const getAccDistance = (id: string | undefined) => {
    if (!id || accDistArray?.length === 0) return 0

    const accDist = accDistArray?.find((accDist) => accDist.id === id)

    return accDist?.acc_dist
  }

  useEffect(() => {
    const getDistanceArray = async () => {
      const accDistRef = doc(db, "sites", constructionSite.id);
      const distanceArray = await getDoc(accDistRef)
      setAccDistArray(distanceArray.data()?.dist_arr)
    }
    getDistanceArray()
  }, [constructionSite, constructionSite.cords])

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

  const handleRowClick = (id: string | undefined) => {
    if (!id) return
    navigate(`/productst/${id}`);
  }

  const columns = React.useMemo<ColumnDef<IProduct>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      {
        accessorFn: row => row.key,
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => <span>Firma</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.category,
        id: 'category',
        cell: info => info.getValue(),
        header: () => <span>Asortyment</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.material,
        id: 'material',
        cell: info => info.getValue(),
        header: () => <span>Material</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.price,
        id: 'price',
        cell: info => info.getValue(),
        header: () => <span>Cena</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => (row.distance ?? 0).toFixed(2),
        id: 'transport_acc',
        cell: info => info.getValue(),
        header: () => <span>Odległość dok.</span>,
        footer: props => props.column.id,
        size: 300
      },
      {
        accessorFn: row => (row.price + (row.distance * 0.5)).toFixed(2),
        id: 'franco',
        cell: info => info.getValue(),
        header: () => <span>Cena franco</span>,
        footer: props => props.column.id,
      },
      {
        id: 'more',
        header: ({ table }) => (
          "Więcej"
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <button onClick={() => handleRowClick(row.original.id)}>Więcej</button>
          </div>
        ),
      },
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 30,
      },
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    onRowSelectionChange: setRowSelection,
    // enableColumnResizing: true,
  })
  //Delete rows 

  const deleteHandler = () => {
    table.getSelectedRowModel().flatRows.map(row => deleteProduct(row.original.id))
    table.setRowSelection({})
  }


  return (
    <div className="flex-col w-full p-2 flex-center">
      <div className="h-2" />
      <table className='w-4/6'>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody className=''>
          {table
            .getRowModel()
            .rows.slice(0, 50)
            .map(row => {
              return (
                <tr className='' key={row.id} >
                  {/* <tr className='' onClick={() => handleRowClick(row.original.id)} key={row.id} > */}
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td className='px-2' key={cell.id}>

                        {
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        }
                      </td>
                    )
                  })}
                </tr>
              )
            })}
        </tbody>
      </table >
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="p-1 border rounded"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="p-1 border rounded"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="p-1 border rounded"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="p-1 border rounded"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="w-16 p-1 border rounded"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <CsvDownloadButton data={data} />
        <button onClick={deleteHandler}>Usuń</button>
      </div>

    </div >
  )
}

export default Table