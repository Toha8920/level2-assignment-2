/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: [string, string];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: [
    {
      productName: string;
      price: number;
      quantity: number;
    },
  ];
};

export interface UserModel extends Model<TUser> {
  isUserExists(id: string): Promise<TUser | null>;
}
