import {Layout,Row } from 'antd'
import React, { FC, useEffect } from 'react'
import { useActions } from '../hooks/useActions'
import { UsersActionCreators } from '../store/reduce/users/action-creators'
import PostList from '../components/PostList'

const Posts: FC = () => {
  const { loadUsers } = useActions(UsersActionCreators)
  useEffect(() => {
    loadUsers()
  }, [])
  return (
    <Layout
      id='scrollableDiv'
      style={{
        height: 'calc(100vh - 64px)',
        overflow: 'auto'
      }}
    >
      <Row justify='center'>
        <PostList />
      </Row>
    </Layout>
  )
}

export default Posts