import {
  CommentGroup,
  Header,
} from 'semantic-ui-react'

import SiteComments from './SingleComment'
import CommentInput from './CommentInput/root'

import { ICompany } from '../../../types/model'

type CommentsSectionProps = {
  companyData: ICompany
}

const CommentsSection = ({ companyData }: CommentsSectionProps) => {
  return (
    <CommentGroup className='w-full'>
      <Header as='h3' dividing>
        Komentarze
      </Header>
      <CommentInput companyData={companyData} />
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

