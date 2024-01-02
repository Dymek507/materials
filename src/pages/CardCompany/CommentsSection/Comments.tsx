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

type SingleCommentProps = {
  login: string;
  content: string;
}

const SingleCommment = ({ login, content }: SingleCommentProps) => {
  return (
    <Comment>
      <CommentAvatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
      <CommentContent>
        <CommentAuthor as='a'>{login}</CommentAuthor>
        <CommentMetadata>
          <div>Today at 5:42PM</div>
        </CommentMetadata>
        <CommentText>{content}</CommentText>
        <CommentActions>
          <CommentAction>Edit</CommentAction>
        </CommentActions>
      </CommentContent>
    </Comment>
  )
}

export default SingleCommment