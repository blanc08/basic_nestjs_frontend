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
