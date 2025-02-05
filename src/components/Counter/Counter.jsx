import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './styles.css';

const Counter = () => {
    const [count, setCount] = useState(0);

    const handleDecrease = () => {
        setCount((prev) => Math.max(prev - 1, 0));
    };

    // const heightPercentage = `${(count / 100) * 100}%`;
    const heightPercentage = `${(count / 50) * 100}%`;


    return (
        <div className='container'>
            <div className='card bg-light mt-5 d-flex justify-content-center align-items-center p-4'>
                <div className='counterContainer d-flex justify-content-center align-items-end rounded my-3 border border-secondary overflow-hidden'>
                    <motion.div 
                        className='fillColor' 
                        animate={{ height: heightPercentage }}
                        initial={{ height: '0%' }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                    />
                    <h3 className='text-center position-absolute countElement'>Count: {count}</h3>
                </div>
                <div className='w-100 row'>
                    <div className='col-4 d-flex justify-content-center align-items-center'>
                        <button className='btn btn-warning' onClick={handleDecrease}>Decrease</button>
                    </div>
                    <div className='col-4 d-flex justify-content-center align-items-center'>
                        <button className='btn btn-dark' onClick={() => setCount(0)}>Reset</button>
                    </div>
                    <div className='col-4 d-flex justify-content-center align-items-center'>
                        <button className='btn btn-success' onClick={() => setCount((prev) => Math.min(prev + 1, 50))}>Increase</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Counter;
