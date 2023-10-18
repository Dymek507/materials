import React from 'react'

import { Modal, Box, Select } from '@mui/material'
import { styled } from '@mui/material/styles';


type InfoModalProps = {
  children?: React.ReactNode
  open: boolean;
  onClose: () => void
}
const InfoModal = ({ children, open,
  onClose }: InfoModalProps) => {

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: '3rem',
      }}
    >
      <Box className=' bg-main sm:max-w-[800px]'>
        {children}
      </Box >
    </Modal >
  );
}

export default InfoModal
