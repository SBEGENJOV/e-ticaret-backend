const express = require("express");
const router = express.Router();
const Logo = require("../models/Logo.js");
//Yeni bir Logo oluşturma(Create)
router.post("/", async (req, res) => {
  try {
    const { name, img } = req.body;
    const post = await Logo.create({
      name,
      img,
    });
    console.log(post);
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Tüm kategorileri getirme (Read- All)
router.get("/", async (req, res) => {
  try {
    const logo = await Logo.find({});
    res.status(200).json(logo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});
//Belirli Logo getirme (Read- single)
router.get("/:logoId", async (req, res) => {
  try {
    const logoId = req.params.logoId;
    try {
      const logo = await Logo.findById(logoId);

      res.status(200).json(logo);
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: "Logo not fount." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});
//Logo güncelleme(Update)
router.put("/:logoId", async (req, res) => {
  try {
    const logoId = req.params.logoId;
    const updates = req.body;

    const existingLogo = await Logo.findById(logoId);

    if (!existingLogo) {
      return res.status(404).json({ error: "Logo not found." });
    }

    const updatedLogo = await Logo.findByIdAndUpdate(logoId, updates, {
      new: true,
    });
    res.status(200).json(updatedLogo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});
//Logo Silme(Delete)
router.delete("/:logoId", async (req, res) => {
  try {
    const logoId = req.params.logoId;
    const deletedLogo = await Logo.findByIdAndDelete(logoId);

    if (!deletedLogo) {
      return res.status(404).json({ error: "Logo not found." });
    }
    res.status(200).json(deletedLogo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
