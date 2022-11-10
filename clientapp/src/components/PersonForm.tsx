import { Button, Card, Divider, message, Modal, Row } from "antd"
import { FC, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { UserActionCreators } from "../store/reduce/user/action-creators"
import { convertDate } from "../utils/convertDate"
import { useActions } from '../hooks/useActions'
import RegUserService from "../api/RegUserService"
import { AuthActionCreators } from "../store/reduce/auth/action-creators"
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import RegistrationForm from "./RegistrationForm"

const PersonForm: FC = () => {
    const navigate = useNavigate()
    const { error, isLoading, user, authUser } = useTypedSelector(state => state.user)
    const { loadAuthUser, loadUser, setError } = useActions(UserActionCreators)
    const { logout } = useActions(AuthActionCreators)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const param = useParams()
    useEffect(() => {
        if (param.id == localStorage.getItem('id')) {
            loadAuthUser(param.id)
        }
        loadUser(param.id)
    }, [])
    if (error) {
        message.error(error)
        setError('')
    }
    return (
        <>
            {
                param.id == localStorage.getItem('id')
                    ?
                    <Card hoverable title={<>Person Form</>} style={{ width: 400 }} loading={isLoading}>
                        <p>Login: {authUser.login}</p>
                        <p>Password: {authUser.password}</p>
                        <p>Firstname: {user.firstName}</p>
                        <p>Lastname: {user.lastName}</p>
                        <p>Birthdate: {<>{convertDate(user.birthDate)}</>}</p>
                        <p><a onClick={() => { navigate(`/people/${user.id}/comments`) }}>Commenth: {user.commentIds?.length}</a></p>
                        <p><a>Posts: {user.postIds?.length}</a></p>
                        <Divider plain style={{ marginBottom: 15 }} />
                        <Row justify='space-evenly'>
                            <Button
                                type="primary"
                                shape="circle"
                                onClick={() => {
                                    RegUserService.deleteUser(user.id)
                                    logout()
                                    navigate('/')
                                }}
                                icon={<DeleteOutlined />}
                            />
                            <Button
                                type="primary"
                                shape="circle"
                                onClick={() => setIsModalOpen(true)}
                                icon={<EditOutlined />}
                            />
                        </Row>
                        <Modal
                            title="Person Form"
                            open={isModalOpen}
                            onCancel={() => setIsModalOpen(false)}
                            footer={[
                                <Button type="primary" htmlType="submit" form="personForm" key="submit">
                                    Submit
                                </Button>
                            ]}
                        >
                            <RegistrationForm user={authUser} />
                        </Modal>
                    </Card>
                    :
                    <Card hoverable title={<>Person Form</>} style={{ width: 400 }} loading={isLoading}>
                        <p>Firstname: {user.firstName}</p>
                        <p>Lastname: {user.lastName}</p>
                        <p>Birthdate: {<>{convertDate(user.birthDate)}</>}</p>
                        <p><a onClick={() => { navigate(`/people/${user.id}/comments`) }}>Commenth: {user.commentIds?.length}</a></p>
                        <p><a>Posts: {user.postIds?.length}</a></p>
                    </Card>
            }
        </>
    )
}

export default PersonForm