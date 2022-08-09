const express = require('express');
const router = express.Router();
const app = express()

// Require the controllers
const product_controller = require('../controllers/product.controller');

// using ejs Template Engine
app.set('view engine','ejs');
app.set('views','../views');

router.get('/', product_controller.products);
router.get('/all-products/create', product_controller.load_product_create);

router.post('/all-products/create', product_controller.product_create);

router.get('/all-products', product_controller.load_allProducts);
router.get('/all-products/:id', product_controller.product_details);
router.get('/all-products/:id/update', product_controller.load_product_update);

router.post('/all-products/:id/update', product_controller.product_update);
router.get('/all-products/:id/delete', product_controller.product_delete);


module.exports = router;