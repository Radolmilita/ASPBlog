import { Button, Card, Divider, Empty, Layout, List, message, Modal, Row } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { PostActionCreators } from '../store/reduce/post/action-creators'
import { UsersActionCreators } from '../store/reduce/users/action-creators'
import CommentForm from '../components/CommentForm'
import { convertDateWithTime } from '../utils/convertDate'
import CommentList, { CommentListEnum } from '../components/CommentList'
import PostService from '../api/PostService'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import PostForm from '../components/PostForm'

const Post: FC = () => {
  const navigate = useNavigate()
  const param = useParams()
  const { isAuth } = useTypedSelector(state => state.auth)
  const { post, isLoading, error } = useTypedSelector(t => t.post)
  const { users } = useTypedSelector(t => t.users)
  const { loadPost, setError } = useActions(PostActionCreators)
  const { loadUsers } = useActions(UsersActionCreators)
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    loadPost(param.id)
    loadUsers()
  }, [])
  const findUser = (id: number) => {
    const user = users.find(t => t.id === id)
    return user?.firstName
  }
  if (error) {
    message.error(error)
    setError('')
  }
  return (
    <Layout
      id='scrollableDiv'
      style={{
        height: 'calc(100vh - 64px)',
        overflow: 'auto'
      }}
    >
      <Row justify='center' style={{ marginTop: 50 }}>
        <Card
          hoverable
          title={post.title}
          style={{ width: 900 }}
          loading={isLoading}
          extra={
            <a onClick={() => { navigate(`/people/${post.personId}`) }}>
              {findUser(post.personId)}
            </a>
          }>
          <p>
            {post.content}
          </p>
          <Divider plain style={{ marginBottom: 15 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <>
              {
                post.personId == parseInt(localStorage.getItem('id')!) &&
                <>
                  <Button
                    type="primary"
                    shape="circle"
                    onClick={() => {
                      PostService.deletePost(post.id)
                      navigate(-1)
                    }}
                    icon={<DeleteOutlined />}
                  />
                  <Button
                    type="primary"
                    shape="circle"
                    onClick={() => setIsModalOpen(true)}
                    icon={<EditOutlined />}
                  />
                  <Modal
                    width={900}
                    title="Post Form"
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={[
                      <Button type="primary" htmlType="submit" form="postForm" key="submit">
                        Submit
                      </Button>
                    ]}
                  >
                    <PostForm personId={parseInt(localStorage.getItem('id')!)} post={post} />
                  </Modal>
                </>
              }
            </>
            Posted: <>
              {
                convertDateWithTime(post.dateCreated)
              }
            </>
          </div>
        </Card>
        {isAuth &&
          <>
            <Divider plain>
              Write a comment
            </Divider>
            <CommentForm
              postId={parseInt(param.id!)}
              personId={parseInt(localStorage.getItem('id')!)}
            />
          </>
        }
        <Divider plain>Comments</Divider>
        {post.id && post.commentIds.length != 0 ? <CommentList type={CommentListEnum.BY_POST} /> : <Empty />}
      </Row>
    </Layout>
  )
}

export default Post