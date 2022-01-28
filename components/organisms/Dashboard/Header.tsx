import Cookies from 'js-cookie';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import ReactModal from 'react-modal';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { createCatQuery } from '../../../services/query';
import { Cat } from '../../../services/interface';

interface DataType {
  name: string;
  userId: number;
  age: number;
  breed: string;
  description: string;
}

interface propsInterface {
  addHandler: (data: Cat) => void;
}
ReactModal.setAppElement('#__next');
export default function Header({ addHandler }: propsInterface) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [addCat, { error }] = useMutation(createCatQuery);
  const [allValues, setAllValues] = useState<DataType>({
    name: '',
    userId: 0,
    age: 0,
    breed: '',
    description: '',
  });

  if (error) {
    return <p>{`Submission error! ${error.message}`}</p>;
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const token = atob(Cookies.get('access_token')!);
    const { id }: { id: string } = jwtDecode(token);

    if (allValues.name === '') {
      return toast.error('Please enter name');
    } else if (allValues.age === 0) {
      return toast.error('Please enter age');
    } else if (allValues.breed === '') {
      return toast.error('Please enter breed');
    } else if (allValues.description === '') {
      return toast.error('Please enter description');
    }

    const response = await addCat({
      variables: {
        input: {
          userId: id,
          name: allValues.name,
          age: Number(allValues.age),
          breed: allValues.breed,
          description: allValues.description,
        },
      },
    });

    if (response.data.createCat) {
      addHandler(response.data.createCat);
      toast.success('Cat added successfully');
      console.log(response.data.createCat);

      setIsOpen(false);
    }
  }

  const changeHandler = (e: { target: { name: any; value: any } }) => {
    setAllValues((prevValues) => {
      return { ...prevValues, [e.target.name]: e.target.value };
    });
  };

  return (
    <header className="body-font border-b border-gray-200 shadow-sm">
      <div className="container mx-auto flex flex-wrap p-1.5 flex-col md:flex-row items-center">
        <a
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          href="#"
          target="_blank"
        >
          <Image src="/images/cat.svg" alt="" width={50} height={50} />
        </a>
        <button
          onClick={openModal}
          className="md:ml-auto mr-2 flex items-center bg-brand-green border-0 py-1 px-3 focus:outline-none hover:bg-brand-neutral-1 hover:text-black text-brand-white transition duration-100 ease-in-out font-semibold text-sm uppercase mt-4 md:mt-0"
        >
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
        <div className="py-4 px-2 flex flex-row justify-between">
          <h2 className="uppercase font-semibold bg-brand-green text-brand-white pt-1.5 pl-2 pr-3 text-lg border-0 border-l-4 border-black">
            New cat
          </h2>
          <button
            className="py-2 px-4 bg-brand-green text-brand-neutral-0 font-semibold"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <form method="post" onSubmit={save}>
            <div className="grid grid-cols-2 gap-4">
              <input
                className="border-0 border-b-2 border-b-brand-green px-2 py-2"
                type="text"
                placeholder="Name"
                name="name"
                value={allValues.name}
                onChange={changeHandler}
              />
              <input
                className="border-0 border-b-2 border-b-brand-green px-2 py-2"
                type="number"
                name="age"
                placeholder="Age"
                value={allValues.age}
                onChange={changeHandler}
              />
              <input
                className="border-0 border-b-2 border-b-brand-green px-2 py-2"
                type="text"
                name="breed"
                placeholder="Breed"
                value={allValues.breed}
                onChange={changeHandler}
              />
              <input
                className="border-0 border-b-2 border-b-brand-green px-2 py-2"
                type="text"
                name="description"
                placeholder="Description"
                value={allValues.description}
                onChange={changeHandler}
              />
            </div>

            <footer className="w-full">
              <button
                className="bg-brand-green py-2 px-6 m-2 float-right text-brand-white border-0"
                type="submit"
              >
                Add
              </button>
            </footer>
          </form>
        </div>
      </ReactModal>
    </header>
  );
}
