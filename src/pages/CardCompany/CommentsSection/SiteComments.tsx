import {
  CommentText,
  CommentMetadata,
  CommentGroup,
  CommentContent,
  CommentAvatar,
  CommentActions,
  CommentAction,
  CommentAuthor,
  Comment,
} from 'semantic-ui-react'
import { useEffect, useState } from 'react';

import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { IComment, ICompany } from '../../../types/model';
import { IconButton, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


type SiteCommentsProps = {
  companyId: string
}

const SiteComments = ({ companyId }: SiteCommentsProps) => {

  const [expandMore, setExpandMore] = useState(false)
  const [comments, setComments] = useState<IComment[]>([])
  const [sites, setSites] = useState<string[]>([])

  // real time comments update
  useEffect(() => {
    if (!companyId) return
    const unsub = onSnapshot(doc(db, "companies", companyId), (doc) => {
      const companyData = doc.data() as ICompany
      const commentsData = companyData?.comments as IComment[]
      if (!commentsData) return
      //comments grouped by site
      const commentsSites = commentsData?.map((comment: IComment) => comment.siteName)
      const uniqueSites = [...new Set(commentsSites)]

      setSites(uniqueSites)
      setComments(commentsData)
    });
    return unsub
  }, [companyId])


  return (
    <Comment className='overflow-scroll h-3/4'>
      {sites?.map((site) => (
        <div key={site}>
          <Typography variant='h6' component='h6' className='text-sm font-bold border-b-2 border-black'>
            <IconButton size='small' onClick={() => setExpandMore(prev => !prev)}>
              {expandMore ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </IconButton>
            {site}
          </Typography>
          <CommentGroup collapsed={expandMore}>
            {comments?.filter((comment: IComment) => comment.siteName === site).map((comment: IComment) => (
              <Comment key={comment.id}>
                <CommentAvatar src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
                <CommentContent>
                  <CommentAuthor as='a'>{comment.userLogin}</CommentAuthor>
                  <CommentMetadata>
                    <div>{comment.date}</div>
                  </CommentMetadata>
                  <CommentText>{comment.text}</CommentText>
                  <CommentActions>
                    <CommentAction>Reply</CommentAction>
                  </CommentActions>
                </CommentContent>
              </Comment>
            ))}
          </CommentGroup>
        </div>
      ))}

      {/* <CommentContent>
        <Typography variant='h6' component='h6' className='text-sm font-bold border-b-2 border-black'>
          <IconButton size='small' onClick={() => setExpandMore(prev => !prev)}>
            {expandMore ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
          {site}
        </Typography>
      </CommentContent>
      <CommentGroup collapsed={expandMore}>
        <Comment>
          <CommentAvatar src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
          <CommentContent>
            <CommentAuthor as='a'>{user}</CommentAuthor>
            <CommentMetadata>
              <div>{date}</div>
            </CommentMetadata>
            <CommentText>{text}</CommentText>
            <CommentActions>
              <CommentAction>Reply</CommentAction>
            </CommentActions>
          </CommentContent>
        </Comment>

      </CommentGroup> */}
    </Comment>
  )
}

export default SiteComments