let express = require('express');
const {  GetProductsByStore, GetProductsByType, GetProductsByTypeStore, GetProductsBySearch, GetProductsCartCount } = require('../controllers/product.controller');
const { SignUp, Login, AdminLogin} = require('../controllers/user.controller');
const { GetStores } = require('../controllers/store.controller');
let router = express.Router();


router.get('/', (req,res) =>{
    res.send("Food Saver API");
});

router.get('/api/products',GetProductsByStore);
router.get('/api/products/type' ,GetProductsByType);
router.get('/api/products/details', GetProductsByTypeStore);
router.get('/api/products/search', GetProductsBySearch);
router.get('/api/stores',GetStores);
router.post('/api/users/customers/login',Login);
router.post('/api/users/customers/signup',SignUp);
router.post('/api/users/admin/login',AdminLogin);




module.exports = router;