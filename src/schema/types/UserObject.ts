import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

export const UserObject = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});
