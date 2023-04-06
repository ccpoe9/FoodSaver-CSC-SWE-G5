const express = require("express");
const bodyparser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000
let router = require('./routes/router');

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:4200', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(bodyparser.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`FoodSaver API listening on port ${port}`);
});