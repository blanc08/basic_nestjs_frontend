import { gql, useQuery } from '@apollo/client';
import type { NextPage } from 'next';
import Image from 'next/image';
import { toast } from 'react-toastify';

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

  if (loading) return <p> Loading...</p>;
  if (error) return <p>Error :{error}</p>;

  return (
    <div className="px-2 h-screen lg:scrollbar-thin scrollbar-thumb-brand-green scrollbar-track-gray-100 flex flex-col gap-4">
      <header className="text-gray-700 body-font border-b border-gray-200">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            href="#"
            target="_blank"
          >
            <Image src="/images/cat.svg" alt="" width={50} height={50} />
          </a>
          <span>Cat</span>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a href="#" className="mr-5 hover:text-gray-900">
              It&apos;s just a link
            </a>
          </nav>
          <button className="flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0">
            Button{' '}
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </header>
      <section className="px-4">
        {/* show cat with card flex */}
        <div className="block">
          {data.cats.map((cat: { id: number; name: string }) => (
            <div
              key={cat.id}
              className="flex flex-col border-b border-gray-200 p-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-gray-900 text-lg font-medium">
                  {cat.name}
                </h2>
                <button className="bg-gray-200 text-gray-900 font-medium py-1 px-3 rounded">
                  Edit
                </button>
              </div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="text-gray-700 body-font">
        <div className="container mx-auto flex px-5 py-24 flex-col md:flex-row items-center">
          <div className="flex flex-col mb-16 items-center text-center md:w-1/2 md:pr-16 md:items-start md:text-left md:mb-0 lg:flex-grow">
            <h1 className="title-font text-3xl mb-4 font-medium text-gray-900 sm:text-4xl">
              Before they sold out
              <br className="hidden lg:inline-block" />
              readymade by gluten
            </h1>
            <p className="mb-8 leading-relaxed">
              Copper mug try-hard pitchfork pour-over freegan heirloom neutra
              air plant cold-pressed tacos poke beard tote bag. Heirloom echo
              park mlkshk tote bag selvage hot chicken authentic tumeric
              truffaut hexagon try-hard chambray
            </p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-brand-green border-0 py-2 px-6 rounded text-lg focus:outline-none hover:bg-indigo-600">
                Button
              </button>
              <button className="ml-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-6 rounded text-lg focus:outline-none hover:bg-gray-300">
                Button
              </button>
            </div>
          </div>
          <div className="w-5/6 md:w-1/2 lg:w-full lg:max-w-lg">ini image</div>
        </div>
      </section>

      <footer>
        <a
          target="_blank"
          href="https://icons8.com/icon/121409/cat"
          rel="noreferrer"
        >
          Cat
        </a>{' '}
        icon by{' '}
        <a target="_blank" href="https://icons8.com" rel="noreferrer">
          Icons8
        </a>
      </footer>
    </div>
  );
};

export default Dashboard;
