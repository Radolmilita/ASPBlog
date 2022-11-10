import { Button, Checkbox, Form, Input, message } from 'antd'
import React, { FC, useState } from 'react'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { AuthActionCreators } from '../store/reduce/auth/action-creators'
import { rules } from '../utils/rules'

const LoginForm: FC = () => {
  const { error, isLoading } = useTypedSelector(state => state.auth)
  const [username, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const { login, setError } = useActions(AuthActionCreators)
  const submit = () => {
    login(username, password)
  }
  if(error){
    message.error(error)
    setError('')
  }
  return (
    <Form
      onFinish={submit}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[rules.required('Please input your username!')]}
      >
        <Input
          value={username}
          onChange={e => setLogin(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[rules.required('Please input your password!')]}
      >
        <Input.Password
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm