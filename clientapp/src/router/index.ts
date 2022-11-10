import Comments from "../pages/Comments"
import Home from "../pages/Home"
import Login from "../pages/Login"
import People from "../pages/People"
import Person from "../pages/Person"
import Post from "../pages/Post"
import Posts from "../pages/Posts"
import Registration from "../pages/Registration"

export interface IRoute {
    path: string
    element: React.ComponentType
}

export enum RouteNames {
    LOGIN = "login",
    HOME = "",
    POST = "posts/:id",
    POSTS = "posts",
    PERSON = "people/:id",
    PEOPLE = "people",
    REGISTRATION = "registration",
    UPDATE_PERSON = "update/person/:id",
    COMMENTS = "people/:id/comments"
}

export const publicRoutes: IRoute[] = [
    { path: RouteNames.PERSON, element: Person },
    { path: RouteNames.HOME, element: Home },
    { path: RouteNames.POST, element: Post },
    { path: RouteNames.POSTS, element: Posts },
    { path: RouteNames.PEOPLE, element: People },
    { path: RouteNames.LOGIN, element: Login },
    { path: RouteNames.REGISTRATION, element: Registration },
    { path: RouteNames.COMMENTS, element: Comments },
]

export const privateRoutes: IRoute[] = [
    { path: RouteNames.PERSON, element: Person },
    { path: RouteNames.PEOPLE, element: People },
    { path: RouteNames.HOME, element: Home },
    { path: RouteNames.POST, element: Post },
    { path: RouteNames.POSTS, element: Posts },
    { path: RouteNames.UPDATE_PERSON, element: Registration },
    { path: RouteNames.COMMENTS, element: Comments },
]