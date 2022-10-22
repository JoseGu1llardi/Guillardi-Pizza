import { useState, useContext, FormEvent } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../../../styles/home.module.scss';

import logoImg from '../../../public/logo.svg';

import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

import { AuthContext, } from '../../contexts/AuthContext';

import { toast } from 'react-toastify';

export default function SignUp() {
    const { signUp } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    async function handleSignUp(event: FormEvent) {
        event.preventDefault();

        if (name === '' || email === '' || password === '') {
            toast.warning('Fill in all the fields!');

            return;
        }

        setLoading(true);

        let data = {
            name,
            email,
            password
        }

        await signUp(data);

        setLoading(false);

    }

    return (
        <>
            <Head>
                <title>Make your registration now</title>
            </Head>
            <div className={styles.containerCenter}>
                <Image src={logoImg} alt='Logo Pizzaria' />

                <div className={styles.login}>
                    <h1>Creating your account</h1>

                    <form onSubmit={handleSignUp}>

                        <Input
                            placeholder='Enter your name'
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <Input
                            placeholder='Enter your e-mail'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            placeholder='Enter your password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button
                            type='submit'
                            loading={loading}
                        >
                            Sign up
                        </Button>

                    </form>

                    <Link href='/'>
                        <a className={styles.text}>Already have a account? Sign up!</a>
                    </Link>

                </div>
            </div>
        </>
    )
}
