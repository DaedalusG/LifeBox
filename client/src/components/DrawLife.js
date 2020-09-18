import React, { useEffect, useState, useRef, useMemo } from 'react'
import Draggable from 'react-draggable';
import InputRange from 'react-input-range';

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
    const cols = useMemo(() => Math.ceil(width / resolution), [width])
    const rows = useMemo(() => Math.ceil(height / resolution), [height])
    const colWidth = useMemo(() => Math.ceil(width / cols), [width])
    const rowHeight = useMemo(() => Math.ceil(height / rows), [height])
    const [init, setInit] = useState(false)
    const [generate, setGenerate] = useState(false)

    //function to control regeneration cycle
    function genStart() {
        if (!generate) {
            setGenerate(true)
        } else {
            setGenerate(false)
        }
    }

    //function to clear the grid and reinitialize count
    function clear() {
        setGenerate(false)
        const freshGrid = buildGrid()
        setGrid(freshGrid)
        setGenCount(0)
    }

    //function to generate random grid
    function randomGrid() {
        setGenerate(false)
        const randGrid = new Array(cols).fill(null)
            .map(() => new Array(rows).fill(null)
                .map(() => Math.floor(Math.random() * 2)));
        setGrid(randGrid)
        setGenCount(0)
    }

    // adds a true value to a cell in the grid
    function handleClick(e) {
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
        }, genFreq)
        ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        renderLifeBox();
    })



    return (
        <div className={'drawlife_container'}>
            <Draggable>
                <div className={'drawlife_hud'}>
                    <div className={'drawlife_genStart'}>
                        <button onClick={genStart} id={'gen_button'} className={'drawlife_button'}>{generate ? "Stop" : "Start"}</button>
                        <div className={'gen_counter'}>{genCount}</div>
                    </div>
                    <div>
                        <input
                            type={"range"}
                            defaultValue={genFreq}
                            onChange={() => setGenFreq(genFreq)}
                            min={"100"}
                            max={"1000"}
                            step={"100"}
                        />
                    </div>
                    <div>
                        <input
                            type={"range"}
                            defaultValue={resolution}
                            onChange={() => setResolution(resolution)}
                            min={"20"}
                            max={"80"}
                            step={"10"}
                        />
                    </div>
                    <div className={'drawlife_start_stop'}>
                        <button onClick={clear} className={'drawlife_button'}>Clear</button>
                        <button onClick={randomGrid} className={'drawlife_button'}>Rand</button>
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