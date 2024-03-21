import {makeAutoObservable} from "mobx";
//1.23.40
export default class FlowerStore {
    constructor () {
        this._flowers=[
            {id_flower:1, name: 'Роза',img:"../base_img/rose.png"},
            {id_flower:2, name: 'Орхидея',img:"../base_img/orchid.png"},
            {id_flower:3, name: 'Жасмин',img:"../base_img/jasmine.png"},
            {id_flower:4, name: 'Ромашка',img:"../base_img/daisies.png"},
        ]
        makeAutoObservable(this)
    }
    get flowers() {
        return this._flowers
    }
};