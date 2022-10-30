import { useState, ChangeEvent, FormEvent } from 'react';

import Head from 'next/head';
import Image from 'next/future/image';

import { Header } from '../../components/Header';

import styles from './styles.module.scss';

import { canSSRAuth } from '../../utils/canSSRAuth';

import { setupAPIClient } from '../../services/api';

import { FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';

type ItemProps = {
    id: string;
    name: string;
}

interface CategoryProps {
    category_list: ItemProps[];
}

export default function Product({ category_list }: CategoryProps) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);

    const [categories, setCategories] = useState(category_list || []);
    const [categorySelected, setCategorySelected] = useState(0);

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

    function handleChangeCategory(e) {
        setCategorySelected(e.target.value)
    }

    async function handleRegister(e: FormEvent) {
        e.preventDefault();

        try {
            const data = new FormData();

            if (name === '' || price === '' || description === '' || imageAvatar === null) {
                toast.error('Fill in all the fields!')
                return;
            }

            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('category_id', categories[categorySelected].id);
            data.append('file', imageAvatar);

            const apiClient = setupAPIClient();

            await apiClient.post('/product', data);

            toast.success('Product registered with success!');

        } catch (err) {
            console.log(err);
            toast.error('Ops, error when registering...');
        }

        setName('');
        setPrice('');
        setDescription('');
        setImageAvatar(null);

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

                    <form className={styles.form} onSubmit={handleRegister}>

                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={30} color="#FFF" />
                            </span>

                            <input type="file" accept='image/png, image/jpeg' onChange={handleFile} />

                            {
                                avatarUrl && (
                                    <Image
                                        className={styles.preview}
                                        src={avatarUrl}
                                        alt='Product photo'
                                        width={250}
                                        height={250}
                                    />
                                )
                            }

                        </label>

                        <select value={categorySelected} onChange={handleChangeCategory}>
                            {
                                categories.map((category, index) => {
                                    return (
                                        <option key={category.id} value={index}>
                                            {category.name}
                                        </option>
                                    )
                                })
                            }
                        </select>

                        <input
                            type="text"
                            placeholder="Enter the name of the product"
                            className={styles.input}
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Enter the price of the product"
                            className={styles.input}
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />

                        <textarea
                            placeholder='Describe your product...'
                            className={styles.input}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />

                        <button className={styles.buttonAdd} type="submit">
                            Register
                        </button>

                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {
    const apiClient = setupAPIClient(context);

    const response = await apiClient.get('/category');

    return {
        props: {
            category_list: response.data
        }
    }
});