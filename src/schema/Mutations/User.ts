import { GraphQLInt, GraphQLString } from 'graphql';
import bcrypt from 'bcryptjs';
import { AppDataSource } from '../../db/connection';
import { User } from '../../db/entity/User.entity';
import { UserObject } from '../types/UserObject';

const userRepository = AppDataSource.getRepository(User);

export const CREATE_USER = {
  type: UserObject,
  args: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (_parent: any, args: any) => {
    const { name, email, password } = args;

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = await bcrypt.hash(password, 10);

    await userRepository.save(user);

    return { ...user };
  },
};

export const DELETE_USER = {
  type: UserObject,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: async (_parent: any, args: any) => {
    const { id } = args;

    const user = await userRepository.findOneBy({ id });

    if (!user) {
      throw new Error('User not found');
    }

    await userRepository.delete(id);

    return { ...user };
  },
};
