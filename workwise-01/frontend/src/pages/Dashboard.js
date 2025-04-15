// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../services/api';

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await getUserProfile(1); // Assuming user ID 1 for testing
                setUser(profile);
            } catch (err) {
                console.error('Error fetching profile');
            }
        };
        fetchProfile();
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <h2>Welcome, {user.username}</h2>
            <p>Email: {user.email}</p>
            <p>First Name: {user.first_name}</p>
            <p>Last Name: {user.last_name}</p>
        </div>
    );
};

export default Dashboard;
