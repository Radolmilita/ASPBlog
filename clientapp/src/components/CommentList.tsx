import { Card, Divider, List, message } from "antd"
import { FC, useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useNavigate } from "react-router-dom"
import { useActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { IPost } from "../models/IPost"
import { IRegUser } from "../models/IRegUser"
import { CommentsActionCreators } from "../store/reduce/comments/action-creators"
import { convertDateWithTime } from "../utils/convertDate"
import CommentCard from "./CommentCard"

export enum CommentListEnum {
    BY_POST = 'POST',
    BY_PERSON = 'PERSON'
}
interface CommentListProps {
    type: CommentListEnum
}
const CommentList: FC<CommentListProps> = ({ type }) => {
    const { error, isLoading, comments, page, enough } = useTypedSelector(state => state.comments)
    const { post } = useTypedSelector(state => state.post)
    const { user } = useTypedSelector(t => t.user)
    const { loadCommentsByPostId, loadCommentsByPersonId, setError } = useActions(CommentsActionCreators)
    useEffect(() => {
        switch (type) {
            case CommentListEnum.BY_POST:
                loadCommentsByPostId(post.id, 0, 5, [])
                break
            case CommentListEnum.BY_PERSON:
                loadCommentsByPersonId(user.id, -1, 5, [])
                break
        }
    }, [])
    const loadMore = () => {
        switch (type) {
            case CommentListEnum.BY_POST:
                loadCommentsByPostId(post.id, page, 5, comments)
                break
            case CommentListEnum.BY_PERSON:
                loadCommentsByPersonId(user.id, page, 5, comments)
                break
        }
    }
    if (error) {
        message.error(error)
        setError('')
    }
    return (
        <InfiniteScroll
            dataLength={comments.length}
            next={() => {
                loadMore()
            }}
            hasMore={enough}
            loader={<Card style={{ width: 600, marginBottom: 15, marginTop: 15 }} loading={true} />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
        >
            <List
                loading={isLoading}
                dataSource={comments}
                renderItem={item => (
                    <List.Item key={item.id}>
                        <CommentCard comment={item}/>
                    </List.Item>
                )}
            />
        </InfiniteScroll>
    )
}

export default CommentList