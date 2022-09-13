import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { CREATE_USER, DELETE_USER } from './Mutations/User';
import { GREETING } from './Queries/Greeting';
import { GET_UNIQUE_USER, GET_USERS } from './Queries/User';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    greeting: GREETING,
    getAllUsers: GET_USERS,
    getUniqueUser: GET_UNIQUE_USER,
  },
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    createUser: CREATE_USER,
    deleteUser: DELETE_USER,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
