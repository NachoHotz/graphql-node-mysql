import { GraphQLInt, GraphQLList } from 'graphql';
import { AppDataSource } from '../../db/connection';
import { User } from '../../db/entity/User.entity';
import { UserObject } from '../types/UserObject';

const userRepository = AppDataSource.getRepository(User);

export const GET_USERS = {
  type: new GraphQLList(UserObject),
  resolve: async () => {
    const users = await userRepository.find();

    if (!users || users.length === 0) {
      throw new Error('No users found');
    }

    return users;
  },
};

export const GET_UNIQUE_USER = {
  type: UserObject,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: async (_parent: any, args: any) => {
    const { id } = args;

    if (typeof id !== 'number') {
      throw new Error('Invalid id');
    }

    const uniqueUser = await userRepository.findOneBy({ id });

    if (!uniqueUser) {
      throw new Error('No user found');
    }

    return { ...uniqueUser };
  },
};
