import { Card, Layout, Row } from "antd"
import { FC } from "react"
import RegistrationForm from "../components/RegistrationForm"


const Registration: FC = () => {
    return (
      <Layout>
        <Row justify='center' align='middle' className='h100'>
          <Card>
            <RegistrationForm/>
          </Card>
        </Row>
      </Layout>
    )
  }
  
  export default Registration