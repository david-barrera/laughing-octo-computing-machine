import { body, param } from 'express-validator';

export const createDeviceValidator = [
  body('name').isString().withMessage('Device name should be a string'),
  body('brand').isString().withMessage('Device brand should be a string')
];

export const getDeviceValidator = [
  param('id').isUUID().withMessage('Device id should be a UUID')
];
