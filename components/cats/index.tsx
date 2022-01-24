export default function Cats(query) {
  const { loading, error, data } = useQuery(query);

  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.cats.map(({ id, name }: { id: number; name: string }) => (
    <div key={id}>
      <p>{name}</p>
    </div>
  ));
}
