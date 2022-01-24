import { gql, useQuery } from '@apollo/client';
import type { NextPage } from 'next';

const getCats = gql`
  {
    cats {
      id
      name
    }
  }
`;

const Dashboard: NextPage = () => {
  const { loading, error, data } = useQuery(getCats);

  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.cats.map(({ id, name }: { id: number; name: string }) => (
    <div key={id}>
      <p>{name}</p>
    </div>
  ));
};

export default Dashboard;
