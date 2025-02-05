import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { motion } from 'framer-motion';

import { ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"



createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 1.3}}
      >
        <App />
      </motion.div>
    </BrowserRouter>
    <ToastContainer/>
  </>
)
