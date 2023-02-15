const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Food Saver API");
});

app.listen(port, () => {
  console.log(`FoodSaver API listening on port ${port}`);
});