const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    login: {type: DataTypes.STRING(50),primaryKey:true},
    email: {type: DataTypes.STRING(100),unique:true},
    password_: {type:DataTypes.STRING()},
    name_: {type: DataTypes.STRING(100)},
    lastname: {type: DataTypes.STRING(100)},
    surname: {type: DataTypes.STRING(100)},
    phone:{type:DataTypes.STRING(12)},
    order_sum:{type:DataTypes.DECIMAL(10, 2)},
    avatar:{type:DataTypes.STRING()}//,defaultValue:0
    //id_discount:{type:DataTypes.INTEGER},
    //role: {type:DataTypes.STRING(100),defaultValue:"USER"},
},
{ timestamps: false }
)
const Basket = sequelize.define('basket',{
    cnt:{type:DataTypes.INTEGER},
},{ timestamps: false })
const Selected = sequelize.define('selected',{
},{ timestamps: false })
const Employee = sequelize.define('employee',{
    login: {type:DataTypes.STRING(50),primaryKey:true},
    email: {type: DataTypes.STRING(100),unique:true},
    password_: {type:DataTypes.STRING()},
    name_: {type: DataTypes.STRING(100)},
    lastname: {type: DataTypes.STRING(100)},
    surname: {type: DataTypes.STRING(100)},
    phone:{type:DataTypes.STRING(12)},
    avatar:{type:DataTypes.STRING()},
},{ timestamps: false }
)
const Post = sequelize.define('post', {
    id_record: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title: {type: DataTypes.STRING(50),unique:true},
},{ timestamps: false })

const Discount = sequelize.define('discount',{
    id_record: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    sum:{type: DataTypes.DECIMAL(20, 2),unique:true},
    procent: {type: DataTypes.INTEGER,unique:true},
},{ timestamps: false }
)
const Locality = sequelize.define('locality',{
    id_record: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title: {type: DataTypes.STRING(50),unique:true},
},{ timestamps: false }
)
const Street = sequelize.define('street',{
    id_record: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title: {type: DataTypes.STRING(50),unique:true},
},{ timestamps: false }
)
const StatusOrder = sequelize.define('status_order',{
    id_record: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title: {type: DataTypes.STRING(50),unique:true},
},{ timestamps: false }
)
const Delivery = sequelize.define('delivery',{
    id_record: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title: {type: DataTypes.STRING(50),unique:true},
    price:{type:DataTypes.DECIMAL(10, 2)},
},{ timestamps: false }
)
const Order = sequelize.define('order',{
    number_order: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    //id_status_order: {type: DataTypes.INTEGER},
    // id_locality: {type: DataTypes.INTEGER},
   // id_street: {type: DataTypes.INTEGER},
    house_number: {type: DataTypes.STRING(100)},
    adress_comment: {type:DataTypes.TEXT( )},
    date_order: {type: DataTypes.DATEONLY},
    time_order: {type: DataTypes.TIME},
    anonymized: {type: DataTypes.BOOLEAN,defaultValue: false},
    //id_type_order: {type: DataTypes.INTEGER},
    comment:{type: DataTypes.TEXT( )},
    price:{type:DataTypes.DECIMAL(10, 2)},
    //id_courier: {type: DataTypes.INTEGER},
    //id_florist: {type: DataTypes.INTEGER},
    //id_user: {type: DataTypes.INTEGER},
},{
    hooks: {
      beforeCreate: (order) => {
        order.createdAt = new Date();
        order.updatedAt = new Date();
      },
      beforeUpdate: (order) => {
        order.updatedAt = new Date();
      }
    }
  }
)
const Category = sequelize.define('category',{
    id_record: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title: {type: DataTypes.STRING(50),unique:true},
},{ timestamps: false }
)
const WrapperCategory = sequelize.define('wrapper_category',{
    id_record: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title: {type: DataTypes.STRING(50),unique:true},
},{ timestamps: false }
)
const Wrapper = sequelize.define('wrapper',{
    id_record: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    //id_wrapper_category:{type:DataTypes.INTEGER},
    title: {type: DataTypes.STRING(50),unique:true},
    img: {type: DataTypes.STRING(), allowNull: false},
    price: {type:DataTypes.DECIMAL(10, 2)},
    cnt: {type:DataTypes.INTEGER},
},{ timestamps: false }
)
const Bouquet = sequelize.define('bouquet',{
    arc: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title: {type: DataTypes.STRING(50),unique:true},
    ready_made:{type:DataTypes.BOOLEAN,defaultValue:true},
    price:{type:DataTypes.DECIMAL(10, 2)},
    description: {type:DataTypes.TEXT( )},
    // id_category:{type:DataTypes.INTEGER},
    // id_wrapper:{type:DataTypes.INTEGER},
    img: {type: DataTypes.STRING(), allowNull: false},
},{ timestamps: false })
const CompositionOrder = sequelize.define('composition_order',{
    //number_order: {type:DataTypes.INTEGER,primaryKey:true},
    //id_bouquet: {type:DataTypes.INTEGER,primaryKey:true},
    cnt: {type: DataTypes.INTEGER},
    postcard:{type:DataTypes.BOOLEAN},
    postcard_comment: {type: DataTypes.TEXT( )},
},{ timestamps: false }
)
const Flower = sequelize.define('flower',{
    id_record: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title: {type: DataTypes.STRING(50),unique:true},
    cnt: {type:DataTypes.INTEGER},
    price: {type:DataTypes.DECIMAL(10, 2)},
    season_start: {type:DataTypes.DATE},
    season_end: {type:DataTypes.DATE},
    img: {type: DataTypes.STRING(), allowNull: false},
},{ timestamps: false }
)
const CompositionBouqet = sequelize.define('composition_bouquet',{
    //id_flower: {type:DataTypes.INTEGER,primaryKey:true},
    //id_bouquet: {type:DataTypes.INTEGER,primaryKey:true},
    cnt: {type: DataTypes.INTEGER},
},{ timestamps: false }
)
const BouquetCategory = sequelize.define('bouquet_category',{
},{ timestamps: false })

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
Delivery.hasMany(Order)
Order.belongsTo(Delivery)
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
    Delivery,
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