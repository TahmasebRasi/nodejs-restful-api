const Controller = require(`${config.path.controller}/Controller`);
const ProductTypeTransform = require(`${config.path.transform}/v1/ProductTypeTransform`);

module.exports = new class CourseController extends Controller {
    index(req , res) {
        this.model.ProductType.find({}).populate('product').exec((err , ProductType) => {
            if(err) throw err;
    
            if(ProductType) {
                return res.json({
                    data : new ProductTypeTransform().withEpsiodes().transformCollection(ProductType),
                    success : true
                });
            }

            res.json({
                message : 'Courses empty',
                success : false
            })
        })
        const page = req.query.page || 1
        this.model.ProductType.paginate({} , { page , limit : 2 , populate : ['product']})
        .then(result => {
            if(result) {
                return res.json({
                    data : new ProductTypeTransform().withPaginate().transformCollection(result),
                    success : true
                });
            }

            res.json({
                message : 'ProductType empty',
                success : false
            })
        })
        .catch(err => console.log(err));
    }

    uploadImage(req, res) {
        console.log('1');
        //res.json(req.file);
        console.log(req.file);
        if(req.file) {
            res.json({
                message : 'فایل شما با موفقیت آپلود گردید',
                data : {
                    imagePath : 'http://localhost:3000/' + req.file.path.replace(/\\/g , '/') 
                },
                success : true
            })
         } 
        else {
            res.json({
                message : 'فایل شما آپلود نشد',
                success : false
            })
        }
    }
}