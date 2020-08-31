import { createCrudObservable, createEntityListObservable } from "../factory"
import UsersCrudAPI from "../../../api/users"

const UserObservable = createCrudObservable(UsersCrudAPI, "user_id")

export class User extends UserObservable {}

const UserListObservable = createEntityListObservable(User, "user_id")

export default class UserState extends UserListObservable {}
