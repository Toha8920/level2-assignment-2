/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUsers = async () => {
  const result = await UserModel.aggregate([
    { $project: { username: 1, fullName: 1, age: 1, email: 1, address: 1 } },
  ]);
  return result;
};

const getSingleUser = async (userId: string) => {
  const result = await UserModel.findOne({ userId: userId });
  return result;
};

const getUpdateUser = async (userId: string, userData: User) => {
  const result = await UserModel.findOneAndUpdate({ userId }, userData, {
    new: true,
  });
  return result;
};

const updatedOrder = async (
  userId: string,
  userData: {
    productName: string;
    price: number;
    quantity: number;
  },
) => {
  const user = await UserModel.findOneAndUpdate(
    { userId },
    { $push: { orders: userData } },
    { new: true },
  );
  return user;
};

const deletedUser = async (userId: string) => {
  const result = await UserModel.deleteOne({ userId });
  return result;
};

export const userServices = {
  createUserIntoDB,
  getAllUsers,
  getSingleUser,
  deletedUser,
  getUpdateUser,
  updatedOrder,
};
