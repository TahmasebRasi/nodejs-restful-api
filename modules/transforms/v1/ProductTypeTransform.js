const Transform = require('./../Transform');
module.exports = class ProductTypersTranform extends Transform {

    transform(item) {
        return {
            'name' : item.name,
            'description' : item.description,
            'engName' : item.engName,
            'image' : item.image,
            ...this.showProducts(item)
        }
    }

    showProducts(item) {
        
        if(this.withProductsStatus) {
            return {
                products : item.products
            }
        }
        return {}
    }

    withProducts() {
        this.withProductsStatus = true;
        return this;
    }
}