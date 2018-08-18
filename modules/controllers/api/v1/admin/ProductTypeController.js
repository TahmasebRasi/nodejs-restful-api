const Controller = require(`${config.path.controller}/Controller`);

module.exports = new class ProductTypeController extends Controller {
    // index(req, res) {
    //     this.model.Course.find({}, (err, courses) => {
    //         if (err) throw err;

    //         if (courses) {
    //             return res.json(courses);
    //         }
    //     });
    // }

    // single(req, res) {

    // }

    store(req, res) {
        // Validation 
        req.checkBody('name', 'نام نمیتواند خالی بماند').notEmpty();
        req.checkBody('description', 'توضیحات نمیتواند خالی بماند').notEmpty();
        req.checkBody('image', 'عکس نمیتواند خالی بماند').notEmpty();
        req.checkBody('productGroup_id',"گروه محصول نمیتواند خالی باشد").notEmpty();
        req.checkBody('productGroup_id',"آی دی وارد شده صحیح نمی باشد").isMongoId();

        this.escapeAndTrim(req, 'name description productGroup_id');

        if (this.showValidationErrors(req, res))
            return;

     this.model.ProductGroup.findById(req.body.productGroup_id , (err , objProductGroup) => {
        if(err) throw err;
        if(!objProductGroup){
           return res.status(404).json({
                message : "گروه محصول اشتباه میباشد",
                success : false
            })
        }

        let newProductType = new this.model.ProductType({
            productGroup:objProductGroup._id,
            name: req.body.name,
            description: req.body.description,
            engName: req.body.engName,
            image: req.body.image
        })

        newProductType.save(err => {
            if (err) throw err;
            objProductGroup.productTypes.push(newProductType._id);
            objProductGroup.save();
            return res.json({
                productType_id : newProductType._id,
                message : 'تیپ محصول اضافه گردید',
                success : true
            })
        })
    })
    }
    
    update(req, res) {
         req.checkParams('id',"آی دی وارد شده صحیح نمی باشد").isMongoId();

         if (this.showValidationErrors(req, res))
             return;

        this.model.ProductType.findByIdAndUpdate(req.params.id, {
            // name: 'تیپ اصلاح گردید' 
        }, 
             (err, productType) => {
                if(err) throw err;

                if(productType) {
                    return res.json({
                        message : 'تیپ محصول با موفقیت آپدیت شد',
                        success : true
                    });
                }
                res.status(404).json({
                    message : 'چنین تیپ محصولی وجود ندارد',
                    success : false
                });
        });
    }

    destroy(req, res) {
        req.checkParams('id',"آی دی وارد شده صحیح نمی باشد").isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.ProductType.findById(req.params.id).populate('productGroup').exec((err, objProductType) => {
            if (err) throw err;
            if(objProductType){
                let objProductGroup = objProductType.productGroup;
                let pos =  objProductGroup.productTypes.indexOf(objProductType._id);
                objProductGroup.productTypes.splice(pos,1);
                objProductGroup.save(err =>{
                    if(err) throw err;
                    objProductType.remove();
                     res.json({
                        message : 'تیپ محصول با موفقعیت حذف گردید',
                        success : true
                    })
                })
            }
            else{
              res.json({
                        message : 'تیپ محصول پیدا نشد',
                        success : false
                    })
                }
        })
    }

   

}