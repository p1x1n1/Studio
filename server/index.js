require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const router = require('./routes/index')
const authRoutes=require('./routes/auth.routes')
const fileUpload = require('express-fileupload')
const errorHandler = require('./middleware/ErrorHandingMiddleWare')
const path = require('path')
const initData = require('./initData.js');
const initFunctionAndTriggers = require('./InitTriggerAndFunction.js');
const apicache = require('apicache');//кэширование запросов

const PORT = process.env.PORT 

const app = express()
app.use(cors())
app.use(express.json())
//раздача статики
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api',[ router,authRoutes])

// Обработка ошибок, последний Middleware
app.use(errorHandler)


const start = async() =>{
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        initData;
        initFunctionAndTriggers;  // Инициализация триггеров и функций базы данных
        app.listen(PORT,() => console.log(`Server started on port ${PORT}`));
    }
    catch(elem){
        console.log(elem)
    }
}
start()


