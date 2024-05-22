const express = require('express');
const router = express.Router();
const { getProducts, getOneProduct, addProduct, updateProduct, deleteProduct } = require('../controllers/productControllers.js');
const { verifyTokenHandler,verifyRoles } = require('../middleware/jwtHandler.js');

router.get('/',[verifyTokenHandler],getProducts);
router.post('/',[verifyTokenHandler,verifyRoles(['admin'])],addProduct);
router.get('/:id',[verifyTokenHandler],getOneProduct);
router.put('/:id',[verifyTokenHandler,verifyRoles(['admin'])],updateProduct);
router.delete('/:id',[verifyTokenHandler,verifyRoles(['admin'])],deleteProduct);

module.exports = router;