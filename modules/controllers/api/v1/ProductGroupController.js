const Controller = require(`${config.path.controller}/Controller`);
const ProductGroupTransform = require(`${config.path.transform}/v1/ProductGroupTransform`);

module.exports = new class ProductGroupController extends Controller {
    index(req , res) {
        const page = req.query.page || 1
        this.model.ProductGroup.paginate({} , { page , limit : 2 , populate : ['productTypes']})
        .then(result => {
            if(result) {
                return res.json({
                    data : new ProductGroupTransform().withPaginate().withProductTypes().transformCollection(result),
                    success : true
                });
            }

            res.json({
                message : 'Courses empty',
                success : false
            })
        })
        .catch(err => console.log(err));
    }
}