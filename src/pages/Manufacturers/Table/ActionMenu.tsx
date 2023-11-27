import { ListItemIcon, MenuItem } from '@mui/material';
import { AccountCircle, Send } from '@mui/icons-material';
import { MRT_Row } from 'material-react-table';
import { ICompanywithDistance } from '../helpers/types';
import { Link } from 'react-router-dom';


type ActionMenuProps = {
  closeMenu: () => void,
  row: MRT_Row<ICompanywithDistance>
}

const ActionMenu = ({ closeMenu, row }: ActionMenuProps) => {
  return (
    <div>
      <Link to={`/table/${row.original.id}`}>
        {/* <MenuItem
          key={0}
          onClick={() => {
            // View profile logic...
            closeMenu();
          }}
          sx={{ m: 0 }}
        >
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          View Profile
        </MenuItem>
      </Link>
      <MenuItem
        key={1}
        onClick={() => {
          // Send email logic...
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Send />
        </ListItemIcon>
        Send Email
      </MenuItem> */}
      </Link>
    </div>
  )
}

export default ActionMenu