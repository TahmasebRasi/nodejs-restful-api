const Controller = require(`${config.path.controller}/Controller`);

module.exports = new class ProductGroupController extends Controller {
    index(req, res) {
        this.model.ProductGroup.find({}, (err, productGroup) => {
            if (err) throw err;

            if (productGroup) {
                return res.json(productGroup);
            }
        });
    }

    single(req, res) {

    }


    store(req, res) {
        // Validation 
        req.checkBody('name', 'نام نمیتواند خالی بماند').notEmpty();
        req.checkBody('description', 'توضیحات نمیتواند خالی بماند').notEmpty();
        req.checkBody('image', 'عکس نمیتواند خالی بماند').notEmpty();
        
        this.escapeAndTrim(req, 'name description');

        if (this.showValidationErrors(req, res))
            return;

        let newProductGroup = new this.model.ProductGroup({
            name: req.body.name,
            description: req.body.description,
            engName: req.body.engName,
            image: req.body.image
        })

        newProductGroup.save(err => {
            if (err) throw err;
  
            return res.json({
                message : 'تیپ محصول اضافه گردید',
                productGroup_id : newProductGroup._id,
                success : true 
            })
        })
    }

}