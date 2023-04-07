let express = require('express');
const { GetProducts } = require('../controllers/product.controller');
const { SignUp, GetCustomers, Login } = require('../controllers/user.controller');
let router = express.Router();


router.get('/', (req,res) =>{
    res.send("Food Saver API");
});

router.get('/api/products',GetProducts);

router.post('/api/users/customers/login',Login);
router.post('/api/users/customers/signup',SignUp);




module.exports = router;