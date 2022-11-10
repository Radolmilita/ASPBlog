import { Layout, Row, Menu } from 'antd'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { RouteNames } from '../router'
import { AuthActionCreators } from '../store/reduce/auth/action-creators'

const Navbar: FC = () => {
    const navigate = useNavigate()
    const { isAuth, user } = useTypedSelector(state => state.auth)
    const { logout } = useActions(AuthActionCreators)
    const publicMenuItems = [
        {
            key: 1,
            onClick: () => navigate(RouteNames.HOME),
            label: "Home"
        },
        {
            key: 2,
            onClick: () => navigate(RouteNames.POSTS),
            label: "Posts"
        },
        {
            key: 3,
            onClick: () => navigate(RouteNames.PEOPLE),
            label: "People"
        },
        {
            key: 4,
            onClick: () => navigate(RouteNames.LOGIN),
            label: "Login"
        },
        {
            key: 5,
            onClick: () => navigate(RouteNames.REGISTRATION),
            label: "Registration"
        },
    ]
    const privateMenuItems = [
        {
            key: 1,
            label: user.login,
            children: [
                {
                    label: 'Profile',
                    key: 2,
                    onClick: () => navigate(`/people/${localStorage.getItem('id')}`)
                },
                {
                    label: 'Logout',
                    key: 3,
                    onClick: () => logout()
                }
            ],
        },
        {
            key: 4,
            onClick: () => navigate(RouteNames.HOME),
            label: "Home"
        },
        {
            key: 5,
            onClick: () => navigate(RouteNames.POSTS),
            label: "Posts"
        },
        {
            key: 6,
            onClick: () => navigate(RouteNames.PEOPLE),
            label: "People"
        },
    ]
    return (
        <Layout.Header>
            <Row justify="end">
                {
                    isAuth
                        ?
                        <Menu theme="dark" mode='horizontal' selectable={false} items={privateMenuItems} />
                        :
                        <Menu theme="dark" mode="horizontal" selectable={false} items={publicMenuItems} />
                }

            </Row>
        </Layout.Header>
    )
}

export default Navbar