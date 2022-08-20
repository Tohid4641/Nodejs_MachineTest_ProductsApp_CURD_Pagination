const express = require('express');
const router = express.Router();
const app = express()

// Require the controllers
const product_controller = require('../controllers/product.controller');

// using ejs Template Engine
app.set('view engine','ejs');
app.set('views','../views');

router.get('/', product_controller.productsApp);

router.get('/categories', product_controller.categories);
router.get('/categories/create', product_controller.load_create_category);
router.post('/categories/create', product_controller.create_category);
router.get('/categories/:cat_id/products', product_controller.load_category_products);

router.get('/categories/:cat_id/addProduct', product_controller.load_add_product);
router.post('/categories/:cat_id/addProduct', product_controller.add_product);

router.get('/categories/:cat_id/update_category', product_controller.load_update_category);
router.post('/categories/:cat_id/update_category', product_controller.update_category);

router.get('/categories/:cat_id/delete_category', product_controller.delete_category);

router.get('/all-products/create', product_controller.load_product_create);

router.post('/all-products/create', product_controller.product_create);

router.get('/all-products', product_controller.load_allProducts);
router.get('/all-products/:id', product_controller.product_details);
router.get('/all-products/:id/update', product_controller.load_product_update);

router.post('/all-products/:id/update', product_controller.product_update);
router.get('/all-products/:id/delete', product_controller.product_delete);


module.exports = router;