import { useContext, FormEvent, useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../../styles/home.module.scss';

import logoImg from '../../public/logo.svg';

import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

import { AuthContext } from '../contexts/AuthContext';

import { toast } from 'react-toastify';

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email === '' || password === '') {
      toast.warning('Fill in all the fields!');

      return;

    }

    setLoading(true);

    let data = {
      email,
      password
    }

    await signIn(data);

    setLoading(false);

  }

  return (
    <>
      <Head>
        <title>Guillardi Pizza - Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt='Logo Pizzaria' />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>

            <Input
              placeholder='Enter your e-mail'
              type='text'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <Input
              placeholder='Enter your password'
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <Button
              type='submit'
              loading={loading}
            >
              Login
            </Button>

          </form>

          <Link href='/signup'>
            <a className={styles.text}>Do not have a account? Sign up!</a>
          </Link>

        </div>
      </div>
    </>
  )
}
