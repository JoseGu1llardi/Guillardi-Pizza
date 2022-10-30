import { canSSRAuth } from '../../utils/canSSRAuth';

import Head from 'next/head';

import { Header } from '../../components/Header';

export default function Dashboard() {
    return (
        <>
            <Head>
                <title>Panel - Sujeito Pizzaria</title>
            </Head>
            <div>
                <Header />
                <h1>Panel</h1>
            </div>
        </>
    )
};

export const getServerSideProps = canSSRAuth(async (context) => {
    return {
        props: {}
    }
});