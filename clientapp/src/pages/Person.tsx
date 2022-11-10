import { Card, Layout, message, Row } from 'antd'
import React, { FC } from 'react'
import PersonForm from '../components/PersonForm'

const Person: FC = () => {
  return (
    <Layout>
      <Row justify='center' align='middle' className='h100'>
        <PersonForm />
      </Row>
    </Layout>
  )
}

export default Person