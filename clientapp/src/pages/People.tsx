import { Card, Divider, Layout, List, message, Row } from 'antd'
import {MessageOutlined, ContainerOutlined} from '@ant-design/icons'
import React,{FC, useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { CommentsActionCreators } from '../store/reduce/comments/action-creators'
import { PostsActionCreators } from '../store/reduce/posts/action-creators'
import { UsersActionCreators } from '../store/reduce/users/action-creators'
import { IRegUser } from '../models/IRegUser'
import { convertDate } from '../utils/convertDate'

const People: FC = () => {
  const navigate = useNavigate()
  const { error, isLoading, users, page, enough } = useTypedSelector(state => state.users)
  const { loadUsers, setError } = useActions(UsersActionCreators)
  useEffect(() => {
    loadUsers(-1, 5)
  }, [])
  if(error){
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
      <Row justify='center' align='middle'>
        <InfiniteScroll
          dataLength={users.length}
          next={() => {
            loadUsers(page, 5, users)
          }}
          hasMore={enough}
          loader={<Card style={{ width: 300, marginBottom: 16 }} loading={true} />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            loading={isLoading}
            dataSource={users}
            renderItem={item => (
              <Row justify='center' align='middle'>
                <List.Item key={item.id}>
                  <Card
                    hoverable
                    onClick={() => { navigate(`/people/${item.id}`) }}
                    title={<a>{item.firstName}</a>}
                    style={{ width: 300, marginRight: 15, marginLeft: 15 }}>
                    <p>{item.firstName}</p>
                    <p>{item.lastName}</p>
                    <p>{convertDate(item.birthDate)}</p>
                    <Divider plain style={{ marginBottom: 5 }} />
                    <MessageOutlined style={{ marginRight: 5 }} />
                    {item.commentIds.length}
                    <ContainerOutlined style={{ marginRight: 5 , marginLeft:10}}/>
                    {item.postIds.length}
                  </Card>
                </List.Item>
              </Row>
            )}
          />
        </InfiniteScroll>
      </Row>
    </Layout>
  )
}

export default People