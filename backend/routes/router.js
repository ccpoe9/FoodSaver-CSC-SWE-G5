let express = require('express');
const {  GetProductsByStore, GetProductsByType, GetProductsByTypeStore, GetProductsBySearch } = require('../controllers/product.controller');
const { SignUp, Login, AdminLogin} = require('../controllers/user.controller');
const { GetStores } = require('../controllers/store.controller');
const { CreateShoppingSession, CreateCartItem, GetCartItemCount } = require('../controllers/shopping.controller');
let router = express.Router();


router.get('/', (req,res) =>{
    res.send("Food Saver API");
});

router.get('/api/products',GetProductsByStore);
router.get('/api/products/type' ,GetProductsByType);
router.get('/api/products/details', GetProductsByTypeStore);
router.get('/api/products/search', GetProductsBySearch);
router.get('/api/sessions/items', GetCartItemCount);
router.get('/api/stores',GetStores);
router.post('/api/sessions', CreateShoppingSession);
router.post('/api/sessions/items', CreateCartItem);
router.post('/api/users/customers/login',Login);
router.post('/api/users/customers/signup',SignUp);
router.post('/api/users/admin/login',AdminLogin);




module.exports = router;