import React, { useState, useEffect } from 'react';
import { apiUrl } from '../config.js'

const MainPage = () => {
    const [user, setUser] = useState({})
    const [targetUser, setTargetUser] = useState(1);

    useEffect(() => {
        const getCurrentUser = async () => {
            const token = window.localStorage.getItem('auth_token')
            const response = await fetch(`${apiUrl}/users/token`, {
                method: "GET",
                mode: "cors",
                headers: { "Authorization": `Bearer ${token}` },
            })
            if (!response.ok) {
                console.log("this will never happen. you can quote me")
            } else {
                const json = await response.json();
                setUser(json);
            }
        }
        getCurrentUser();
    }, [targetUser])

    return (
        <div>Gee wiz a page</div>
    )
}

export default MainPage