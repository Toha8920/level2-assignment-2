/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { userServices } from './user.service';
import userJoiSchema from './user.joi.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    const { error, value } = userJoiSchema.validate(userData);

    const result = await userServices.createUserIntoDB(value);

    if (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Something went wrong',
        error: error,
      });
    }
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const data = await userServices.getSingleUser(userId);
    if (data) {
      res.status(200).json({
        success: true,
        message: 'Users fetched successfully!',
        data: data,
      });
    } else {
      res.json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

const deletedUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const result = await userServices.deletedUser(userId);
    console.log(result);

    if (result.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: result,
      });
    } else {
      res.json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

const getUpdateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    console.log(userData);
    const userId = req.params.userId;
    const result = await userServices.getUpdateUser(userId, userData);
    if (result) {
      res.status(200).json({
        status: 'success',
        message: 'User updated successfully',
        data: result,
      });
    } else {
      res.status(500).json({
        status: 'fail',
        message: "Can't find user information",
      });
    }
  } catch (error: any) {
    console.log({ error });
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
};

const updatedOrder = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const body = req.body.orders;

  const result = await userServices.updatedOrder(userId, body);
  console.log(result);
  if (result) {
    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: result,
    });
  } else {
    res.json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  deletedUser,
  getUpdateUser,
  updatedOrder,
};
