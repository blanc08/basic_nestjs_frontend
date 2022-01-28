import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useMutation } from '@apollo/client';
import { SignInQuery } from '../../../services/query';

export default function SignInForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [setSignin] = useMutation(SignInQuery);

  const router = useRouter();

  const signin = async () => {
    if (!username || !password) {
      toast.error('Email and password are required');
    } else {
      const result = await setSignin({
        variables: { input: { username, password } },
      });
      if (result.data) {
        console.log(result.data);
        toast.success('Login berhasil!');
        const { access_token } = result.data.signin;
        const tokenBase64 = btoa(access_token);
        Cookies.set('access_token', tokenBase64, { expires: 1 });
        router.push('/dashboard');
      }
    }
  };
  return (
    <section className="md:w-5/12">
      <div className="lg:p-16 p-8 h-full flex flex-col align-middle">
        <div className="flex flex-col items-center my-auto xl:px-12">
          <label className="block">
            <span className="text-sm font-bold">Username</span>
            <input
              className="w-full p-2 border-2 border-brand-neutral-0 mb-3"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="text-sm font-bold">Password</span>
            <input
              className="w-full p-2 border-2 border-brand-neutral-0 mb-3"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            className="w-full p-2 max-w-[280px] bg-brand-green text-white font-bold my-3 uppercase"
            onClick={signin}
          >
            Sign in
          </button>
        </div>
      </div>
    </section>
  );
}
