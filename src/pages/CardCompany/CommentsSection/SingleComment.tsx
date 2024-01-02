import {
  CommentText,
  CommentMetadata,
  CommentGroup,
  CommentContent,
  CommentAvatar,
  CommentActions,
  CommentAction,
  CommentAuthor,
  FormTextArea,
  Button,
  Comment,
  Form,
  Header,
} from 'semantic-ui-react'
import { getDate } from '../../../utils/getDate';
import { IconButton, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from 'react';

type SiteCommentsProps = {
  site: string,
  comments: string
}

const SiteComments = ({ site, comments }: SiteCommentsProps) => {

  const [ExpandMore, setExpandMore] = useState(false)

  const date = getDate()

  return (
    <Comment className=''>
      <CommentContent>
        <Typography variant='h6' component='h6' className='text-sm font-bold border-b-2 border-black'>
          <IconButton size='small' onClick={() => setExpandMore(prev => !prev)}>
            {ExpandMore ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
          {site}
        </Typography>
      </CommentContent>
      <CommentGroup collapsed={ExpandMore}>
        <Comment>
          <CommentAvatar src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
          <CommentContent>
            <CommentAuthor as='a'>Damian Dominik</CommentAuthor>
            <CommentMetadata>
              <div>Just now</div>
            </CommentMetadata>
            <CommentText>{comments}</CommentText>
            <CommentActions>
              <CommentAction>Reply</CommentAction>
            </CommentActions>
          </CommentContent>
        </Comment>
        <Comment>
          <CommentAvatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
          <CommentContent>
            <CommentAuthor as='a'>Dominik Damian</CommentAuthor>
            <CommentMetadata>
              <div>Just now</div>
            </CommentMetadata>
            <CommentText>Jeszcze nie działa</CommentText>
            <CommentActions>
              <CommentAction>Reply</CommentAction>
            </CommentActions>
          </CommentContent>
        </Comment>
      </CommentGroup>
    </Comment>
  )
}

export default SiteComments