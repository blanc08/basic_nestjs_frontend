import {
  ApolloClient,
  createHttpLink,
  gql,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';
import type { NextPage } from 'next';

const test: NextPage = () => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = atob(Cookies.get('access_token')!);

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  console.log(client);
  client.query({
    query: gql`
      {
        users {
          username
        }
      }
    `,
  });

  return <main className="md:flex flex-row h-screen">etet</main>;
};

export default test;
