require('dotenv').config()
const express = require('express')
const sequelize=require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const fileUpload=require('express-fileupload')
const errorHandler = require('./middleware/ErrorHandingMiddleWare')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
//раздача статики
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

// Обработка ошибок, последний Middleware
app.use(errorHandler)


//middleware регистрируется в самом конце!!!!!! так как зымкающий пока нет некст
app.use(errorHandler)
/*app.get('/',(req,res)=>{res.status(200).json({message:"WARNING"})})
*/
const start = async() =>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,() => console.log(`Server started on port ${PORT}`))
    }
    catch(elem){
        console.log(elem)

    }
}
start()


