import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { ICompanywithDistance } from '../helpers/types';
import { Link, useLocation } from 'react-router-dom';

import { IconButton } from '@mui/material';
import MoreIcon from '@mui/icons-material/More';

const Table = () => {
  const location = useLocation()

  const { data } = location.state as { data: ICompanywithDistance[] }

  const columns = useMemo<MRT_ColumnDef<ICompanywithDistance>[]>(
    () => [
      {
        accessorKey: 'group',
        header: 'Grupa',
        size: 250,
      },
      {
        accessorKey: 'company',
        header: 'Firma',
        size: 250,
      },
      {
        accessorKey: 'category',
        header: 'Asortyment',
        size: 100,
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
        size: 250,
      },
      {
        accessorFn: (row) => (
          <Link to={`/table/${row.id}`}>
            <IconButton>
              <MoreIcon />
            </IconButton>
          </Link>
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
    muiTableBodyCellProps: {
      sx: {
        borderRight: '2px solid #e0e0e0',
        '&:last-child': {
          borderRight: 'none',
        },
        padding: '0.5rem 1rem',
      },
    },
  });

  return (
    <div className='flex-col wh-full flex-center'>
      <MaterialReactTable table={table} />
    </div>
  )

};

export default Table;
