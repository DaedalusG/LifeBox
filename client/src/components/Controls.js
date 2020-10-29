import React, { useState, useEffect } from 'react';
import { apiUrl } from '../config.js'
import InstructionsModal from './InstructionsModal'
import CommentsModal from './CommentsModal'
import DrawLife from './DrawLife'
import Brain from '../images/brain-svgrepo-com.svg'
import Question from '../images/question.svg'
import Search from '../images/search.svg'
import Comment from '../images/comment.svg'

const Controls = () => {

    const [user, setUser] = useState({})
    const [openInstructions, setInstructions] = useState(false)
    const [saving, setSaving] = useState(false)
    const [saveName, setSaveName] = useState('')
    const [searching, setSearching] = useState(false)
    const [searchName, setSearchName] = useState('')
    const [searchResult, setSearchResult] = useState(null)

    const [init, setInit] = useState(false)
    const [grid, setGrid] = useState([])
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

    useEffect(() => {
        searchUpdate()
    }, [searchName])

    //function to save current grid as json
    const handleSave = async (e) => {
        e.preventDefault();
        if (saveName === '') {
            setSaving(false)
            return
        }
        const token = window.localStorage.getItem('auth_token')
        let res_json = await fetch(`${apiUrl}/grids/save`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ user_id: user.id, name: saveName, grid: { grid: grid } })
        })

        let res = await res_json.json()

        if (res.error) {
            setSaveName(res.error)
            setTimeout(() => {
                setSaving(false);
                setSaveName('')
            }, 2250)
        }

        if (res_json.ok) {
            setSaveName('Saved')
            setTimeout(() => {
                setSaving(false);
                setSaveName('')
            }, 2250)
            setLoadGrid({ "name": saveName, "grid": grid, "saved": true })
        }
    }

    //function to handle search inputs
    const searchUpdate = async () => {

        const token = window.localStorage.getItem('auth_token')
        const response = await fetch(`${apiUrl}/grids/load`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: searchName
            })
        })

        const res = await response.json()
        if (res.grids !== []) {
            setSearchResult(res.grids)
        }
    }

    const closeSearch = () => {
        setSearchName('')
        setSearching(false)
    }

    const searchSelect = (grid) => {
        setLoadGrid(
            {
                "name": grid.name,
                "owner": grid.user_id,
                "grid": grid.grid_json.grid,
                "saved": true
            }
        )
        setSearching(false)
        setSearchName('')
        setSearchResult([])
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
                                <span className={'unload'} onClick={() => setLoadGrid({ "name": '', "grid": [], "saved": false })}>unload</span>
                            }
                        </div>
                    </div>
                </div>
                <div className={'navbar_sub_container'}>
                    <img src={Search} alt='search_icon' onClick={searching ? closeSearch : () => setSearching(true)} className={'info_link'} />
                    <div className={'navbar_sub_container_column'}>
                        {searching &&
                            <input
                                className={'navbar_search_input'}
                                placeholder={'Search'}
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                            />
                        }
                        {(searchName !== '') &&
                            <div className={'search_result_container'}>
                                {searchResult.map((grid) => {
                                    return (
                                        <div onClick={() => searchSelect(grid)} key={grid.id} className={'search_result'}>
                                            grid: <span>{grid.name}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    </div>
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
            <CommentsModal
                loadGrid={loadGrid}
            />
            <DrawLife
                init={init}
                setInit={setInit}
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

export default Controls