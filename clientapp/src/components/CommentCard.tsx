import { Button, Card, Divider, Form, Modal, Row } from "antd";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IComment } from "../models/IComment";
import { convertDateWithTime } from "../utils/convertDate";
import { findUser } from "../utils/findUser";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import CommentService from "../api/CommentService";
import CommentForm from "./CommentForm";

interface CommentCardProps {
    comment: IComment
}

const CommentCard: FC<CommentCardProps> = ({ comment }) => {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { users } = useTypedSelector(t => t.users)
    const { user } = useTypedSelector(t => t.user)
    return (
        <Card
            hoverable
            title={<>Posted: {convertDateWithTime(comment.dateCreated)}</>}
            style={{ width: 600 }}
            extra={
                user.id === comment.personId
                    ?
                    <a onClick={() => { navigate(`/people/${user.id}`) }}>
                        {user.firstName}
                    </a>
                    :
                    <a onClick={() => { navigate(`/people/${comment.personId}`) }}>
                        {findUser(comment.personId, users)}
                    </a>
            }
        >
            <p>{comment.content}</p>
            {parseInt(localStorage.getItem("id")!) == comment.personId
                && <>
                    <Divider plain style={{ marginBottom: 15 }} />
                    <Row justify='space-evenly'>
                        <Button
                            type="primary"
                            shape="circle"
                            onClick={() => {
                                CommentService.deleteComment(comment.postId, comment.id)
                                navigate(0)
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
                        width={900}
                        title="Comment Form"
                        open={isModalOpen}
                        onCancel={() => setIsModalOpen(false)}
                        footer={[
                            <Button type="primary" htmlType="submit" form="commentForm" key="submit">
                                Submit
                            </Button>
                        ]}
                    >
                        <CommentForm postId={comment.postId} personId={comment.personId} comment={comment} />
                    </Modal>
                </>
            }
        </Card>
    )
}

export default CommentCard