/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};

const getAllUsers = async () => {
  const result = await User.aggregate([
    { $project: { username: 1, fullName: 1, age: 1, email: 1, address: 1 } },
  ]);
  return result;
};

const getSingleUser = async (userId: string) => {
  const result = await User.findOne({ userId }).select('-password');
  return result;
};

const getUpdateUser = async (userId: string, userData: TUser) => {
  const result = await User.findOneAndUpdate({ userId }, userData, {
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
  const user = await User.findOneAndUpdate(
    { userId },
    { $push: { orders: userData } },
    { new: true },
  );
  return user;
};

const getAllUpdatedOrders = async (userId: string) => {
  const result = await User.aggregate([
    { $match: { userId: Number(userId) } },
    { $project: { orders: 1 } },
  ]);
  return result;
};

const getAllTotalPrice = async (userId: string) => {
  const result = await User.aggregate([
    { $match: { userId: Number(userId) } },
    {
      $project: {
        totalPrice: {
          $reduce: {
            input: '$orders',
            initialValue: 0,
            in: {
              $add: [
                '$$value',
                { $multiply: ['$$this.price', '$$this.quantity'] },
              ],
            },
          },
        },
      },
    },
  ]);
  return result;
};

const deletedUser = async (userId: string) => {
  const result = await User.deleteOne({ userId });
  return result;
};

export const userServices = {
  createUserIntoDB,
  getAllUsers,
  getSingleUser,
  deletedUser,
  getUpdateUser,
  updatedOrder,
  getAllUpdatedOrders,
  getAllTotalPrice,
};
