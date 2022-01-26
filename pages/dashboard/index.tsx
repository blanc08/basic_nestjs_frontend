import { useQuery } from '@apollo/client';
import type { NextPage } from 'next';
import Image from 'next/image';
import { cats } from '../../services/query';
import Modal from 'react-modal';
import { useState } from 'react';
import ReactModal from 'react-modal';
import Header from '../../components/organisms/Dashboard/Header';
import { toast } from 'react-toastify';
interface Cat {
  id: number;
  name: string;
  age: number;
  breed: string;
  user: {
    username: string;
  };
}

Modal.setAppElement('#__next');
const Dashboard: NextPage = () => {
  const { loading, error, data } = useQuery(cats);
  console.log(data);
  let subtitle: any;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  if (loading) return <p> Loading...</p>;
  if (error) return <p>Error :{error}</p>;

  return (
    <div className="md:pr-2 h-screen lg:scrollbar-thin scrollbar-thumb-brand-green scrollbar-track-gray-100 flex flex-col">
      <Header />
      <section className="sm:px-4 px-6 md:py-16 py-6 bg-brand-neutral-0 ">
        {/* show cat with card flex */}
        <div className="grid sm:grid-cols-4 md:gap-10 gap-4 md:mx-12 lg:mx-36">
          {data.cats.map((cat: Cat) => (
            <a
              onClick={openModal}
              key={cat.id}
              className="border-b bg-[url('/images/1.jpg')] bg-origin-border h-[380px] sm:h-[220px] xl:h-[280px] bg-center bg-no-repeat bg-cover bg-clip-border relative border-gray-200 shadow-lg origin-bottom-left hover:scale-110  transition-all hover:cursor-pointer"
            >
              <div className="py-2 px-4 overflow-hidden absolute bottom-0 bg-white w-full">
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

      {/* Modal */}
      <ReactModal
        isOpen={modalIsOpen}
        contentLabel="Inline Styles Modal Example"
        style={{
          content: {
            width: '500px',
            transform: 'translate(-50%, -50%)',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            padding: 0,
          },
        }}
      >
        <div
          id="image"
          className="relative bg-[url('/images/1.jpg')] h-[480px]"
        >
          <button
            className="absolute top-0 right-0 py-2 px-4 bg-brand-green m-2 text-brand-neutral-0 font-semibold"
            onClick={closeModal}
          >
            Close
          </button>
          <div id="desc" className="absolute bottom-0 bg-brand-white">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae
            architecto assumenda esse ipsa minima reiciendis quod? Architecto
            voluptas dolore voluptatem rem esse non ex fugit cupiditate, veniam
            officiis doloremque? Maiores, dolorum. Totam facere voluptatem sequi
            corporis nesciunt, expedita dolor labore odit quaerat, nulla ullam
            in animi corrupti omnis quae. Eligendi.
          </div>
        </div>
      </ReactModal>
      <footer className="relative bottom-0 mt-auto py-4 px-6">
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
