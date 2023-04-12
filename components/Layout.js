import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function Layout({ children }) {

    return (
        <>
            <Head>
                <title>Magic Box </title>
                <meta name="description" content="Margic box - Have fun toggling Cells!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className='container mainContainer'>
                <ToastContainer />
                <div>
                    {children}
                </div>
            </div>
        </>

    )
}