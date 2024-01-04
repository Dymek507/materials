import {
  CommentGroup,
  FormTextArea,
  Button,
  Form,
  Header,
} from 'semantic-ui-react'
import SiteComments from './SingleComment'
import { Box, TextField } from '@mui/material'
import { useAppSelector } from '../../../store/app/hooks'
import { ICompany } from '../../../types/model'

type CommentsSectionProps = {
  companyData: ICompany
}

const CommentsSection = ({ companyData }: CommentsSectionProps) => {

  const userData = useAppSelector(store => store.ui.userData)
  const siteData = useAppSelector(store => store.construction.constructionSite)


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    const content = data.get("comment")?.toString()
    if (!content) return
    event.currentTarget.reset()
    console.log(content)
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
        <TextField id="comment" variant="outlined"
          name="comment"
          required
          fullWidth
          label="Napisz komentarz"
        />
      </Box>

      <SiteComments site='Kętrzyn' comments='Brak mocy przerobowych' />
      <SiteComments site='Izbica' comments='Wysłali oferte' />

    </CommentGroup>
  )
}

export default CommentsSection
