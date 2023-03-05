const express = require("express");

const { contacts: ctrl } = require("../../controllers/index");

const {
  isValidId,
  validation,
  validationFavorite,
  ctrlWrapper,
} = require("../../midlewares/index");
const { schemas } = require("../../models/index");

const validationMidleware = validation(schemas.addSchemaJoi);

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getContactById));

router.post("/", validationMidleware, ctrlWrapper(ctrl.addContact));

router.put(
  "/:contactId",
  isValidId,
  validationMidleware,
  ctrlWrapper(ctrl.updateContact)
);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeContact));

router.patch(
  "/:contactId/favorite",
  isValidId,
  validationFavorite(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
