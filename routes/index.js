const express = require("express");
const router = express.Router();
const storage = require("../utils/fileUpload.js");
const multer = require("multer");
const upload = multer({ storage });
//! Diger rota dosyalarını içe aktarıyoruz.

const productRouter = require("./products.js");
const categoriRouter = require("./categories.js");
const authRouter = require("./auth.js");
const couponRouter = require("./coupon.js");
const userRouter = require("./users.js");
const paymentRoute = require("./payment.js");
const logoRoute = require("./logos.js");
const blogRoute = require("./blog.js");
const contactRoute = require("./contact.js");
const sliderRoute = require("./slider.js");

//Her rotayı ilgili yol altında kullanıyoruz.
router.use("/categories", categoriRouter);
router.use("/products", productRouter);
router.use("/auth", authRouter);
router.use("/coupons", couponRouter);
router.use("/users", userRouter);
router.use("/payment", paymentRoute);
router.use("/logo", upload.single("File"), logoRoute);
router.use("/blog", blogRoute);
router.use("/contact", contactRoute);
router.use("/slider", sliderRoute);

module.exports = router;
