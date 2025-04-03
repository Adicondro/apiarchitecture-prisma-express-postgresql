const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

dotenv.config();

const PORT = process.env.PORT || 2000;

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();

  res.send(products);
});

app.post("/products", async (req, res) => {
  const newProductData = req.body;

  const product = await prisma.product.create({
    data: {
      name: newProductData.name,
      description: newProductData.description,
      price: newProductData.price,
      image: newProductData.image,
    },
  });

  res.send({
    message: "Product created successfully",
    data: product,
  });
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }

  res.send(product);
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const updatedProductData = req.body;

  if (
    !(
      updatedProductData.image &&
      updatedProductData.name &&
      updatedProductData.description &&
      updatedProductData.price
    )
  ) {
    return res.status(400).send({ message: "All fields are required" });
  }

  const product = await prisma.product.update({
    where: {
      id: Number(id),
    },
    data: {
      name: updatedProductData.name,
      description: updatedProductData.description,
      price: updatedProductData.price,
      image: updatedProductData.image,
    },
  });

  res.send({
    message: "Product updated successfully",
    data: product,
  });
});

app.patch("/products/:id", async (req, res) => {
  const { id } = req.params;
  const updatedProductData = req.body;

  const product = await prisma.product.update({
    where: {
      id: Number(id),
    },
    data: {
      ...updatedProductData,
    },
  });

  res.send({
    message: "Product updated successfully",
    data: product,
  });
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  const product = await prisma.product.delete({
    where: {
      id: Number(id),
    },
  });

  res.send({
    message: "Product deleted successfully",
    data: product,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
