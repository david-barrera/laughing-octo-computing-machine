import { body } from 'express-validator';

export const createDeviceValidator = [
  body('name').isString().withMessage('Device name should be a string'),
  body('brand').isString().withMessage('Device brand should be a string')
];
