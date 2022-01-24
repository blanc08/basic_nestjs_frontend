import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import client from '../config/api/apollo-client';

export const setSignin = async (user: {}) => {
  // fetch data from server
  const { data } = await client.mutate({
    mutation: gql`
      {
        signin(signinUserInput: { username: "admin", password: "password" }) {
          user {
            username
          }
          access_token
        }
      }
    `,
  });

  console.log(data);

  return data;
};
