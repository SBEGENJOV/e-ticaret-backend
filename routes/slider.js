const express = require("express");
const router = express.Router();
const Slider = require("../models/Slider.js");
//Yeni bir Slider oluşturma(Create)
router.post("/", async (req, res) => {
  try {
    const newSlider = new Slider(req.body);
    await newSlider.save();
    res.status(201).json(newSlider);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});
//Slider aktifleri getirme
router.get("/getActive", async (req, res) => {
  try {
    const slider = await Slider.find({ isActive: true });
    res.status(200).json(slider);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});
// Tüm Sliderleri getirme (Read- All)

router.get("/", async (req, res) => {
  try {
    const slider = await Slider.find();
    res.status(200).json(slider);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});
//Belirli Slideri getirme (Read- single)
router.get("/:sliderId", async (req, res) => {
  try {
    const sliderId = req.params.sliderId;
    try {
      const slider = await Slider.findById(sliderId);
      res.status(200).json(slider);
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: "Category not fount." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});
//Slideri güncelleme(Update)
router.put("/:sliderId", async (req, res) => {
  try {
    const sliderId = req.params.sliderId;
    const updates = req.body;

    const existingSlider = await Slider.findById(sliderId);

    if (!existingSlider) {
      return res.status(404).json({ error: "Category not found." });
    }

    const updatedSlider = await Slider.findByIdAndUpdate(sliderId, updates, {
      new: true,
    });
    console.log(updatedSlider);
    res.status(200).json(updatedSlider);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});
//Slideri Silme(Delete)
router.delete("/:sliderId", async (req, res) => {
  try {
    const sliderId = req.params.sliderId;
    const deletedSlider = await Slider.findByIdAndDelete(sliderId);

    if (!deletedSlider) {
      return res.status(404).json({ error: "Category not found." });
    }
    res.status(200).json(deletedSlider);
    console.log(sliderId);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});
router.put("/active/:sliderId", async (req, res) => {
  try {
    const sliderId = req.params.sliderId;

    const existingSlider = await Slider.findById(sliderId);

    if (!existingSlider) {
      return res.status(404).json({ error: "Category not found." });
    }

    const updatedSlider = await Slider.findOne({ _id: sliderId });
    updatedSlider.isActive = !updatedSlider.isActive;
    await updatedSlider.save();
    console.log(updatedSlider);
    res.status(200).json(updatedSlider);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
