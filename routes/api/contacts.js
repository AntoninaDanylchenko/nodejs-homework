const express = require("express");

const { contacts: ctrl } = require("../../controllers/index");

const {
  isValidId,
  validation,
  validationFavorite,
  ctrlWrapper,
  authMiddleware,
} = require("../../midlewares");

const { schemas } = require("../../models/index");

const validationMidleware = validation(schemas.addSchemaJoi);

const router = express.Router();

router.get("/", authMiddleware, ctrlWrapper(ctrl.getAll));

router.get(
  "/:contactId",
  authMiddleware,
  isValidId,
  ctrlWrapper(ctrl.getContactById)
);

router.post(
  "/",
  authMiddleware,
  validationMidleware,
  ctrlWrapper(ctrl.addContact)
);

router.put(
  "/:contactId",
  authMiddleware,
  isValidId,
  validationMidleware,
  ctrlWrapper(ctrl.updateContact)
);

router.delete(
  "/:contactId",
  authMiddleware,
  isValidId,
  ctrlWrapper(ctrl.removeContact)
);

router.patch(
  "/:contactId/favorite",
  authMiddleware,
  isValidId,
  validationFavorite(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
