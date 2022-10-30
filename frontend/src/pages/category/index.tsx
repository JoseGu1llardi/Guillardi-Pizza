import Head from 'next/head';

import styles from './styles.module.scss';

import { Header } from '../../components/Header';

export default function Category() {
    return (
        <>
            <Head>
                <title>New Category - Sujeito Pizzaria</title>
            </Head>
            <div>
                <Header />

                <main className={styles.container}>
                    <h1>Register new category</h1>

                    <form className={styles.form}>
                        <input type="text" 
                        placeholder="Enter the name of the category"
                        className={styles.input}
                        />

                        <button className={styles.buttonAdd} type="submit">Register</button>
                    </form>
                </main>
            </div>
        </>
    )
}