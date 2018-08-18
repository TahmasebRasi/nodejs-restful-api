const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongoosePaginate = require('mongoose-paginate');

const ProductTypeSchema = new Schema({
    productGroup : { type : Schema.Types.ObjectId , ref : 'ProductGroup'},
    name : { type : String , required : true} ,
    description : { type : String , required : true} ,
    engName : { type : String , required : false} ,
    image : { type : String , required : true} ,    
    products : [{ type : Schema.Types.ObjectId , ref : 'Product'}]
});
ProductTypeSchema.plugin(timestamps);
ProductTypeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('ProductType' , ProductTypeSchema);