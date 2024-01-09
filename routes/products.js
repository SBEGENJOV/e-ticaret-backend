const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");
//Yeni bir ürün oluşturma(Create)
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Tüm ürünleri getirme (Read- All)
router.get("/", async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Tüm ürünleri kategoriye göre getirme
router.get("/categoryName/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const product = await Product.find({
      category: categoryId,
    });
    console.log(product);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

//Belirli ürünü getirme (Read- single)
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    try {
      const product = await Product.findById(productId);

      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: "Product not fount." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

//Ürün güncelleme(Update)
router.put("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const updates = req.body;

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
    });
    console.log(updatedProduct);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

//Ürün Silme(Delete)
router.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.status(200).json(deletedProduct);
    console.log(productId);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

//Ürünleri isime göre arama
router.get("/search/:productName", async (req, res) => {
  try {
    const productName = req.params.productName;
    const product = await Product.find({
      name: {
        $regex: productName,
        $options: "i",
      },
    });
    res.status(200).json({ product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
