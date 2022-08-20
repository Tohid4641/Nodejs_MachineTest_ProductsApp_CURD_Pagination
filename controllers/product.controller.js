const Product = require('../models/product.model');
const Category = require('../models/category.model');


const productsApp = async(req,res)=> {
    try {
        res.render('productsApp.ejs')

    } catch (error) {
        console.log(error.message)
    }
}

const categories = async(req,res)=> {
    try {
        const allProducts = await Product.find()
        const allCategories = await Category.find()
        
        Array.prototype.push.apply(allProducts,allCategories)

        res.render('categories.ejs',{allProducts})
        req.query.id = allProducts[0].id

    } catch (error) {
        console.log(error.message)
    }
}

const load_create_category = async(req,res)=>{
    try {
        res.render('createCategory.ejs')
    } catch (error) {
        console.log(error.message)
    }
}

const create_category = async(req,res)=> {
    try {
        const category = req.body.category
        const cat_id = req.body.cat_id

        let newCategory = new Category(
            {   category,cat_id    }
        );
        const newCat = await newCategory.save()
        console.log('New Category Created successfully : - ',newCat)
        res.redirect('/productsApp/categories')

    } catch (error) {
        console.log(error.message)
    }
}

const load_category_products = async function (req, res) {
    try {
        const page =parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skips = (page - 1) * limit;


        const category_products = await Product.find({cat_id:req.params.cat_id}).limit(limit).skip(skips)
        const category_products2 = await Product.find({cat_id:req.params.cat_id})

        category_products.page = page
        category_products.dataLimit = limit
        category_products.pageLimit = Math.ceil(category_products2.length / limit)

        // console.log('category_products.length',category_products.length)
        // console.log('category_products.pageLimit',category_products.pageLimit)

        res.render('categoriesProducts.ejs',{category_products})

    } catch (error) {
        console.log(error.message)
    }
};

const load_add_product = async(req,res)=>{
    try {
        const data = await Product.find({cat_id:req.params.cat_id});
        const data2 = await Category.find({cat_id:req.params.cat_id});

        Array.prototype.push.apply(data,data2)

        res.render('addProduct.ejs',{ data })
        // console.log(data)

    } catch (error) {
        console.log(error.message)
    }
}

const add_product = async function (req, res) {

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
        console.log('Product Added successfully : - ',newProduct)
        res.redirect('/productsApp/categories')

    } catch (error) {
        console.log(error.message)
    }
 
};


const load_update_category = async(req,res)=>{
    try {
        const data = await Product.find({cat_id:req.params.cat_id})
        const data2 = await Category.find({cat_id:req.params.cat_id});
        Array.prototype.push.apply(data,data2)

        console.log(data)
        res.render('updateCategory.ejs',{data})
    } catch (error) {
        console.log(error.message)
    }
}

const update_category = async(req,res)=>{
    try {
        const updatedData = await Product.updateMany({cat_id: req.params.cat_id}, {category:req.body.category,cat_id: req.body.cat_id});
        const updatedData2 = await Category.updateMany({cat_id: req.params.cat_id}, {category:req.body.category,cat_id: req.body.cat_id});
        console.log('Category Update Successfully')
        res.redirect("/productsApp/categories")
    } catch (error) {
        console.log(error.message)
    }
}

// -----------------------------------------------------
const delete_category = async(req,res) =>{
    try {
        let data = await Product.deleteMany({cat_id:req.params.cat_id})
        let data2 = await Category.deleteMany({cat_id:req.params.cat_id});

        console.log("Category Deleted Successfully")
        res.redirect("/productsApp/categories")
    } catch (error) {
        console.log(error.message)
    }
}
// -----------------------------------------------------
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
        res.redirect('/productsApp/categories')

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
        res.redirect("/productsApp/categories")
    } catch (error) {
        console.log(error.message)
    }
}

const product_delete = async(req,res) =>{
    try {
        const deleteData = await Product.findByIdAndRemove(req.params.id)
        console.log(deleteData)
        console.log("Delete Successfully")
        res.redirect("/productsApp/categories")
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
    productsApp,
    categories,
    load_create_category,
    create_category,
    load_category_products,
    load_add_product,
    add_product,
    load_update_category,
    update_category,
    delete_category,
    load_product_create,
    product_create,
    product_details,
    product_update,
    load_product_update,
    product_delete,
    load_allProducts
}