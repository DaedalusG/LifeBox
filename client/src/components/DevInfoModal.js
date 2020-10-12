import React from 'react'
import ReactDom from 'react-dom'
import Close from '../images/close.js'
import GitHub from "../images/GitHub-small.png"

const DevInfoModal = ({ openDevInfo, closeDevInfo }) => {
    if (!openDevInfo) return null

    return ReactDom.createPortal(
        <div className={"devinfomodal"}>
            <div className={'devinfo_sub_column'}>
                <div className={'top_banner'} />
                <div className={'devinfo_close_container'} onClick={closeDevInfo}>
                    <span className="devinfo_title">About LifeBox</span>
                    <Close />
                </div>
                <div className={'devinfo_border'} />
                <div className="devinfo_text">
                    <p>
                        LifeBox is a social platform for students to explore complexity in mathematics via the popular cellular automata Conway's Game of Life.
                    </p>
                    <p>
                        Conways Game of Life isn't a game in the conventional sesne.
                        There is no end goal. Game Of Life is more of a fiddle or canvas.
                        It's basic appearance and behavior illustrates the emergence of complex behavior from a simple set of rules.
                        LifeBox hopes to, by this simple illustration, encourage thinking about the nature of systems,
                        and the broader rules of nature and their conncetion to mathematical principles.
                    </p>
                    <p>
                        LifeBox is a labor of love, please check back new features are being developed.
                    </p>
                </div>
                <div className={'devinfo_border'} />
            </div>
            <div className={'devinfo_links'}>
                <a className={'devinfo_link'} href="https://github.com/DaedalusG/LifeBox">
                    <img className={'devinfo_icon'} alt={"github_icon"} src={GitHub} />
                </a>
                <a className={'devinfo_link'} href="https://www.linkedin.com/in/warren-gifford-b1141a1b4/">
                    <img className={'devinfo_icon'} alt={"linkedIn_icon"} src="https://img.icons8.com/fluent/48/000000/linkedin.png" />
                </a>
                <a className={'devinfo_link'} href="https://angel.co/u/warren-gifford">
                    <img className={'devinfo_icon'} alt={"angelList_icon"} src="https://img.icons8.com/color/48/000000/angelist.png" />
                </a>
            </div>
            <div className={'bottom_banner'} />
        </div >,
        document.getElementById('devinfomodal')
    )
}

export default DevInfoModal