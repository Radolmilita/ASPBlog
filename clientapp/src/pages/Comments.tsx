import { Layout, message, Row } from "antd"
import { FC, useEffect } from "react"
import { useParams } from "react-router-dom"
import CommentList, { CommentListEnum } from "../components/CommentList"
import { useActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { UserActionCreators } from "../store/reduce/user/action-creators"


const Comments: FC = () => {
    const { error, user } = useTypedSelector(t => t.user)
    const { loadUser, setError } = useActions(UserActionCreators)
    const param = useParams()
    useEffect(() => {
        loadUser(param.id)
    }, [])
    if (error) {
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
            <Row justify='center'>
                {user.id && <CommentList type={CommentListEnum.BY_PERSON} />}
            </Row>
        </Layout>
    )
}

export default Comments