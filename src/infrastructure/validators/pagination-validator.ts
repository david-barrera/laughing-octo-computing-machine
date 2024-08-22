import { query } from "express-validator";

export const paginationInputValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page should be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit should be a positive integer"),
];
