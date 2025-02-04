import React, { useState } from 'react'
import './styles.css'
const Counter = () => {
    const [count, setCount] = useState(0);
    const handleDecrease = () => {
        (count<1)? setCount(0):setCount(count - 1);
    }
  return (
    <div className='container'>
        <div className='card bg-light'>
            <h3 className='text-center'>Count:{count}</h3>
            <div className='w-100 row'>
                <div className='col-md-4 d-flex justify-content-center align-itmes-center'>
                    <button className='btn btn-warning' onClick={handleDecrease}>Decrease</button>
                </div>
                <div className='col-md-4 d-flex justify-content-center align-itmes-center'>
                    <button className='btn btn-dark' onClick={()=>setCount(0)}>Reset</button>
                </div>
                <div className='col-md-4 d-flex justify-content-center align-itmes-center'>
                    <button className='btn btn-success' onClick={()=>setCount(count+1)}>Increase</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Counter
