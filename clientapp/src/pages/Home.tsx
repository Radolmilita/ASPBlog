import { Button, Card, Layout, Row } from 'antd'
import Title from 'antd/lib/typography/Title'
import React,{FC} from 'react'

const Home: FC = () => {
  return (
    <Layout>
      <Button
          style={{
            position:'fixed',
            right:'50',
            bottom: '50'
          }}
        />
      <Row justify='center' align='middle' className='h100'>
        <Card style={{ textAlign: 'center' }}>
          <Title>Welcome To My Project</Title>
          <Title level={3}>I Hope You Enjoy</Title>
        </Card>
        
      </Row>
    </Layout>
  )
}

export default Home