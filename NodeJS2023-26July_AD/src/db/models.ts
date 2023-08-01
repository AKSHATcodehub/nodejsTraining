
import { sequelize, DataTypes } from "./connection";

export const SessionModel = sequelize.define("olx_sessions", {
    session_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER
    }

})


export const UserModel = sequelize.define("olx_users", {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    last_name: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        defaultValue: null
    },
    password: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    mobile_number: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    dob: {
        type: DataTypes.DATE,
        defaultValue: null
    },
    gender: {
        type: DataTypes.CHAR,
        defaultValue: null
    },
    profile_pic: {
        type: DataTypes.BLOB,
        defaultValue: null
    }
});


export const ProductModel = sequelize.define("olx_products", {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER
    },
    product_name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    base_price: {
        type: DataTypes.INTEGER
    },
    current_price: {
        type: DataTypes.INTEGER
    },
    bidder_id: {
        type: DataTypes.INTEGER,
        defaultValue:null
    },
    category_id: {
        type: DataTypes.STRING
    },
    subcategory_id:{
        type:DataTypes.STRING,
    },
    address_id: {
        type: DataTypes.INTEGER
    }
},
)

export const AddressModel = sequelize.define("olx_address", {
    address_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER
    },
    house_number: {
        type: DataTypes.INTEGER
    },
    street_number: {
        type: DataTypes.INTEGER
    },
    area: {
        type: DataTypes.STRING
    },
    landmark: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.STRING
    },
    zipcode: {
        type: DataTypes.INTEGER
    },
    address_type: {
        type: DataTypes.STRING,
        defaultValue: true
    },
})

export const ProductImageModel = sequelize.define("olx_product_image",{
    image_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    image_data:{
        type:DataTypes.BLOB('long')
    },
    product_id:{
        type:DataTypes.INTEGER
    }
})