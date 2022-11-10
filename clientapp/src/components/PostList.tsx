import { Card, Divider, List, message } from "antd"
import { FC, useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { PostsActionCreators } from "../store/reduce/posts/action-creators"
import PostCard from "./PostCard"


const PostList: FC = () => {
    const { error, isLoading, posts, page, enough } = useTypedSelector(state => state.posts)
    const { loadPosts, setError } = useActions(PostsActionCreators)
    useEffect(() => {
        loadPosts(0, 5, [])
    }, [])
    if (error) {
        message.error(error)
        setError('')
    }
    return (
        <InfiniteScroll
            dataLength={posts.length}
            next={() => {
                loadPosts(page, 5, posts)
            }}
            hasMore={enough}
            loader={<Card style={{ width: 600, marginBottom: 15, marginTop: 15 }} loading={true} />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
        >
            <List
                loading={isLoading}
                dataSource={posts}
                renderItem={item => (
                    <List.Item key={item.id}>
                        <PostCard post={item} />
                    </List.Item>
                )}
            />
        </InfiniteScroll>
    )
}

export default PostList