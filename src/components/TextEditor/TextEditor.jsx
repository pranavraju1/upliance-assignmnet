import React, { useState, useEffect } from 'react';
import './styles.css';

const TextEditor = () => {
    const [userData, setUserData] = useState({
        id: "",
        name: "",
        email: "",
        address: "",
        password: ""
    });

    const [isListView, setIsListView] = useState(false); // New state to toggle list view
    const [editing, setEditing] = useState(false); // New state to toggle editing mode

    // Load cookie data from localStorage on initial render
    useEffect(() => {
        const cookieData = JSON.parse(localStorage.getItem("Users"));
        if (cookieData) {
            setUserData(cookieData[0]); // Assuming you have only one user in the cookie for now
        }
    }, []);

    const handleBold = (e) => {
        e.preventDefault();
        const detailsContainers = document.getElementsByClassName('details-container');
        Array.from(detailsContainers).forEach((item) => {
            item.classList.toggle('fw-bold');
        });
    };

    const handleUnderline = (e) => {
        e.preventDefault();
        const detailsContainers = document.getElementsByClassName('details-container');
        Array.from(detailsContainers).forEach((item) => {
            item.classList.toggle('text-decoration-underline');
        });
    };

    const handleItalic = (e) => {
        e.preventDefault();
        const detailsContainers = document.getElementsByClassName('details-container');
        Array.from(detailsContainers).forEach((item) => {
            item.classList.toggle('fst-italic');
        });
    };

    const handleList = (e) => {
        e.preventDefault();
        setIsListView((prev) => !prev); // Toggle list view state
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        localStorage.setItem("Users", JSON.stringify([userData]));
        setEditing(false); // Disable editing after saving
    };

    return (
        <div className='container'>
            <div className='card w-100 bg-light mt-5'>
                <div className='w-100 toolbar d-flex gap-3'>
                    <div className="tools fw-bold d-flex justify-content-center align-items-center rounded" onClick={handleBold}>B</div>
                    <div className="tools fw-bold d-flex justify-content-center align-items-center rounded" onClick={handleUnderline}>U</div>
                    <div className="tools fw-bold d-flex justify-content-center align-items-center rounded" onClick={handleItalic}><i>I</i></div>
                    <div className="tools fw-bold d-flex justify-content-center align-items-center rounded" onClick={handleList}>List</div>
                </div>
                <div className='editor bg-white rounded'>
                    {userData && (
                        <div className='details-container'>
                            {isListView ? (
                                <ul>
                                    <li>
                                        <span>Name:</span>
                                        <div
                                            contentEditable={editing}
                                            name="name"
                                            onInput={handleChange}
                                        >{userData.name}</div>
                                    </li>
                                    <li>
                                        <span>Email:</span>
                                        <div
                                            contentEditable={editing}
                                            name="email"
                                            onInput={handleChange}
                                        >{userData.email}</div>
                                    </li>
                                    <li>
                                        <span>Address:</span>
                                        <div
                                            contentEditable={editing}
                                            name="address"
                                            onInput={handleChange}
                                        >{userData.address}</div>
                                    </li>
                                    <li>
                                        <span>Password:</span>
                                        <div
                                            contentEditable={editing}
                                            name="password"
                                            onInput={handleChange}
                                        >{userData.password}</div>
                                    </li>
                                </ul>
                            ) : (
                                <>
                                    <p>
                                        <span>Name:</span>
                                        <div
                                            contentEditable={editing}
                                            name="name"
                                            onInput={handleChange}
                                        >{userData.name}</div>
                                    </p>
                                    <p>
                                        <span>Email:</span>
                                        <div
                                            contentEditable={editing}
                                            name="email"
                                            onInput={handleChange}
                                        >{userData.email}</div>
                                    </p>
                                    <p>
                                        <span>Address:</span>
                                        <div
                                            contentEditable={editing}
                                            name="address"
                                            onInput={handleChange}
                                        >{userData.address}</div>
                                    </p>
                                    <p>
                                        <span>Password:</span>
                                        <div
                                            contentEditable={editing}
                                            name="password"
                                            onInput={handleChange}
                                        >{userData.password}</div>
                                    </p>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <button
                className='btn btn-primary mt-3'
                onClick={handleSave}
            >
                {editing ? 'Save' : 'Edit'}
            </button>
            <button
                className='btn btn-secondary mt-3 ml-3'
                onClick={() => setEditing((prev) => !prev)}
            >
                {editing ? 'Cancel' : 'Edit'}
            </button>
        </div>
    );
};

export default TextEditor;
