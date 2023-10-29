import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Divider } from '@mui/material';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { IConstructionSite } from '../../../types/model';
import InfoModal from '../../InfoModal/InfoModal';
import AddSite from './AddSite';
import { useAppDispatch } from '../../../store/app/hooks';
import { setConstructionSite } from '../../../store/constructionSlice';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function ChangeSite({ site }: { site: string }) {

  const [siteList, setSiteList] = useState<IConstructionSite[]>([])

  const [showModal, setShowModal] = useState<boolean>(false)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const dispatch = useAppDispatch()

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeModal = () => {
    setShowModal(false)
  }

  const addButtonHandler = () => {
    setShowModal(true)
    handleClose()
  }

  const setSite = async (site: IConstructionSite) => {
    //set default site
    localStorage.setItem("def_site", site.id)
    dispatch(setConstructionSite(site))
    handleClose()
  }

  //Download data from firebase
  useEffect(() => {
    const getCompanies = async () => {
      const q = query(collection(db, "sites"));
      const querySnapshot = await getDocs(q);
      const newList: IConstructionSite[] = []
      querySnapshot.forEach((doc) => {
        newList.push(doc.data() as IConstructionSite)
      });
      setSiteList(newList)
      //load default site
      const site = newList.find(site => site.id == localStorage.getItem("def_site"))

      dispatch(setConstructionSite(site || newList[0]))
    }
    getCompanies()
  }, [])

  return (
    <div>
      <InfoModal open={showModal} onClose={closeModal} >
        <AddSite onClose={closeModal} />
      </InfoModal>
      <a>
        <button
          className='px-1 menu menu-horizontal'
          id="demo-customized-button"
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {site}
          <KeyboardArrowDownIcon />
        </button>
      </a>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {siteList && siteList.map((site, index) => (
          <MenuItem key={index} onClick={() => setSite(site)} disableRipple>
            {site.name}
          </MenuItem>
        ))}
        <Divider sx={{ borderColor: "black" }} />
        <MenuItem onClick={addButtonHandler} disableRipple>
          Dodaj...
        </MenuItem>
      </StyledMenu>
    </div>
  );
}