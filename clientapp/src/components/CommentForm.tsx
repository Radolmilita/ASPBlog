import { Button, Form, FormInstance, Input, message } from "antd"
import TextArea from "antd/lib/input/TextArea"
import { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { IComment } from "../models/IComment"
import { CommentActionCreators } from "../store/reduce/comment/action-creators"
import { CommentsActionCreators } from "../store/reduce/comments/action-creators"
import { rules } from "../utils/rules"
import { CommentListEnum } from "./CommentList"

interface CommentFormProps {
    comment?: IComment
    postId: number
    personId: number
}

const CommentForm: FC<CommentFormProps> = ({ postId, personId, comment }) => {
    const navigate = useNavigate()
    const { error, isLoading } = useTypedSelector(state => state.comment)
    const [content, setContent] = useState('')
    const { addComment, updateComment, setError } = useActions(CommentActionCreators)
    const submit = () => {
        console.log("hi")
        if (comment) {
            comment.content=content
            updateComment(comment, postId, comment.id)
        }
        else {
            const dateCreated = new Date(Date.now())
            addComment({ content, dateCreated: dateCreated, postId, personId } as IComment, postId)
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
                comment
                    ?
                    <Form
                        id="commentForm"
                        onFinish={submit}
                        style={{ width: 800 }}
                        initialValues={{ content: comment?.content }}
                    >
                        <Form.Item
                            label="Content"
                            name="content"
                            rules={[rules.required('Please input content!')]}
                        >
                            <TextArea
                                rows={4}
                                value={content}
                                onChange={e => setContent(e.target.value)}
                            />
                        </Form.Item>
                        {!comment &&
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit" loading={isLoading}>
                                    Submit
                                </Button>
                            </Form.Item>}
                    </Form>
                    :
                    <Form
                        onFinish={submit}
                        style={{ width: 800 }}
                    >
                        <Form.Item
                            label="Content"
                            name="content"
                            rules={[rules.required('Please input content!')]}
                        >
                            <TextArea
                                rows={4}
                                value={content}
                                onChange={e => setContent(e.target.value)}
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

export default CommentForm