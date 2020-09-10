import { Observable } from "../store"
import { createCrudObservable, createEntityListObservable } from "../utils/api"
import UsersCrudAPI from "../../../api/users"

const UserObservable = createCrudObservable(UsersCrudAPI, "user_id")

export class User extends UserObservable {}

const UserListObservable = createEntityListObservable(User, "user_id")

export class UserList extends UserListObservable {}
