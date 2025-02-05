import React, { useState, useEffect } from 'react';
import './styles.css';

const TextEditor = () => {
    const [users, setUsers] = useState([]); // Store all users
    const [isListView, setIsListView] = useState(false);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const cookieData = JSON.parse(localStorage.getItem("Users")) || [];
        setUsers(cookieData);
    }, []);

    const handleBold = (e) => {
        e.preventDefault();
        document.querySelectorAll('.details-container').forEach(item => {
            item.classList.toggle('fw-bold');
        });
    };

    const handleUnderline = (e) => {
        e.preventDefault();
        document.querySelectorAll('.details-container').forEach(item => {
            item.classList.toggle('text-decoration-underline');
        });
    };

    const handleItalic = (e) => {
        e.preventDefault();
        document.querySelectorAll('.details-container').forEach(item => {
            item.classList.toggle('fst-italic');
        });
    };

    const handleList = (e) => {
        e.preventDefault();
        setIsListView(prev => !prev);
    };

    const handleChange = (index, field, value) => {
        const updatedUsers = [...users];
        updatedUsers[index][field] = value;
        setUsers(updatedUsers);
    };

    const handleSave = () => {
        localStorage.setItem("Users", JSON.stringify(users));
        setEditing(false);
    };

    return (
        <div className='container'>
            <div className='card w-100 mt-5'>
                <div className='w-100 toolbar bg-secondary rounded d-flex gap-3 p-2'>
                    <button className="btn btn-light tools fw-bold" onClick={handleBold}>B</button>
                    <button className="btn btn-light tools fw-bold" onClick={handleUnderline}>U</button>
                    <button className="btn btn-light tools fw-bold" onClick={handleItalic}><i>I</i></button>
                    <button className="btn btn-light tools fw-bold" onClick={handleList}>List</button>
                </div>
                <div className='editor bg-white rounded p-3'>
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <div key={index} className='details-container mb-3'>
                                {isListView ? (
                                    <ul>
                                        <li>
                                            <span>Name:</span>
                                            <span
                                                contentEditable={editing}
                                                onBlur={(e) => handleChange(index, "name", e.target.innerText)}
                                            >{user.name}</span>
                                        </li>
                                        <li>
                                            <span>Email:</span>
                                            <span
                                                contentEditable={editing}
                                                onBlur={(e) => handleChange(index, "email", e.target.innerText)}
                                            >{user.email}</span>
                                        </li>
                                        <li>
                                            <span>Address:</span>
                                            <span
                                                contentEditable={editing}
                                                onBlur={(e) => handleChange(index, "address", e.target.innerText)}
                                            >{user.address}</span>
                                        </li>
                                        <li>
                                            <span>Password:</span>
                                            <span
                                                contentEditable={editing}
                                                onBlur={(e) => handleChange(index, "password", e.target.innerText)}
                                            >{user.password}</span>
                                        </li>
                                    </ul>
                                ) : (
                                    <>
                                        <p>
                                            <span>Name:</span>
                                            <span
                                                contentEditable={editing}
                                                onBlur={(e) => handleChange(index, "name", e.target.innerText)}
                                            >{user.name}</span>
                                        </p>
                                        <p>
                                            <span>Email:</span>
                                            <span
                                                contentEditable={editing}
                                                onBlur={(e) => handleChange(index, "email", e.target.innerText)}
                                            >{user.email}</span>
                                        </p>
                                        <p>
                                            <span>Address:</span>
                                            <span
                                                contentEditable={editing}
                                                onBlur={(e) => handleChange(index, "address", e.target.innerText)}
                                            >{user.address}</span>
                                        </p>
                                        <p>
                                            <span>Password:</span>
                                            <span
                                                contentEditable={editing}
                                                onBlur={(e) => handleChange(index, "password", e.target.innerText)}
                                            >{user.password}</span>
                                        </p>
                                    </>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No users found.</p>
                    )}
                </div>
            </div>
            <button className='btn btn-primary mt-3 me-3' onClick={handleSave}>
                {/* {editing ? 'Save' : 'Edit'} */}
                Save
            </button>
            <button className='btn btn-secondary mt-3 ml-3' onClick={() => setEditing(prev => !prev)}>
                {editing ? 'Cancel' : 'Edit'}
            </button>
        </div>
    );
};

export default TextEditor;
