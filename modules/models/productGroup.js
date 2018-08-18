const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongoosePaginate = require('mongoose-paginate');

const ProductGroupSchema = new Schema({
    name : { type : String , required : true} ,
    description : { type : String , required : true} ,
    engName : { type : String , required : false} ,
    image : { type : String , required : true} ,    
    productTypes : [{ type : Schema.Types.ObjectId , ref : 'ProductType'}]
});
ProductGroupSchema.plugin(timestamps);
ProductGroupSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('ProductGroup' , ProductGroupSchema);