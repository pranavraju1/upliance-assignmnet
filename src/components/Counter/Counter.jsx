import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './styles.css';
import { Bounce, toast } from 'react-toastify';

const Counter = () => {
    const [count, setCount] = useState(0);
    const increaseIntervalRef = useRef(null);
    const decreaseIntervalRef = useRef(null);



    useEffect(()=>{
        toast.info('Click and hold the increase button to rapidly increase the counter.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });

    },[])







    const startIncreasing = () => {
        if (increaseIntervalRef.current) return; // Prevent multiple intervals
        increaseIntervalRef.current = setInterval(() => {
            setCount((prev) => Math.min(prev + 1, 100));
        }, 100);
    };

    const stopIncreasing = () => {
        clearInterval(increaseIntervalRef.current);
        increaseIntervalRef.current = null;
    };

    const startDecreasing = () => {
        if (decreaseIntervalRef.current) return; // Prevent multiple intervals
        decreaseIntervalRef.current = setInterval(() => {
            setCount((prev) => Math.max(prev - 1, 0));
        }, 100);
    };

    const stopDecreasing = () => {
        clearInterval(decreaseIntervalRef.current);
        decreaseIntervalRef.current = null;
    };

    const heightPercentage = `${(count / 100) * 100}%`;

    return (
        <div className='container'>
            <div className='card counterMainContainer mt-5 d-flex justify-content-center align-items-center p-4'>
                <motion.div 
                    className='fillColor' 
                    animate={{ height: heightPercentage }}
                    initial={{ height: '0%' }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
                <div className='counterContainer d-flex justify-content-center align-items-end rounded my-3 overflow-hidden'>
                    <h1 className='text-center position-absolute countElement'>{count} <span className='fs-5'>g</span></h1>
                </div>
                <div className='w-100 row'>
                    <div className='col-4 d-flex justify-content-end align-items-center'>
                        <button 
                            className='btn btn-danger fw-semibold fs-4 text-white' 
                            onMouseDown={startDecreasing} 
                            onMouseUp={stopDecreasing} 
                            onMouseLeave={stopDecreasing} 
                            onTouchStart={startDecreasing} 
                            onTouchEnd={stopDecreasing}
                        >
                            Decrease
                        </button>
                    </div>
                    <div className='col-4 d-flex justify-content-center align-items-center'>
                        <button className='btn btn-dark fw-semibold fs-4' onClick={() => setCount(0)}>Reset</button>
                    </div>
                    <div className='col-4 d-flex justify-content-start align-items-center'>
                        <button 
                            className='btn btn-success fw-semibold fs-4' 
                            onMouseDown={startIncreasing} 
                            onMouseUp={stopIncreasing} 
                            onMouseLeave={stopIncreasing} 
                            onTouchStart={startIncreasing} 
                            onTouchEnd={stopIncreasing}
                        >
                            Increase
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Counter;
