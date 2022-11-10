import { Card, Divider } from "antd"
import { MessageOutlined } from '@ant-design/icons'
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { IPost } from "../models/IPost"
import { convertDateWithTime } from "../utils/convertDate"
import { findUser } from "../utils/findUser"


interface PostCardProps {
  post: IPost
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const navigate = useNavigate()
  const { users } = useTypedSelector(t => t.users)
  const sliceContent = (content: string) => {
    if (content.length > 1000) {
      return content.slice(0, 1000) + "..."
    }
    else {
      return content
    }
  }
  return (
    <Card
      hoverable
      title={post.title}
      style={{ width: 600, marginRight: 15, marginLeft: 15 }}
      onClick={() => { navigate(`/posts/${post.id}`) }}
      extra={
        findUser(post.personId, users)
      }
    >
      <p>
        {
          sliceContent(post.content)
        }
      </p>
      <Divider plain style={{ marginBottom: 5 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <MessageOutlined style={{ marginRight: 5 }} />
          {post.commentIds.length}
        </div>
        <div>
          Posted: <>
            {
              convertDateWithTime(post.dateCreated)
            }
          </>
        </div>
      </div>
    </Card>
  )
}

export default PostCard