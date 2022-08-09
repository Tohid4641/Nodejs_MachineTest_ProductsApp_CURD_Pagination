const Product = require('../models/product.model');


const products = async(req,res)=> {
    try {
        const allProducts = await Product.find()
        res.render('products.ejs',{allProducts})
        req.query.id = allProducts[0].id

    } catch (error) {
        console.log(error.message)
    }
}

const load_product_create = async(req,res)=>{
    try {
        res.render('createProduct.ejs')
    } catch (error) {
        console.log(error.message)
    }
}

const product_create = async function (req, res) {

    try {
        const p_id = req.body.p_id
        const name = req.body.name
        const price = req.body.price
        const category = req.body.category
        const cat_id = req.body.cat_id

        let product = new Product(
            {   p_id,name,price,category,cat_id    }
        );
        const newProduct = await product.save()
        console.log('Product Created successfully : - ',newProduct)
        res.redirect('/products')

    } catch (error) {
        console.log(error.message)
    }
 
};

const product_details = async function (req, res) {
    try {
        const product = await Product.findById(req.params.id)
        console.log(product)
        res.render('productDetails.ejs',{product})

    } catch (error) {
        console.log(error.message)
    }
};

const load_product_update = async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id)
        res.render('updateProduct.ejs',{product})
    } catch (error) {
        console.log(error.message)
    }
}

const product_update = async(req,res)=>{
    try {
        const updatedData = await Product.findByIdAndUpdate(req.params.id, {$set: req.body});
        console.log('Update Successfully')
        res.redirect("/products")
    } catch (error) {
        console.log(error.message)
    }
}

const product_delete = async(req,res) =>{
    try {
        deleteData = await Product.findByIdAndRemove(req.params.id)
        console.log(deleteData)
        console.log("Delete Successfully")
        res.redirect("/products")
    } catch (error) {
        console.log(error.message)
    }
}

const load_allProducts = async(req,res)=>{
    try {
        const page =parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skips = (page - 1) * limit;

        // const pages = []
        // for (let i = 0; i < page; i++) {
        //     pages.push[i]
        // }
        
        const allProducts = await Product.find().limit(limit).skip(skips)
        const allProducts2 = await Product.find()

        allProducts.page = page
        allProducts.dataLimit = limit
        allProducts.pageLimit = Math.ceil(allProducts2.length / limit)

    
        // console.log(allProducts)
        // console.log(allProducts2.length)
        res.render('allProducts.ejs',{allProducts})
        req.query.id = allProducts[0].id

    } catch (error) {
        console.log(error.message)
    }
}


module.exports={
    products,
    load_product_create,
    product_create,
    product_details,
    product_update,
    load_product_update,
    product_delete,
    load_allProducts
}