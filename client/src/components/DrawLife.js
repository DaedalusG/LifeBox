import React, { useEffect, useState, useRef, useMemo } from 'react'
import Draggable from 'react-draggable';

const DrawLife = () => {

    const canvasRef = useRef(null);
    const ctx = useRef(null)

    //sets up a state containing information about the current grids array and values, 
    const [resolution, setResolution] = useState(50);
    const [genCount, setGenCount] = useState(0)
    const [genFreq, setGenFreq] = useState(500)
    const [grid, setGrid] = useState(null)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const cols = useMemo(() => Math.ceil(width / resolution), [width, resolution])
    const rows = useMemo(() => Math.ceil(height / resolution), [height, resolution])
    const colWidth = useMemo(() => Math.ceil(width / cols), [width, resolution])
    const rowHeight = useMemo(() => Math.ceil(height / rows), [height, resolution])
    const [init, setInit] = useState(false)
    const [generate, setGenerate] = useState(false)

    //------------------------useEffects--------------------------

    // initializes the grid
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.current = canvas.getContext('2d')
        let newGrid = buildGrid()
        ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        setGrid(newGrid)
        setInit(true)
    }, [])

    //generates new grid when grid resolution is set
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.current = canvas.getContext('2d')
        let newGrid = buildGrid()
        ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        setGrid(newGrid)
        setInit(true)
    }, [resolution])

    // renders first grid after 
    useEffect(() => {
        if (!init) return
        ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        renderLifeBox();
    })

    // renders the lifebox whenever grid state is changed or isReady is set
    useEffect(() => {
        if (!generate) return
        setTimeout(() => {
            setGrid(nextGen(grid))
            setGenCount(genCount + 1)
            console.log(genCount + 1, genFreq)
        }, genFreq)
        ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        renderLifeBox();
    })

    //---------------functions--------------

    //function to control regeneration cycle
    function genStart() {
        if (!generate) {
            setGenerate(true)
        } else {
            setGenerate(false)
        }
    }

    //------env functions-------

    //frequency
    function addFrequency() {
        if (generate) return
        if (genFreq >= 1500) return
        setGenFreq(genFreq + 100);
    }

    function reduceFrequency() {
        if (generate) return
        if (genFreq <= 100) return
        setGenFreq(genFreq - 100);
    }

    //resolution
    function addResolution() {
        if (generate) return
        if (resolution >= 100) return
        setResolution(resolution + 10);
    }

    function reduceResolution() {
        if (generate) return
        if (resolution <= 10) return
        setResolution(resolution - 10);
    }


    //function to clear the grid and reinitialize count
    function clear() {
        if (generate) return
        const freshGrid = buildGrid()
        setGrid(freshGrid)
        setGenCount(0)
    }

    //function to generate random grid
    function randomGrid() {
        if (generate) return
        const randGrid = new Array(cols).fill(null)
            .map(() => new Array(rows).fill(null)
                .map(() => Math.floor(Math.random() * 2)));
        setGrid(randGrid)
        setGenCount(0)
    }

    // populates a cell on click
    function handleClick(e) {
        if (generate) return
        const newGrid = grid.map(arr => [...arr])
        const columnClicked = Math.floor(e.nativeEvent.offsetX / colWidth)
        const rowClicked = Math.floor(e.nativeEvent.offsetY / rowHeight)
        if (newGrid[columnClicked][rowClicked] === 1) {
            newGrid[columnClicked][rowClicked] = 0;
        } else {
            newGrid[columnClicked][rowClicked] = 1;
        }
        setGrid(newGrid)
        renderLifeBox(grid)
    }


    // makes grid
    function buildGrid() {
        setWidth(canvasRef.current.width)
        setHeight(canvasRef.current.height)
        const cols = Math.ceil(canvasRef.current.width / resolution);
        const rows = Math.ceil(canvasRef.current.height / resolution);

        return new Array(cols).fill(0)
            .map(() => new Array(rows).fill(0))
    }

    // //renders lifebox to canvas
    function renderLifeBox() {
        for (let col = 0; col < grid.length; col++) {
            for (let row = 0; row < grid[col].length; row++) {
                const cell = grid[col][row];
                ctx.current.beginPath();
                ctx.current.rect(col * resolution, row * resolution, resolution, resolution)
                ctx.current.fillStyle = cell ? 'lightgreen' : '#271D45';
                ctx.current.shadowColor = 'green'
                ctx.current.shadowBlur = 15;
                ctx.current.fill();
                ctx.current.stroke();
            }
        }
    }

    //make next interation based of rules of conways game of life
    function nextGen() {
        if (!grid) return
        const nextGen = grid.map(arr => [...arr]);

        for (let col = 0; col < grid.length; col++) {
            for (let row = 0; row < grid[col].length; row++) {
                const cell = grid[col][row];
                let numNeighbours = 0;
                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        if (i === 0 && j === 0) {
                            continue;
                        }
                        const x_cell = col + i;
                        const y_cell = row + j;

                        if (x_cell >= 0 && y_cell >= 0 && x_cell < cols && y_cell < rows) {
                            const currentNeighbour = grid[col + i][row + j]
                            numNeighbours += currentNeighbour
                        }
                    }
                }
                //rules
                if (cell === 1 && numNeighbours < 2) {
                    nextGen[col][row] = 0
                } else if (cell === 1 && numNeighbours > 3) {
                    nextGen[col][row] = 0
                } else if (cell === 0 && numNeighbours === 3) {
                    nextGen[col][row] = 1
                }
            }
        }
        return nextGen
    }

    return (
        <div className={'drawlife_container'}>
            <Draggable>
                <div className={'drawlife_hud'}>
                    <div className={'drawlife_genStart'}>
                        <button onClick={genStart} id={'gen_button'} className={'drawlife_button'}>{generate ? "Stop" : "Start"}</button>
                        <div className={'gen_counter'}>{genCount}</div>
                    </div>
                    <div className={'hud_labels'}>--frequency--</div>
                    <div className={"env_toggles"}>
                        <div onClick={reduceFrequency} className={!generate ? 'toggle_button' : 'disable_toggle_button'}>{'<'}</div>
                        <div className={"gen_counter"}>{genFreq / 100}</div>
                        <div onClick={addFrequency} className={!generate ? 'toggle_button' : 'disable_toggle_button'}>{'>'}</div>
                    </div>
                    <div className={'hud_labels'}>--resolution--</div>
                    <div className={"env_toggles"}>
                        <div onClick={reduceResolution} className={!generate ? 'toggle_button' : 'disable_toggle_button'}>{'<'}</div>
                        <div className={"gen_counter"}>{resolution / 10}</div>
                        <div onClick={addResolution} className={!generate ? 'toggle_button' : 'disable_toggle_button'}>{'>'}</div>
                    </div>
                    <div className={'drawlife_start_stop'}>
                        <button onClick={clear} className={!generate ? 'drawlife_button' : 'disable_drawlife_button'}>Clear</button>
                        <button onClick={randomGrid} className={!generate ? 'drawlife_button' : 'disable_drawlife_button'}>Rand</button>
                    </div>
                </div>
            </Draggable>
            <canvas
                ref={canvasRef}
                onMouseDown={handleClick}
                className={'drawlife_grid'}
            />
        </div>
    )
}


export default DrawLife