import { gql } from '@apollo/client';

export const cats = gql`
  {
    cats {
      id
      name
      age
      breed
      description
      user {
        username
      }
    }
  }
`;

export const usersQuery = gql`
  query {
    users {
      id
      username
      cats {
        name
        age
      }
    }
  }
`;

export const createCatQuery = gql`
  mutation createCat($input: CreateCatInput!) {
    createCat(input: $input) {
      name
      age
      breed
      description
    }
  }
`;

export const SignInQuery = gql`
  mutation signin($input: SigninUserInput!) {
    signin(signinUserInput: $input) {
      user {
        username
      }
      access_token
    }
  }
`;
