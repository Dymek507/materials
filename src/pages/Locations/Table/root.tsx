import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../../../index.css'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import CsvDownloadButton from 'react-json-to-csv'
import IndeterminateCheckbox from './IndeterminateCheckbox'
import { ICompanyDistance } from '../Locations'
import { dataToExport } from '../../../utils/dataToExport'



function Table() {

  const [sorting, setSorting] = React.useState<SortingState>([])
  const location = useLocation()

  const { data } = location.state as { data: ICompanyDistance[] }
  const navigate = useNavigate()

  const handleRowClick = (id: string | undefined) => {
    if (!id) return
    navigate(`/table/${id}`);
  }

  const columns = React.useMemo<ColumnDef<ICompanyDistance>[]>(
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
        accessorFn: row => row.group,
        id: 'group',
        cell: info => info.getValue(),
        header: () => <span>Grupa</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.company,
        id: 'company',
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
        accessorFn: row => row.adress,
        id: 'adress',
        cell: info => info.getValue(),
        header: () => <span>Adres</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.mail,
        id: 'mail',
        cell: info => info.getValue(),
        header: () => <span>Mail</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.phone,
        id: 'phone',
        cell: info => info.getValue(),
        header: () => <span>Phone</span>,
        footer: props => props.column.id,
        size: 300
      },
      {
        accessorFn: row => row.distance,
        id: 'distance',
        cell: info => info.getValue(),
        header: () => <span>Distance</span>,
        footer: props => props.column.id,
      },
      {
        id: 'more',
        header: () => (
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
    // enableColumnResizing: true,
  })
  //Delete rows 

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
        <CsvDownloadButton data={dataToExport(data)} />
      </div>

    </div >
  )
}

export default Table