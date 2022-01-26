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

const SignInQuery = gql`
  mutation signin($input: SigninUserInput!) {
    signin(signinUserInput: $input) {
      user {
        username
      }
      access_token
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
