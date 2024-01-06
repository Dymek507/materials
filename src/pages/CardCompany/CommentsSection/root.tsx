import {
  CommentGroup,
  Header,
} from 'semantic-ui-react'

import SiteComments from './SiteComments'
import CommentInput from './CommentInput/root'

import { ICompany } from '../../../types/model'

type CommentsSectionProps = {
  companyData: ICompany
}

const CommentsSection = ({ companyData }: CommentsSectionProps) => {
  return (
    <CommentGroup className='w-full pt-8'>
      <Header as='h3' dividing className=''>
        Komentarze
      </Header>
      <CommentInput companyData={companyData} />
      <SiteComments companyId={companyData?.id} />
    </CommentGroup>
  )
}

export default CommentsSection

