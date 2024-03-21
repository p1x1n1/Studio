import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor () {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    get IsAuth() {
        return this._isAuth
    }
    get User() {
        return this._user
    }
}