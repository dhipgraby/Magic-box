import React from 'react';
import styles from 'css/Loader.module.css';

const Loader = () => {
    return (
        <div className={styles.loader} >
            <p className='m-0'>Magic Box</p>
            <small className='mb-4'>Loading...</small>
            <div className={styles.spinner} ></div>
        </div>
    )
};

export default Loader;
