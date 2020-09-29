import React, { useState, useEffect } from 'react';
import { apiUrl } from '../config.js'
import InstructionsModal from './InstructionsModal'
import DrawLife from './DrawLife'
import Brain from '../images/brain-svgrepo-com.svg'
import Question from '../images/question.svg'
import Search from '../images/search.svg'

const HomePage = () => {
    const [user, setUser] = useState({})
    const [openInstructions, setInstructions] = useState(false)
    const [saving, setSaving] = useState(false)
    const [saveName, setSaveName] = useState('')
    const [searching, setSearching] = useState(false)
    const [searchName, setSearchName] = useState('')
    const [grid, setGrid] = useState(null)
    const [resolution, setResolution] = useState(50);
    const [loadGrid, setLoadGrid] = useState({ "name": undefined, "grid": null, "saved": false })

    const logout = () => {
        localStorage.removeItem("auth_token")
        window.location.reload()
    }

    //gets user from jwt token, on page load
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
                const user = await response.json();
                setUser(user);
            }
        }
        getCurrentUser();
    }, [])

    //function to save current grid as json
    const handleSave = async (e) => {
        e.preventDefault();
        if (saveName === null || saveName === '') {
            setSaving(false)
            return
        }

        const response = await fetch(`${apiUrl}/grids/save`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ user_id: user.id, name: saveName, grid: { grid: grid } })
        })
        setSaveName('Saved')
        setTimeout(() => {
            setSaving(false);
            setSaveName('')
        }, 2250)
        setLoadGrid({ "name": saveName, "grid": grid, "saved": true })
    }

    //function to handle search inputs
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchName === null || searchName === '') {
            setSearching(false)
            return
        }
        console.log('search')
        setTimeout(() => {
            setSearching(false);
            setSearchName('')
        }, 2250)
    }


    return (
        <>
            <div className={'navbar'}>
                <div className={'navbar_sub_container'}>
                    <img src={user.profile_pic} alt='profile_pic' className={'navbar_profile_pic'} />
                    <div>
                        <div className={'username'}>{`Welcome: ${user.username}`}</div>
                        <div className={'current_grid'}>
                            Current grid:
                            <span className={'grid_name'}>{`${loadGrid.name}`}</span>
                            {(loadGrid.name !== undefined) &&
                                <span className={'unload'} onClick={() => setLoadGrid({ "name": undefined, "grid": null, "saved": false })}>unload</span>
                            }
                        </div>
                    </div>
                </div>
                <div className={'navbar_sub_container'}>
                    <img src={Search} alt='search_icon' onClick={searching ? handleSearch : () => setSearching(true)} className={'info_link'} />
                    {searching && <input
                        className={'navbar_input'}
                        placeholder={'Search'}
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />}
                    <img src={Brain} alt='save_icon' onClick={saving ? handleSave : () => setSaving(true)} className={'info_link'} />
                    {saving && <input
                        className={'navbar_input'}
                        placeholder={'Save grid as'}
                        value={saveName}
                        onChange={(e) => setSaveName(e.target.value)}
                    />}
                    <img src={Question} alt='info_icon' onClick={() => setInstructions(true)} className={'info_link'} />
                    <button onClick={logout} className={'navbar_logout_button'}>Logout</button>
                </div>
            </div >
            <InstructionsModal
                openInstructions={openInstructions}
                closeInstructions={() => setInstructions(false)}
            />
            <DrawLife
                grid={grid}
                setGrid={setGrid}
                resolution={resolution}
                setResolution={setResolution}
                loadGrid={loadGrid}
                setLoadGrid={setLoadGrid}
            />
        </>
    )
}

export default HomePage