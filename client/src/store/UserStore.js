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
        console.log("setUser", user)
        this._user = user
        //console.log("setUser", this._user)
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        //console.log("get user", this._user)
        return this._user
    }

}