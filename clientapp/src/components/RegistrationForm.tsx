import { Button, Input, message, Form, DatePicker } from "antd"
import { FC, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { UserActionCreators } from '../store/reduce/user/action-creators'
import { rules } from '../utils/rules'
import { IUser } from "../models/IUser"
import moment from "moment"
import { AuthActionCreators } from "../store/reduce/auth/action-creators"
import { IRegUser } from "../models/IRegUser"
import { convertDate } from "../utils/convertDate"

interface PersonFormProps {
    user?: IUser
}

const RegistrationForm: FC<PersonFormProps> = ({ user }) => {
    const navigate = useNavigate()
    const { isLoading, error } = useTypedSelector(t => t.user)
    const { addUser, updateUser, setError } = useActions(UserActionCreators)
    const { login } = useActions(AuthActionCreators)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState(user ? user.firstName : '')
    const [lastName, setLastName] = useState(user ? user.lastName : '')
    const [birthDate, setBirthDate] = useState(user ? user.birthDate : new Date())
    const submit = async () => {
        if (user) {
            user.birthDate=birthDate
            user.firstName=firstName
            user.lastName=lastName
            await updateUser(user, user.id)
        }
        else {
            await addUser({ login: username, password, firstName, lastName, birthDate } as IUser)
            await login(username, password)
        }
        navigate(0)
    }
    if (error) {
        message.error(error)
        setError('')
    }
    return (
        <>
            {
                user
                    ?
                    <Form
                        id="personForm"
                        onFinish={submit}
                        initialValues={{ firstName: user.firstName, lastName: user.lastName, birthDate: moment(user.birthDate) }}
                    >
                        <Form.Item
                            label="FirstName"
                            name="firstName"
                            rules={[rules.required('Please input your firstname!')]}
                        >
                            <Input
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="LastName"
                            name="lastName"
                            rules={[rules.required('Please input your lastname!')]}
                        >
                            <Input
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="BirthDate"
                            name="birthDate"
                            rules={[rules.required('Please input your birthdate!')]}
                        >
                            <DatePicker
                                onChange={e => setBirthDate(new Date(e!.calendar()))}
                            />
                        </Form.Item>
                    </Form>
                    :
                    <Form
                        onFinish={submit}
                    >
                        <Form.Item
                            label="Login"
                            name="login"
                            rules={[rules.required('Please input your login!')]}
                        >
                            <Input
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </Form.Item><Form.Item
                            label="Password"
                            name="password"
                            rules={[rules.required('Please input your password!')]}
                        >
                            <Input.Password
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="FirstName"
                            name="firstName"
                            rules={[rules.required('Please input your firstname!')]}
                        >
                            <Input
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="LastName"
                            name="lastName"
                            rules={[rules.required('Please input your lastname!')]}
                        >
                            <Input
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="BirthDate"
                            name="birthDate"
                            rules={[rules.required('Please input your birthdate!')]}
                        >
                            <DatePicker
                                onChange={e => setBirthDate(new Date(e!.calendar()))}
                            />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" loading={isLoading}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
            }
        </>
    )
}

export default RegistrationForm