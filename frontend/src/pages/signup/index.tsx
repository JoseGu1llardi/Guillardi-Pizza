import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../../../styles/home.module.scss';

import logoImg from '../../../public/logo.svg';

import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export default function SignUp() {
    return (
        <>
            <Head>
                <title>Make your registration now</title>
            </Head>
            <div className={styles.containerCenter}>
                <Image src={logoImg} alt='Logo Pizzaria' />

                <div className={styles.login}>
                    <h1>Creating your account</h1>

                    <form>

                        <Input
                            placeholder='Enter your name'
                            type='password'
                        />

                        <Input
                            placeholder='Enter your e-mail'
                            type='text'
                        />

                        <Input
                            placeholder='Enter your password'
                            type='password'
                        />

                        <Button
                            type='submit'
                            loading={ false }
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
