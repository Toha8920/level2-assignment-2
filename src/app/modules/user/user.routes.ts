import express from 'express';
import { userController } from './user.controller';

const router = express.Router();
router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:userId', userController.getSingleUser);
router.put('/users/:userId', userController.getUpdateUser);
router.delete('/users/:userId', userController.deletedUser);
router.put('/users/:userId/orders', userController.updatedOrder);
router.get('/users/:userId/orders', userController.allUpdateOrders);
router.get(
  '/users/:userId/orders/total-price',
  userController.getAllTotalPrice,
);

export const StudentRoutes = router;
