const Transform = require('./../Transform');
module.exports = class ProductGroupTranform extends Transform {

    transform(item) {
        return {
            'name' : item.name,
            'description' : item.description,
            'engName' : item.engName,
            'image' : item.image,
            ...this.showProductTypes(item)
        }
    }

    showProductTypes(item) {
        const ProductTypeTransform = require('./ProductTypeTransform');
        
        if(this.withProductTypesStatus) {
            return {
                productTypes : new ProductTypeTransform().withProducts().transformCollection(item.productTypes)
            }
        }
        return {}
    }

    withProductTypes() {
        this.withProductTypesStatus = true;
        return this;
    }
}