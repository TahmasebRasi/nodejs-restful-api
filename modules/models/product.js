const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongoosePaginate = require('mongoose-paginate');

const ProductSchema = new Schema({
    productType : { type : Schema.Types.ObjectId , ref : 'ProductType'},
    name : { type : String , required : true} ,
    description : { type : String , required : true} ,
    engName:{type:String,required:false},
    price : { type : String , required : true} ,
    image : { type : String , required : true} ,    
});
ProductSchema.plugin(timestamps);
ProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product' , ProductSchema);