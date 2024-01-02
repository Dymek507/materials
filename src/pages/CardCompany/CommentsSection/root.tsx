import {
  CommentGroup,
  FormTextArea,
  Button,
  Form,
  Header,
} from 'semantic-ui-react'
import SiteComments from './SingleComment'

const CommentsSection = () => (
  <CommentGroup className='w-full'>
    <Header as='h3' dividing>
      Komentarze
    </Header>
    <Form reply size='mini'>
      <FormTextArea />
      <Button content='Dodaj' labelPosition='left' icon='edit' primary />
    </Form>
    <SiteComments site='Kętrzyn' comments='Brak mocy przerobowych' />
    <SiteComments site='Izbica' comments='Wysłali oferte' />

  </CommentGroup>
)

export default CommentsSection
