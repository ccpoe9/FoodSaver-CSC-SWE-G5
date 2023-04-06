let express = require('express');
const { GetProducts } = require('../controllers/product.controller');
let router = express.Router();


router.get('/', (req,res) =>{
    res.send("Food Saver API");
});

router.get('/api/products',GetProducts);

module.exports = router;