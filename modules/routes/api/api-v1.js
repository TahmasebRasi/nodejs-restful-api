const express = require('express');
const router = express.Router();

// Controllers 
const { api : ControllerApi } = config.path.controllers;
const HomeController = require(`${ControllerApi}/v1/HomeController`);
const AuthController = require(`${ControllerApi}/v1/AuthController`);
const UserController = require(`${ControllerApi}/v1/UserController`);
const ProductTypeController = require(`${ControllerApi}/v1/ProductTypeController`);
const ProductGroupController = require(`${ControllerApi}/v1/ProductGroupController`);

// AdminController
const AdminProductTypeController = require(`${ControllerApi}/v1/admin/ProductTypeController`);
const AdminProductGroupController = require(`${ControllerApi}/v1/admin/ProductGroupController`);


// middlewares 
const apiAuth = require('./middleware/apiAuthMiddleware');
const apiAdmin=require('./middleware/apiAdminMiddleware');
const { uploadImage } = require('./middleware/uploadMiddleware');

router.get('/' , HomeController.index);
router.get('/version',HomeController.version);
router.post('/login' , AuthController.login.bind(AuthController));
router.post('/login2' , AuthController.login2.bind(AuthController));
router.post('/register' , AuthController.register.bind(AuthController));
router.get('/authaction' , apiAuth , UserController.index.bind(UserController));
router.get('/productgroup',ProductGroupController.index.bind(ProductGroupController));

router.post('/producttype/image',apiAuth , uploadImage.single('image') , ProductTypeController.uploadImage.bind(ProductTypeController));


const adminRouter = express.Router();
adminRouter.post('/producttype' , AdminProductTypeController.store.bind(AdminProductTypeController));
adminRouter.put('/producttype/:id' , AdminProductTypeController.update.bind(AdminProductTypeController));
adminRouter.delete('/producttype/:id' , AdminProductTypeController.destroy.bind(AdminProductTypeController));


adminRouter.post('/productgroup' , AdminProductGroupController.store.bind(AdminProductGroupController));
adminRouter.get('/productgroup' , AdminProductGroupController.index.bind(AdminProductGroupController));

router.use('/admin' , apiAuth , apiAdmin , adminRouter);

module.exports=router;