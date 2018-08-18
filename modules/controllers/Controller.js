// Model
const ProductGroup = require(`${config.path.model}/productGroup`);
const ProductType = require(`${config.path.model}/productType`);
const Product = require(`${config.path.model}/product`);
const User = require(`${config.path.model}/user`);

module.exports = class Controller {
    constructor() {
        this.model = { ProductGroup , ProductType , Product , User }
    }

    showValidationErrors(req , res , callback) {
        let errors = req.validationErrors();
        if(errors) {
            res.status(422).json({
                message : errors.map(error => {
                    return {
                        'field' : error.param,
                        'message' : error.msg
                    }
                }),
                success : false
            });
            return true;
        }
        return false
    }


    escapeAndTrim(req , items) {
        items.split(' ').forEach(item => {
            req.sanitize(item).escape();
            req.sanitize(item).trim();            
        });
    }
}