const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    login: {type:DataTypes.STRING,primaryKey:true},
    email: {type: DataTypes.STRING,unique:true},
    password: {type:DataTypes.STRING},
    Name: {type: DataTypes.STRING},
    LastName: {type: DataTypes.STRING},
    SurName: {type: DataTypes.STRING},
    phone:{type:DataTypes.STRING},
    order_sum:{type:DataTypes.INTEGER},//,defaultValue:0
    //id_discount:{type:DataTypes.INTEGER},
    role: {type:DataTypes.STRING,defaultValue:"USER"},
}
)
const Florist = sequelize.define('florist',{
    login: {type:DataTypes.STRING,primaryKey:true},
    email: {type: DataTypes.STRING,unique:true},
    password: {type:DataTypes.STRING},
    Name: {type: DataTypes.STRING},
    LastName: {type: DataTypes.STRING},
    SurName: {type: DataTypes.STRING},
    phone:{type:DataTypes.STRING},
    role: {type:DataTypes.STRING,defaultValue:"Florist"},
}
)
const Courier = sequelize.define('courier',{
    login: {type:DataTypes.STRING,primaryKey:true},
    email: {type: DataTypes.STRING,unique:true},
    password: {type:DataTypes.STRING},
    Name: {type: DataTypes.STRING},
    LastName: {type: DataTypes.STRING},
    SurName: {type: DataTypes.STRING},
    phone:{type:DataTypes.STRING},
    role: {type:DataTypes.STRING,defaultValue:"courier"},
}
)
const Discount = sequelize.define('discount',{
    id: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    sum:{type: DataTypes.INTEGER,unique:true},
    procent: {type: DataTypes.INTEGER,unique:true},
}
)
const Street = sequelize.define('stree',{
    id: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name: {type: DataTypes.STRING,unique:true},
}
)
const StatusOrder = sequelize.define('status_order',{
    id_status_order: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title: {type: DataTypes.STRING,unique:true},
}
)
const Order = sequelize.define('order',{
    number: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    //id_status_order: {type: DataTypes.INTEGER},
   // id_street: {type: DataTypes.INTEGER},
    house_number: {type: DataTypes.STRING},
    adress_commnet: {type:DataTypes.TEXT},
    //id_status_order: {type: DataTypes.INTEGER},
    comment:{type: DataTypes.TEXT},
    price_delivery:{type:DataTypes.INTEGER},
   // id_courier: {type: DataTypes.INTEGER},
    //id_florist: {type: DataTypes.INTEGER},
    //id_user: {type: DataTypes.INTEGER},
}
)
const Category = sequelize.define('category',{
    id_category: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title: {type: DataTypes.STRING,unique:true},
}
)
const WrapperCategory = sequelize.define('wrapper_category',{
    id_wrapper_category: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title: {type: DataTypes.STRING,unique:true},
}
)
const Wrapper = sequelize.define('wrapper',{
    id_wrapper: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    //id_wrapper_category:{type:DataTypes.INTEGER},
    title: {type: DataTypes.STRING,unique:true},
    img: {type: DataTypes.STRING, allowNull: false},
}
)
const Bouquet = sequelize.define('bouquet',{
    id_bouquet: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name: {type: DataTypes.STRING,unique:true},
    ready_made:{type:DataTypes.BOOLEAN},
    price:{type:DataTypes.STRING},
   // id_category:{type:DataTypes.INTEGER},
    // id_wrapper:{type:DataTypes.INTEGER},
    postcard:{type:DataTypes.BOOLEAN},
    postcard_comment: {type: DataTypes.TEXT},
    img: {type: DataTypes.STRING, allowNull: false},
})
const CompositionOrder = sequelize.define('composition_order',{
    //number: {type:DataTypes.INTEGER,primaryKey:true},
    //id_bouquet: {type:DataTypes.INTEGER,primaryKey:true},
    count: {type: DataTypes.INTEGER},
}
)
const Flower = sequelize.define('flower',{
    id_flower: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name: {type: DataTypes.STRING,unique:true},
    count: {type:DataTypes.INTEGER},
    price: {type:DataTypes.INTEGER},
    img: {type: DataTypes.STRING, allowNull: false},
}
)
const CompositionBouqet = sequelize.define('composition_bouquet',{
    //id_flower: {type:DataTypes.INTEGER,primaryKey:true},
    //id_bouquet: {type:DataTypes.INTEGER,primaryKey:true},
    count: {type: DataTypes.INTEGER},
}
)
//USER
Discount.hasMany(User)
User.belongsTo(Discount)
//ORDER
User.hasMany(Order)
Order.belongsTo(User)
Florist.hasMany(Order)
Order.belongsTo(Florist)
Courier.hasMany(Order)
Order.belongsTo(Courier)
StatusOrder.hasMany(Order)
Order.belongsTo(StatusOrder)
Street.hasMany(Order)
Order.belongsTo(Street)
//Wrapper
WrapperCategory.hasMany(Wrapper)
Wrapper.belongsTo(WrapperCategory)
//Boquet
Category.hasMany(Bouquet)
Wrapper.hasMany(Bouquet)
Bouquet.belongsTo(Category)
Bouquet.belongsTo(Wrapper)
//Composition
Flower.belongsToMany(Bouquet,{through: CompositionBouqet})//info -52 min,{as:'info'}
Bouquet.belongsToMany(Flower,{through: CompositionBouqet})

Order.belongsToMany(Bouquet,{through: CompositionOrder})
Bouquet.belongsToMany(Order,{through: CompositionOrder})


module.exports={
    User,
    Florist,
    Courier,
    Discount,
    Street,
    StatusOrder,
    Order,
    Category,
    WrapperCategory,
    Wrapper,
    Bouquet,
    CompositionOrder,
    Flower,
    CompositionBouqet,

}