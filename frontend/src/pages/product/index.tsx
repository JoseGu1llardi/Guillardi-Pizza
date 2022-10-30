import { useState, ChangeEvent } from 'react';

import Head from 'next/head';
import Image from 'next/image';

import { Header } from '../../components/Header';

import styles from './styles.module.scss';

import { canSSRAuth } from '../../utils/canSSRAuth';

import { FiUpload } from 'react-icons/fi';

export default function Product() {
    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);

    function handleFile(e: ChangeEvent<HTMLInputElement>) {

        if (!e.target.files) {
            return;
        }

        const image = e.target.files[0];

        if (!image) {
            return;
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]));
        }

    }

    return (
        <>
            <Head>
                <title>Create Product - Sujeito Pizza</title>
            </Head>
            <div>
                <Header />

                <main className={styles.container}>
                    <h1>New Product</h1>

                    <form className={styles.form}>

                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={30} color="#FFF" />
                            </span>

                            <input type="file" accept='image/png, image/jpeg' onChange={handleFile} />

                            {
                                avatarUrl && (
                                    <img
                                        className={styles.preview}
                                        src={avatarUrl}
                                        alt='Product photo'
                                        width={250}
                                        height={250}
                                    />
                                )
                            }

                        </label>

                        <select>
                            <option>Drinks</option>
                            <option>Pizzas</option>
                            <option>Desserts</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Enter the name of the product"
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="Enter the price of the product"
                            className={styles.input}
                        />

                        <textarea
                            placeholder='Describe your product...'
                            className={styles.input}
                        />

                        <button className={styles.buttonAdd}>
                            Register
                        </button>

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
});