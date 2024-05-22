const productRepository = require("../repositories/product.js");
const ErrorResponse = require("../utils/errorResponse.js");
const asyncHandler = require("../middleware/asynHandler.js");

const getProducts = asyncHandler(async (req, res, next) => {
  const products = await productRepository.getAllProducts();
  res.status(200).json({ success: true, data: products });
});
const getOneProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const product = await productRepository.getOneProduct(id);
  if (product && product.length>0){
   return res.status(200).json({ success: true, data: product });

  }else{
   next(new ErrorResponse("Product doesnt exist with id",404))
  }

});

const addProduct = asyncHandler(async (req, res, next) => {
  const { id, title, price, image, offer } = req.body;

  await productRepository.createProduct(id, title, price, image, offer);
  res
    .status(201)
    .json({ success: true, message: "Successfully created course" });
});

const updateProduct = asyncHandler(async (req, res, next) => {
  console.log("Req body", req.body);
  const { title, price, image, offer } = req.body;
  const id = req.params.id;

  const recordExist = await productRepository.checkProductExists(id);
  if (recordExist) {
    await productRepository.updateProduct(title, price, image, offer, id);
    res
      .status(200)
      .json({ success: true, message: "Successfully updated products" });
  }else{
   next(new ErrorResponse("Product doesnt exist with id",404))
  }
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const recordExist = await productRepository.checkProductExists(id);
  if (recordExist) {
    await productRepository.deleteProduct(id);
    res
      .status(200)
      .json({ success: true, message: "Successfully deleted products" });
  }else{
   next(new ErrorResponse("Product doesnt exist with id",404))
  }
});

module.exports = {
  getProducts,
  getOneProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
