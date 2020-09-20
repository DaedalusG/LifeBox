import React, { useState, useEffect } from 'react';
import { apiUrl } from '../config.js'
import InstructionsModal from './InstructionsModal'
import DrawLife from './DrawLife'
import Brain from '../images/brain-svgrepo-com.svg'
import Question from '../images/question.svg'

const MainPage = () => {
    const [user, setUser] = useState({})
    const [openInstructions, setInstructions] = useState(false)

    const logout = () => {
        localStorage.removeItem("auth_token")
        window.location.reload()
    }

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
    }, [])

    return (
        <>
            <div className={'navbar'}>
                <div className={'navbar_sub_container'}>
                    <img src={user.profile_pic} className={'navbar_profile_pic'} />
                    <div>{`Welcome: ${user.username}`}</div>
                </div>
                <img src={Brain} className={'info_link'} />
                <div className={'navbar_sub_container'}>
                    <img src={Question} onClick={() => setInstructions(true)} className={'info_link'} />
                    <button onClick={logout} className={'navbar_logout_button'}>Logout</button>
                </div>
            </div >
            <InstructionsModal openInstructions={openInstructions} closeInstructions={() => setInstructions(false)} />
            <DrawLife />
        </>
    )
}

export default MainPage