import { gql, useQuery } from '@apollo/client';
import type { NextPage } from 'next';
import Image from 'next/image';
import { cats } from '../../services/query';

interface Cat {
  id: number;
  name: string;
  age: number;
  breed: string;
  user: {
    username: string;
  };
}

const Dashboard: NextPage = () => {
  const { loading, error, data } = useQuery(cats);
  console.log(data);

  if (loading) return <p> Loading...</p>;
  if (error) return <p>Error :{error}</p>;

  return (
    <div className="md:pr-2 h-screen lg:scrollbar-thin scrollbar-thumb-brand-green scrollbar-track-gray-100 flex flex-col">
      <header className="text-gray-700 body-font border-b border-gray-200">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            href="#"
            target="_blank"
          >
            <Image src="/images/cat.svg" alt="" width={50} height={50} />
          </a>
          <button className="md:ml-auto mr-2 flex items-center bg-brand-green border-0 py-1 px-3 focus:outline-none hover:bg-brand-neutral-1 hover:text-black text-brand-white transition duration-100 ease-in-out font-semibold text-sm uppercase mt-4 md:mt-0">
            Add cat
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
          <nav className="flex flex-wrap items-center text-base justify-center border-l-2 pl-4 ml-4">
            <a href="#" className="mr-5 hover:text-gray-900">
              Logout
            </a>
          </nav>
        </div>
      </header>
      <section className="sm:px-4 px-6 md:py-16 py-6 bg-brand-neutral-0">
        {/* show cat with card flex */}
        <div className="grid sm:grid-cols-4 md:gap-10 gap-4 md:mx-12 lg:mx-36">
          {data.cats.map((cat: Cat) => (
            <a
              key={cat.id}
              className="border-b bg-[url('/images/1.jpg')] bg-origin-border h-[380px] sm:h-[220px] xl:h-[280px] bg-center bg-no-repeat bg-cover bg-clip-border relative border-gray-200 shadow-lg origin-bottom-left hover:scale-110 hover:z-10  transition-all hover:cursor-pointer"
            >
              <div className="py-2 px-4 overflow-hidden absolute bottom-0 z-10 bg-white w-full">
                <div className="flex flex-col md:flex-row md:items-center">
                  <h2 className="text-gray-900 text-base font-medium first-letter:uppercase">
                    {cat.name}
                  </h2>
                </div>
                <div className="flex flex-row justify-center lg:gap-2 my-2">
                  <div className="p-2 relative text-center uppercase text-brand-neutral-2 text-[10px]">
                    <h6 className="text-brand-neutral-1 text-xs">Sex</h6>
                    <Image
                      src="/icons/mars-solid.svg"
                      alt="gender"
                      height={20}
                      width={20}
                    />
                  </div>
                  <div className="p-2 text-center text-xs">
                    <h6 className="text-brand-neutral-1 text-xs">Age</h6>
                    {cat.age}{' '}
                  </div>
                  <div className="p-2 text-center text-xs">
                    <h6 className="text-brand-neutral-1 text-xs">Breed</h6>
                    {cat.breed}
                  </div>
                </div>
              </div>
            </a>
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
