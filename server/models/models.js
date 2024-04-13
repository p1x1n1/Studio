const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    login: {type:DataTypes.STRING,primaryKey:true},
    email: {type: DataTypes.STRING,unique:true},
    password_: {type:DataTypes.STRING},
    name_: {type: DataTypes.STRING},
    lastname: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    phone:{type:DataTypes.STRING},
    order_sum:{type:DataTypes.INTEGER},//,defaultValue:0
    //id_discount:{type:DataTypes.INTEGER},
    role: {type:DataTypes.STRING,defaultValue:"USER"},
}
)
const Basket = sequelize.define('basket',{
    email: {type:DataTypes.STRING},
    count_:{type:DataTypes.INTEGER},
})
const Selected = sequelize.define('selected',{
    email: {type:DataTypes.STRING},
})
const Employee = sequelize.define('employee',{
    login: {type:DataTypes.STRING,primaryKey:true},
    email: {type: DataTypes.STRING,unique:true},
    password_: {type:DataTypes.STRING},
    name_: {type: DataTypes.STRING},
    lastname: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    phone:{type:DataTypes.STRING},
}
)
const Post = sequelize.define('post', {
    id_: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title: {type: DataTypes.STRING,unique:true},
})

const Discount = sequelize.define('discount',{
    id_: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    sum_:{type: DataTypes.INTEGER,unique:true},
    procent: {type: DataTypes.INTEGER,unique:true},
}
)
const Locality = sequelize.define('locality',{
    id_: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title: {type: DataTypes.STRING,unique:true},
}
)
const Street = sequelize.define('street',{
    id_: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title: {type: DataTypes.STRING,unique:true},
}
)
const StatusOrder = sequelize.define('status_order',{
    id_: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title: {type: DataTypes.STRING,unique:true},
}
)
const TypeOrder = sequelize.define('type_order',{
    id_: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title: {type: DataTypes.STRING,unique:true},
    price:{type:DataTypes.INTEGER},
}
)
const Order = sequelize.define('order',{
    number_: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    //id_status_order: {type: DataTypes.INTEGER},
    // id_locality: {type: DataTypes.INTEGER},
   // id_street: {type: DataTypes.INTEGER},
    house_number: {type: DataTypes.STRING},
    adress_comment: {type:DataTypes.TEXT},
    data_order: {type: DataTypes.DATE},
    time_order: {type: DataTypes.TIME},
    anonymized: {type: DataTypes.BOOLEAN},
    //id_type_order: {type: DataTypes.INTEGER},
    comment_:{type: DataTypes.TEXT},
    price:{type:DataTypes.INTEGER},
    //id_courier: {type: DataTypes.INTEGER},
    //id_florist: {type: DataTypes.INTEGER},
    //id_user: {type: DataTypes.INTEGER},
}
)
const Category = sequelize.define('category',{
    id_: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title: {type: DataTypes.STRING,unique:true},
}
)
const WrapperCategory = sequelize.define('wrapper_category',{
    id_: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title: {type: DataTypes.STRING,unique:true},
}
)
const Wrapper = sequelize.define('wrapper',{
    id_: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    //id_wrapper_category:{type:DataTypes.INTEGER},
    title: {type: DataTypes.STRING,unique:true},
    img: {type: DataTypes.STRING, allowNull: false},
    price: {type:DataTypes.INTEGER},
    count_: {type:DataTypes.INTEGER},
}
)
const Bouquet = sequelize.define('bouquet',{
    arc: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title: {type: DataTypes.STRING,unique:true},
    ready_made:{type:DataTypes.BOOLEAN},
    price:{type:DataTypes.STRING},
    description: {type:DataTypes.TEXT},
    // id_category:{type:DataTypes.INTEGER},
    // id_wrapper:{type:DataTypes.INTEGER},
    img: {type: DataTypes.STRING, allowNull: false},
})
const CompositionOrder = sequelize.define('composition_order',{
    //number_: {type:DataTypes.INTEGER,primaryKey:true},
    //id_bouquet: {type:DataTypes.INTEGER,primaryKey:true},
    count_: {type: DataTypes.INTEGER},
    postcard:{type:DataTypes.BOOLEAN},
    postcard_comment: {type: DataTypes.TEXT},
}
)
const Flower = sequelize.define('flower',{
    id_: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title: {type: DataTypes.STRING,unique:true},
    count_: {type:DataTypes.INTEGER},
    price: {type:DataTypes.INTEGER},
    season_start: {type:DataTypes.DATE},
    season_end: {type:DataTypes.DATE},
    img: {type: DataTypes.STRING, allowNull: false},
}
)
const CompositionBouqet = sequelize.define('composition_bouquet',{
    //id_flower: {type:DataTypes.INTEGER,primaryKey:true},
    //id_bouquet: {type:DataTypes.INTEGER,primaryKey:true},
    count_: {type: DataTypes.INTEGER},
}
)
const BouquetCategory = sequelize.define('bouquet_category',{
})

//USER
Discount.hasMany(User)
User.belongsTo(Discount)
//ORDER
User.hasMany(Order)
Order.belongsTo(User)
Employee.hasMany(Order)
//Order.belongsTo(Employee)
Order.belongsTo(Employee, { as: 'courier', foreignKey: 'courierLogin' });
Order.belongsTo(Employee, { as: 'florist', foreignKey: 'floristLogin' });
//Courier.hasMany(Order)
//Order.belongsTo(Courier)
StatusOrder.hasMany(Order)
Order.belongsTo(StatusOrder)
TypeOrder.hasMany(Order)
Order.belongsTo(TypeOrder)
Locality.hasMany(Order)
Order.belongsTo(Locality)
Street.hasMany(Order)
Order.belongsTo(Street)
//Wrapper
WrapperCategory.hasMany(Wrapper)
Wrapper.belongsTo(WrapperCategory)

//Employee
Post.hasMany(Employee)
Employee.belongsTo(Post)
//Bouquet
//Category.hasMany(Bouquet)
Wrapper.hasMany(Bouquet)
//Bouquet.belongsTo(Category)
Bouquet.belongsTo(Wrapper)
//Composition
Flower.belongsToMany(Bouquet,{through: CompositionBouqet})//info -52 min,{as:'info'}
Bouquet.belongsToMany(Flower,{through: CompositionBouqet})
//Category
Category.belongsToMany(Bouquet,{through:BouquetCategory})
Bouquet.belongsToMany(Category,{through:BouquetCategory})
//order-bouquets
Order.belongsToMany(Bouquet,{through: CompositionOrder})
Bouquet.belongsToMany(Order,{through: CompositionOrder})
//User and Bouquet
User.belongsToMany(Bouquet,{through: Basket})
Bouquet.belongsToMany(User,{through: Basket})

User.belongsToMany(Bouquet,{through: Selected})
Bouquet.belongsToMany(User,{through: Selected})

module.exports={
    User,
    Employee,
    Post,
    Discount,
    Street,
    StatusOrder,
    TypeOrder,
    Locality,
    Order,
    Category,
    BouquetCategory,
    WrapperCategory,
    Wrapper,
    Bouquet,
    CompositionOrder,
    Flower,
    CompositionBouqet,
}