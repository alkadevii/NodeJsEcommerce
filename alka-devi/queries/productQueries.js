const getAllProducts = "SELECT id, title, price, image, offer FROM PRODUCTS";
const getProductById = "SELECT id, title, price, image, offer FROM PRODUCTS WHERE id = $1";
const addProductQuery= "INSERT INTO PRODUCTS (id,title,price,image,offer) values ($1,$2,$3,$4,$5);"
const updateProductQuery= "UPDATE PRODUCTS set title=$1,price=$2,image=$3,offer=$4 WHERE id=$5";
const deleteProductQuery="DELETE FROM PRODUCTS WHERE id=$1";

module.exports = {
   getAllProducts,
   getProductById,
   addProductQuery,
   updateProductQuery,
   deleteProductQuery
};