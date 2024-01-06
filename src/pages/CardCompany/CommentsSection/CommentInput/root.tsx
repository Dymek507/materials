import React from 'react'

import { v1 as uuidv1 } from "uuid";

import { useAppSelector } from '../../../../store/app/hooks'
import { IComment, ICompany } from '../../../../types/model'

import { Box, TextField } from '@mui/material'
import addComment from '../utils/addComment';
import { getDateAndTime } from '../../../../utils/getDateAndTime';

type CommentInputProps = {
  companyData: ICompany
}

const CommentInput = ({ companyData }: CommentInputProps) => {

  const userId = useAppSelector(store => store.ui.userData?.uId) || ''
  const userLogin = useAppSelector(store => store.ui.userData?.login) || ''
  const siteId = useAppSelector(store => store.construction.constructionSite?.id) || ''
  const siteName = useAppSelector(store => store.construction.constructionSite?.name) || ''


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget);
    const text = data.get("text")?.toString()
    const activity = 0

    if (!text || !userId || !siteId) return

    const commentObject: IComment = {
      id: uuidv1(),
      date: getDateAndTime(),
      text: text,
      userId: userId,
      userLogin: userLogin,
      siteId: siteId,
      siteName: siteName,
      activity: activity,
      ban: false,
    }
    addComment(commentObject, companyData.id)

    event.currentTarget.reset()
  }
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ mt: 3 }}
    >
      <TextField id="text" variant="outlined"
        name="text"
        required
        fullWidth
        label="Napisz komentarz"
      />
    </Box>
  )
}

export default CommentInput