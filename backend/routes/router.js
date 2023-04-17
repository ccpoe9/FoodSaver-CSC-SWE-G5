let express = require('express');
const {  GetProductsByStore, GetProductsByType, GetProductsByTypeStore, GetProductsBySearch, GetProductsCartCount, CreateProduct, DeleteProduct, GetAdminProducts } = require('../controllers/product.controller');
const { SignUp, Login, AdminLogin, GetUserInfo, EditUserInfo} = require('../controllers/user.controller');
const { GetStores, GetAdminStores, GetAllStores } = require('../controllers/store.controller');
const { GetFavorites, AddFavorites, RemoveFavorites } = require('../controllers/favorites.controller');
const { GetReports, GetAdminReports, CreateReports } = require('../controllers/report.controller');
const { GetShoppingSessions, AddtoCart, RemoveFromCart, RemoveShoppingSession } = require('../controllers/shopping.controller');
let router = express.Router();


router.get('/', (req,res) =>{
    res.send("Food Saver API");
});

router.get('/api/products',GetProductsByStore);
router.get('/api/products/admin',GetAdminProducts);
router.get('/api/products/type' ,GetProductsByType);
router.get('/api/products/details', GetProductsByTypeStore);
router.get('/api/products/search', GetProductsBySearch);
router.get('/api/stores',GetStores);
router.get('/api/stores/all',GetAllStores);
router.get('/api/stores/admin',GetAdminStores);
router.get('/api/customers', GetUserInfo);
router.put('/api/customers', EditUserInfo);
router.get('/api/favorites', GetFavorites);
router.get('/api/reports', GetReports);
router.get('/api/reports/admin', GetAdminReports);
router.get('/api/sessions', GetShoppingSessions);
router.post('/api/carts', AddtoCart);
router.post('/api/users/customers/login',Login);
router.post('/api/users/customers/signup',SignUp);
router.post('/api/users/admin/login',AdminLogin);
router.post('/api/reports', CreateReports);
router.post('/api/favorites', AddFavorites);
router.post('/api/products',CreateProduct);
router.delete('/api/carts', RemoveFromCart);
router.delete('/api/favorites', RemoveFavorites);
router.delete('/api/products', DeleteProduct);

module.exports = router;