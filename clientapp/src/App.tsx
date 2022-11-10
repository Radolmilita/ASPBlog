import React, { FC, useEffect, useState } from 'react'
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import { Button, Layout, message, Modal } from 'antd'
import './App.css'
import { useActions } from './hooks/useActions';
import { AuthActionCreators } from './store/reduce/auth/action-creators';
import { FormOutlined } from '@ant-design/icons'
import PostForm from './components/PostForm';
import { useTypedSelector } from './hooks/useTypedSelector';

const App: FC = () => {
  const { isAuth, error } = useTypedSelector(t => t.auth)
  const { auth, setError } = useActions(AuthActionCreators)
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    auth()
  }, [])
  if (error) {
    message.error(error)
    setError('')
}
  return (
    <Layout>
      <Navbar />
      <Layout.Content>
        <AppRouter />
      </Layout.Content>
      {
        isAuth &&
        <>
          <Button
            icon={<FormOutlined />}
            type="primary"
            shape="circle"
            onClick={() => setIsModalOpen(true)}
            style={{
              bottom: '10%',
              right: '10%',
              position: 'fixed'
            }}
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
            <PostForm personId={parseInt(localStorage.getItem('id')!)} />
          </Modal>
        </>
      }
    </Layout>
  )
}

export default App;