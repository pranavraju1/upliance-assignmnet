import React, { useState, useEffect } from 'react';
import './styles.css';
import { Bounce, toast } from 'react-toastify';

const TextEditor = () => {
    const [users, setUsers] = useState([]);
    const [isListView, setIsListView] = useState(false);
    const [editing, setEditing] = useState(false);
    const [activeFormats, setActiveFormats] = useState({
        bold: false,
        underline: false,
        italic: false,
        list: false,
    });

    useEffect(() => {
        const cookieData = JSON.parse(localStorage.getItem("Users")) || [];
        setUsers(cookieData);
        console.log("cookieData: " + cookieData)
        if(cookieData.length === 0){
            toast.error('Enter your details in the user form to view them in the text editor.', {
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
        }
    }, []);

    useEffect(() => {
        if (editing && users.length>0) {
            toast.info('Click on info you want to edit', {
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
        }
    }, [editing]);

    const toggleFormat = (format) => {
        setActiveFormats(prev => ({ ...prev, [format]: !prev[format] }));
    };

    const handleBold = (e) => {
        e.preventDefault();
        document.querySelectorAll('.details-container').forEach(item => {
            item.classList.toggle('fw-bold');
        });
        toggleFormat("bold");
    };

    const handleUnderline = (e) => {
        e.preventDefault();
        document.querySelectorAll('.details-container').forEach(item => {
            item.classList.toggle('text-decoration-underline');
        });
        toggleFormat("underline");
    };

    const handleItalic = (e) => {
        e.preventDefault();
        document.querySelectorAll('.details-container').forEach(item => {
            item.classList.toggle('fst-italic');
        });
        toggleFormat("italic");
    };

    const handleList = (e) => {
        e.preventDefault();
        setIsListView(prev => !prev);
        toggleFormat("list");
    };

    const handleChange = (index, field, value) => {
        const updatedUsers = [...users];
        updatedUsers[index][field] = value;
        setUsers(updatedUsers);
    };

    const handleSave = () => {
        localStorage.setItem("Users", JSON.stringify(users));
        setEditing(false);
        toast.success('User Info Saved', {
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
    };

    return (
        <div className='container'>
            <div className='card w-100 mt-5'>
                <div className='toolbar mb-3 d-flex gap-3 p-2'>
                    <button
                        className={`btn tools fw-bold ${activeFormats.bold ? 'btn-secondary' : 'btn-light'}`}
                        onClick={handleBold}
                    >
                        B
                    </button>
                    <button
                        className={`btn tools fw-bold ${activeFormats.underline ? 'btn-secondary' : 'btn-light'}`}
                        onClick={handleUnderline}
                    >
                        U
                    </button>
                    <button
                        className={`btn tools fw-bold ${activeFormats.italic ? 'btn-secondary' : 'btn-light'}`}
                        onClick={handleItalic}
                    >
                        <i>I</i>
                    </button>
                    <button
                        className={`btn tools fw-bold ${activeFormats.list ? 'btn-secondary' : 'btn-light'}`}
                        onClick={handleList}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-list-ul" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="0.5">
                            <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                        </svg>
                    </button>
                </div>
                <div className='editor p-3'>
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <div key={index} className='details-container mb-3'>
                                {isListView ? (
                                    <ul>
                                        <li><span>Name:</span> <span className='ms-2 p-2' contentEditable={editing} onBlur={(e) => handleChange(index, "name", e.target.innerText)}>{user.name}</span></li>
                                        <li><span>Email:</span> <span className='ms-2 p-2' contentEditable={editing} onBlur={(e) => handleChange(index, "email", e.target.innerText)}>{user.email}</span></li>
                                        <li><span>Address:</span> <span className='ms-2 p-2' contentEditable={editing} onBlur={(e) => handleChange(index, "address", e.target.innerText)}>{user.address}</span></li>
                                        <li><span>Password:</span> <span className='ms-2 p-2' contentEditable={editing} onBlur={(e) => handleChange(index, "password", e.target.innerText)}>{user.password}</span></li>
                                    </ul>
                                ) : (
                                    <>
                                        <p><span>Name:</span> <span className='ms-2 p-2' contentEditable={editing} onBlur={(e) => handleChange(index, "name", e.target.innerText)}>{user.name}</span></p>
                                        <p><span>Email:</span> <span className='ms-2 p-2' contentEditable={editing} onBlur={(e) => handleChange(index, "email", e.target.innerText)}>{user.email}</span></p>
                                        <p><span>Address:</span> <span className='ms-2 p-2' contentEditable={editing} onBlur={(e) => handleChange(index, "address", e.target.innerText)}>{user.address}</span></p>
                                        <p><span>Password:</span> <span className='ms-2 p-2' contentEditable={editing} onBlur={(e) => handleChange(index, "password", e.target.innerText)}>{user.password}</span></p>
                                    </>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No users found.</p>
                    )}
                </div>
            </div>
            <button className='btn btn-primary mt-3 me-3 fw-semibold fs-5' onClick={handleSave}>Save</button>
            <button className='btn btn-secondary mt-3 ml-3 fw-semibold fs-5' onClick={() => setEditing(prev => !prev)}>{editing ? 'Cancel' : 'Edit'}</button>
        </div>
    );
};

export default TextEditor;
