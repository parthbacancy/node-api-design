import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getUpdateById,
  getUpdates,
  updateUpdate,
} from "./handlers/update";

const router = Router();

// Product
router.get("/product", getProducts);
router.get("/product/:id", getProductById);
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  (req, res) => {}
);
router.delete("/product/:id", deleteProduct);

// Update
router.get("/update", getUpdates);
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status")
    .isIn(["IN_PROGRESS", "LIVE", "DEPRECATED", "ARCHIVED"])
    .optional(),
  body("version").optional(),
  updateUpdate
);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  createUpdate
);
router.get("/update/:id", getUpdateById);
router.delete("/update/:id", deleteUpdate);

// UpdatePoint
router.get("/updatepoint", (req, res) => {});
router.get("/updatepoint/:id", (req, res) => {});
router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString(),
  (req, res) => {}
);
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  (req, res) => {}
);
router.delete("/updatepoint/:id", (req, res) => {});

export default router;
