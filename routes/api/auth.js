const express = require("express");

const { auth: ctrl } = require("../../controllers");
const { userSchemaJoi } = require("../../models");

const {
  validation,
  authMiddleware,
  uploadMiddleware,
} = require("../../midlewares");

const validationMidleware = validation(userSchemaJoi.addUserSchemaJoi);

const router = express.Router();

router.post("/singup", validationMidleware, ctrl.singup);

router.post("/login", validationMidleware, ctrl.login);

router.post("/logout", authMiddleware, ctrl.logout);

router.get("/current", authMiddleware, ctrl.getCurrent);

router.patch(
  "/",
  authMiddleware,
  validation(userSchemaJoi.userSubscriptionSchemaJoi),
  ctrl.updateSubscription
);

router.patch(
  "/avatars",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  ctrl.updateAvatar
);
router.get("/verify/:verificationToken", ctrl.verificationEmail);

router.post(
  "./verify",
  validation(userSchemaJoi.userEmailVerificationSchemaJoi),
  ctrl.resendValidationEmail
);
module.exports = router;
