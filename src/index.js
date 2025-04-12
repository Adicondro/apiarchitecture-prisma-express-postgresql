const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

dotenv.config();

const PORT = process.env.PORT || 2000;

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

const productRouter = require("./product/product.controller");

app.use("/products", productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
