const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon.js");

//Yeni bir Kupon oluşturma(Create)
router.post("/", async (req, res) => {
  try {
    const { code } = req.body;
    const couponName = await Coupon.findOne({ code });
    //   const couponName = await Coupon.findOne({ code:newCoupon.code});
    const newCoupon = new Coupon(req.body);
    if (couponName) {
      return res.status(401).json("Bu kupon zaten var");
    }
    await newCoupon.save();
    res.status(201).json(newCoupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Tüm couponlary getirme (Read- All)
router.get("/", async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

//Belirli coupon id'ye göre getirme (Read- single - coupon Id)
router.get("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const coupon = await Coupon.findById(couponId);
    if (!coupon) {
      return res.status(404).json({ error: "Coupon not fount." });
    }
    res.status(200).json(coupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

//Belirli coupon getirme (Read- single - coupon code)
router.get("/code/:couponCode", async (req, res) => {
  try {
    const couponCode = req.params.couponCode;
    const coupon = await Coupon.findOne({ code: couponCode }); //Tablodaki herhangi bir özelligine göre arama
    if (!coupon) {
      return res.status(404).json({ error: "Coupon Code not fount." });
    }
    res.status(200).json(coupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

//Kupon güncelleme(Update)
router.put("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const updates = req.body;

    const existingCoupon = await Coupon.findById(couponId);

    if (!existingCoupon) {
      return res.status(404).json({ error: "Coupon not found." });
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, updates, {
      new: true,
    });
    console.log(updatedCoupon);
    res.status(200).json(updatedCoupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

//Kupon Silme(Delete)
router.delete("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const deletedCoupon = await Coupon.findByIdAndDelete(couponId);

    if (!deletedCoupon) {
      return res.status(404).json({ error: "Coupon not found." });
    }
    res.status(200).json(deletedCoupon);
    console.log(couponId);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
