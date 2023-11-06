import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { ICompanywithDistance } from '../helpers/types';
import { useLocation } from 'react-router-dom';
import ActionMenu from './ActionMenu';


const Table = () => {
  const location = useLocation()

  const { data } = location.state as { data: ICompanywithDistance[] }

  const columns = useMemo<MRT_ColumnDef<ICompanywithDistance>[]>(
    () => [
      {
        accessorKey: 'group',
        header: 'Grupa',
        size: 150,
      },
      {
        accessorKey: 'company',
        header: 'Firma',
        size: 150,
      },
      {
        accessorKey: 'category',
        header: 'Asortyment',
        size: 200,
      },
      {
        accessorKey: 'mail',
        enableClickToCopy: true,
        header: 'Email',
        size: 150,
      },
      {
        accessorKey: 'phone',
        enableClickToCopy: true,
        header: 'Telefon',
        size: 150,
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
  });

  return (
    <div className='m-8'>
      <MaterialReactTable table={table} />
    </div>
  )

};

export default Table;
