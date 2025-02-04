import React, { useEffect, useState } from 'react';
import './styles.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const UserForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        password: ''
    });

    // This stores validation errors and updates them when the user submits an invalid form.
    const [errors, setErrors] = useState({});

    // Tracks whether the form has unsaved changes to warn the user before leaving the page.
    const [isFormDirty, setIsFormDirty] = useState(false);

    // Handling Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setIsFormDirty(true);
    };

    // Warn Users Before Leaving
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (isFormDirty) {
                event.preventDefault();
                event.returnValue = "You have unsaved changes. Are you sure you want to leave?";
            }
        };

        // adding event listner
        window.addEventListener("beforeunload", handleBeforeUnload);

        // removing event listner
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [isFormDirty]);


    // Validating Form Inputs
    const validateForm = () => {
        let newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.address.trim()) newErrors.address = "Address is required";
        
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // generating user id by timestamp
    const generateUserId = () => `user_${Date.now()}`;

    const handleSubmit = (e) => {
        e.preventDefault();

        // if returns false then dont go ahead
        if (!validateForm()) return;

        const userId = generateUserId();
        const userData = { id: userId, ...formData };

        // storing users in an array
        const existingUsers = JSON.parse(localStorage.getItem("Users")) || [];
        existingUsers.push(userData);

        localStorage.setItem("Users", JSON.stringify(existingUsers));

        console.log("User Data Saved:", userData);
        setFormData({ name: '', email: '', address: '', password: '' });
        setIsFormDirty(false);
    };

    return (
        <div className='container'>
            <div className='card bg-light mt-5 p-4'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" name='name' value={formData.name} onChange={handleChange} />
                        {errors.name && <p className="text-danger">{errors.name}</p>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter Address" name='address' value={formData.address} onChange={handleChange} />
                        {errors.address && <p className="text-danger">{errors.address}</p>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" name='email' value={formData.email} onChange={handleChange} />
                        {errors.email && <p className="text-danger">{errors.email}</p>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" name='password' value={formData.password} onChange={handleChange} />
                        {errors.password && <p className="text-danger">{errors.password}</p>}
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default UserForm;
