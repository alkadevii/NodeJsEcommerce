const pool = require('../config/db.js');
const productQueries = require('../queries/productQueries.js');
const Product = require('../models/product.js');

const getAllProducts = () => {
    return new Promise((resolve,reject) => {
        pool.query(productQueries.getAllProducts,(error,results) => {
            if (error) {
                reject(error);
            }
            else{
                let products=[];
                for (let r of results.rows){
                    products.push(new Product(r.id,r.title,r.price,r.image,r.offer))
                }
                resolve(products);
            }
        })
    })
}
const getOneProduct = (id) => {
    return new Promise((resolve,reject) => {
        pool.query(productQueries.getProductById, [id], (error, results) => {
            if (error){
                reject(error);
            }
            else{
                resolve(results.rows);
            }
        })
    });
}
const createProduct = (id,title,price,image,offer) => {
    return new Promise ((resolve,reject) => {
        pool.query(productQueries.addProductQuery,[id,title,price,image,offer],(error,results) =>{
            if (error){
                reject(error);
            }else{
                resolve(true);
            }
         })
    })
}
const checkProductExists = (id) => {
    return new Promise((resolve,reject) => {
        pool.query(productQueries.getProductById, [id], (error, results) => {
            if (error){
                resolve(false);
            }
            else{
                resolve(results.rows.length>0);
            }
        })
    });
}
const updateProduct = (title,price,image,offer,id) => {
    return new Promise((resolve,reject) => {
        pool.query(productQueries.updateProductQuery, [title,price,image,offer,id], (error, results) => {
            if (error){
                reject(error);
            }else{
                resolve(true);
            }
         })
        
    });
}
const deleteProduct = (id) => {
    return new Promise((resolve,reject) => {
        pool.query(productQueries.deleteProductQuery, [id], (error, results) => {
            if (error){
                reject(error);
            }else{
                resolve(true);
            }
         })
    });
}


module.exports={
    getAllProducts,
    getOneProduct,
    createProduct,
    checkProductExists,
    updateProduct,
    deleteProduct
}