let express = require('express');
const {  GetProductsByStore } = require('../controllers/product.controller');
const { SignUp, Login, AdminLogin} = require('../controllers/user.controller');
let router = express.Router();


router.get('/', (req,res) =>{
    res.send("Food Saver API");
});

router.get('/api/products',GetProductsByStore);

router.post('/api/users/customers/login',Login);
router.post('/api/users/customers/signup',SignUp);
router.post('/api/users/admin/login',AdminLogin);




module.exports = router;