import { Button, Form, Input, message } from "antd"
import TextArea from "antd/lib/input/TextArea"
import { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { IPost } from "../models/IPost"
import { PostActionCreators } from "../store/reduce/post/action-creators"
import { rules } from "../utils/rules"


interface PostFormProps {
    personId: number,
    post?: IPost
}

const PostForm: FC<PostFormProps> = ({ personId, post }) => {
    const navigate = useNavigate()
    const { error } = useTypedSelector(state => state.post)
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const { addPost, updatePost, setError } = useActions(PostActionCreators)
    const submit = () => {
        if (post) {
            post.title=title
            post.content=content
            updatePost(post, post.id)
        }
        else {
            const dateCreated = new Date(Date.now())
            addPost({ title, content, dateCreated, personId } as IPost)
        }
        navigate(0)
    }
    if (error) {
        message.error(error)
        setError('')
    }
    return (
        <Form
            id="postForm"
            onFinish={submit}
            initialValues={{ content: post?.content, title: post?.title }}
        >
            <Form.Item
                label="Title"
                name="title"
                rules={[rules.required('Please input title!')]}
            >
                <Input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </Form.Item>
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
        </Form>
    )
}

export default PostForm