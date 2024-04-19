import {makeAutoObservable} from "mobx";
import { ApiService } from "../http/api.service";
//1.23.40
const apiService = new ApiService()
export default class BouquetStore {
    constructor () {
        
       /*this._categories = [
        {id:1, name: 'Монобукеты'},
        {id:2, name: 'Монобукеты'},
        {id:3, name: 'Монобукеты'},]
        /*this._wrapper = [
            {id:1, name: 'Бумага'},
            {id:2, name: 'Креп'},
            {id:3, name: 'Фольга'},]*/
        apiService.get('/flower').then(res => {
            this._flowers=res;
        })
        apiService.get('/wrapper').then(res => {
            this._wrappers=res;
        })
        apiService.get('/bouquet').then(res => {
            this._bouquets=res;
        })
        /*this._categories = []
        this._wrappers=[]
        this._flowers=[
            {id_flower:1, name: 'Роза',img:"../base_img/rose.png"},
            {id_flower:2, name: 'Орхидея',img:"../base_img/orchid.png"},
            {id_flower:3, name: 'Жасмин',img:"../base_img/jasmine.png"},
        ]*/
        /*
        this._boquets = [
            {id_bouquet:1, name: 'Букет1',ready_made:true,price:1500,img:'https://cvetaevatomsk.ru/uploads/goods/2021-11/1636032945_img_5057.jpg'},
            {id_bouquet:2, name: 'Букет1',ready_made:true,price:1500,img:'https://cvetaevatomsk.ru/uploads/goods/2021-11/1636032945_img_5057.jpg'},
            {id_bouquet:3, name: 'Букет1',ready_made:true,price:1500,img:'https://cvetaevatomsk.ru/uploads/goods/2021-11/1636032945_img_5057.jpg'},
            {id_bouquet:3, name: 'Букет1',ready_made:true,price:1500,img:'https://cvetaevatomsk.ru/uploads/goods/2021-11/1636032945_img_5057.jpg'},
            {id_bouquet:3, name: 'Букет1',ready_made:true,price:1500,img:'https://cvetaevatomsk.ru/uploads/goods/2021-11/1636032945_img_5057.jpg'},
            {id_bouquet:3, name: 'Букет1',ready_made:true,price:1500,img:'https://cvetaevatomsk.ru/uploads/goods/2021-11/1636032945_img_5057.jpg'},
            {id_bouquet:3, name: 'Букет1',ready_made:true,price:1500,img:'https://cvetaevatomsk.ru/uploads/goods/2021-11/1636032945_img_5057.jpg'},
        ]*/
        this._selected_categories = {}
        makeAutoObservable(this)
    }

    setCategories(categories) {
        this._categories = categories
    }
    setFlower(flower) {
        this._flowers = flower
    }
    setBoquet(boquet) {
        this._bouquets = boquet
    }
    setSelected_categories(selected_type) {
        this._selected_categories = selected_type
    }
    get boquets() {
        return this._bouquets
    }
    get flowers() {
        return this._flowers
    }
    get categories() {
        return this._categories
    }
    get selected_categories() {
        return this._selected_categories
    }
}