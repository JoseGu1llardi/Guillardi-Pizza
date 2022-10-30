import { useState, FormEvent } from 'react';

import Head from 'next/head';

import styles from './styles.module.scss';

import { Header } from '../../components/Header';

import { setupAPIClient } from '../../services/api';

import { canSSRAuth } from '../../utils/canSSRAuth';

import { toast } from 'react-toastify';

export default function Category() {
    const [name, setName] = useState('');

    async function handleRegister(e: FormEvent) {
        e.preventDefault();

        if (name === '') {
            return;
        }

        const apiClient = setupAPIClient();
        await apiClient.post('/category', {
            name
        })

        toast.success('Category registered successfully');
        setName('');
    }

    return (
        <>
            <Head>
                <title>New Category - Sujeito Pizzaria</title>
            </Head>
            <div>
                <Header />

                <main className={styles.container}>
                    <h1>Register new category</h1>

                    <form className={styles.form} onSubmit={handleRegister}>
                        <input type="text"
                            placeholder="Enter the name of the category"
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <button className={styles.buttonAdd} type="submit">Register</button>
                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {
    return {
        props: {}
    }
})