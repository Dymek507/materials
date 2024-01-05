import {
  CommentGroup,
  Header,
} from 'semantic-ui-react'

import { v1 as uuidv1 } from "uuid";

import SiteComments from './SingleComment'
import { Box, TextField } from '@mui/material'
import { useAppSelector } from '../../../store/app/hooks'
import { IComment, ICompany } from '../../../types/model'
import { getDate } from '../../../utils/getDate';
import addComment from './utils/addComment';

type CommentsSectionProps = {
  companyData: ICompany
}

const CommentsSection = ({ companyData }: CommentsSectionProps) => {

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
      date: getDate(),
      text: text,
      userId: userId,
      userLogin: userLogin,
      siteId: siteId,
      siteName: siteName,
      activity: activity,
      ban: false,
    }
    console.log(commentObject)
    addComment(commentObject, companyData.id)

    event.currentTarget.reset()
  }

  return (
    <CommentGroup className='w-full'>
      <Header as='h3' dividing>
        Komentarze
      </Header>
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

      {companyData.comments?.map((comment) => (
        <SiteComments
          key={comment.id}
          site={comment.siteName}
          text={comment.text}
          user={comment.userLogin}
        />
      ))}

    </CommentGroup>
  )
}

export default CommentsSection

