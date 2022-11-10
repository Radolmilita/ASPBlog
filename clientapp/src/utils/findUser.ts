import { IRegUser } from "../models/IRegUser"

export const findUser = (id: number, users: IRegUser[]) => {
    const user = users.find(t => t.id === id)
    return user?.firstName
}