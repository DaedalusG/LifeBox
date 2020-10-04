import React, { useEffect, useState, useRef, useMemo } from 'react'
import Draggable from 'react-draggable';

const DrawLife = (props) => {

    const canvasRef = useRef(null);
    const ctx = useRef(null)
    const genCount = useRef(0)

    //sets up a state containing information about the current grids array and values, 
    const [genFreq, setGenFreq] = useState(500)
    const width = useMemo(() => window.innerWidth, [])
    const height = useMemo(() => window.innerHeight, [])
    const cols = useMemo(() => Math.ceil(width / props.resolution), [width, props.resolution])
    const rows = useMemo(() => Math.ceil(height / props.resolution), [height, props.resolution])
    const colWidth = useMemo(() => Math.ceil(width / cols), [width, cols])
    const rowHeight = useMemo(() => Math.ceil(height / rows), [height, rows])
    const [generate, setGenerate] = useState(false)
    const { init, setInit } = props
    const { grid, setGrid } = props
    const { resolution, setResolution } = props
    const { loadGrid, setLoadGrid } = props


    //------------------------useEffects--------------------------

    // initializes the grid
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = width;
        canvas.height = height;
        ctx.current = canvas.getContext('2d')
        let newGrid = buildGrid()
        ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        setGrid(newGrid)
        setInit(true)
    }, [])


    //renders lifebox after first initialization
    useEffect(() => {
        if (!init) return
        ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        renderLifeBox();
    })

    // //handle viewport resize
    // const handleResize = () => {
    //     let newGrid = buildGrid()
    //     setGrid(newGrid)
    //     renderLifeBox()
    // }
    // window.addEventListener('resize', handleResize)

    // If grid is saved sets grid to have value of saved grid
    useEffect(() => {
        if (!init) return
        if (loadGrid.saved === false) {
            setLoadGrid(
                {
                    "name": undefined,
                    "grid": null,
                    "saved": false
                }
            )
            let newGrid = buildGrid()
            setGrid(newGrid)
            renderLifeBox()
            return
        }
        load()
    }, [loadGrid.saved])

    //generates new grid when grid props.resolution is set
    useEffect(() => {
        if (!init) return
        const canvas = canvasRef.current;
        canvas.width = width;
        canvas.height = height;
        ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        let newGrid = buildGrid()

        let colDiff = Math.round((newGrid.length - grid.length) / 2)
        let rowDiff = Math.round((newGrid[0].length - grid[0].length) / 2)

        if (newGrid.length > grid.length) {
            for (let col = 0; col < grid.length; col++) {
                for (let row = 0; row < grid[col].length; row++) {
                    newGrid[col + colDiff][row + rowDiff] = grid[col][row];
                }
            }
            setGrid(newGrid)
            renderLifeBox()
        } else {

            for (let col = 0; col < newGrid.length; col++) {
                for (let row = 0; row < newGrid[col].length; row++) {
                    newGrid[col][row] = grid[col - colDiff][row - rowDiff];
                }
            }

            setGrid(newGrid)
            renderLifeBox()
        }

    }, [resolution])


    // generates iterations of the lifebox
    useEffect(() => {
        if (!generate) return
        if (resolution === 10) {
            requestAnimationFrame(

            )
        }
        setTimeout(() => {
            genCount.current++
            setGrid(nextGen(grid))
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
        genCount.current = 0
    }

    //load grid to saved initial condition
    function load() {
        if (generate) return

        const canvas = canvasRef.current;
        canvas.width = width;
        canvas.height = height;
        ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        let resGrid = buildGrid()

        let colDiff = Math.round((resGrid.length - loadGrid.grid.length) / 2)
        let rowDiff = Math.round((resGrid[0].length - loadGrid.grid[0].length) / 2)

        if (resGrid.length > loadGrid.grid.length) {
            for (let col = 0; col < loadGrid.grid.length; col++) {
                for (let row = 0; row < loadGrid.grid[col].length; row++) {
                    resGrid[col + colDiff][row + rowDiff] = loadGrid.grid[col][row]
                }
            }
            setGrid(resGrid)
        } else {
            for (let col = 0; col < resGrid.length; col++) {
                for (let row = 0; row < resGrid[col].length; row++) {
                    resGrid[col][row] = loadGrid.grid[col - colDiff][row - rowDiff];
                }
            }

            setGrid(resGrid)
            renderLifeBox()
        }
        // setLoadGrid({ "name": loadGrid.name, "grid": loadGrid.grid, "saved": false })
        genCount.current = 0
    }

    //function to generate random grid
    function randomGrid() {
        if (generate) return
        const randGrid = new Array(cols).fill(null)
            .map(() => new Array(rows).fill(null)
                .map(() => Math.floor(Math.random() * 2)));
        setGrid(randGrid)
        genCount.current = 0
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
        const cols = Math.ceil(canvasRef.current.width / resolution);
        const rows = Math.ceil(canvasRef.current.height / resolution);

        return new Array(cols).fill(0)
            .map(() => new Array(rows).fill(0))
    }

    //renders lifebox to canvas
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

    //make next interation based on rules of conways game of life
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

    const runGeneration = () => {
        setTimeout(() => {
            genCount.current++
            setGrid(nextGen(grid))
        }, genFreq)
        ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        renderLifeBox();
    }

    return (
        <div className={'drawlife_container'}>
            <Draggable>
                <div className={'drawlife_hud'}>
                    <div className={'drawlife_genStart'}>
                        <button onClick={genStart} id={'gen_button'} className={'drawlife_button'}>{generate ? "Stop" : "Start"}</button>
                        <div className={'gen_counter'}>{genCount.current}</div>
                    </div>
                    <div className={'hud_labels'}>--frequency--</div>
                    <div className={"env_toggles"}>
                        <div onClick={reduceFrequency} className={!generate ? 'toggle_button' : 'disable_toggle_button'}>{'<'}</div>
                        <div className={"gen_counter"}>{genFreq / 100}</div>
                        <div onClick={addFrequency} className={!generate ? 'toggle_button' : 'disable_toggle_button'}>{'>'}</div>
                    </div>
                    <div className={'hud_labels'}>--resolution--</div>
                    <div className={"env_toggles"}>
                        <div onClick={reduceResolution} className={(generate) ? 'disable_toggle_button' : 'toggle_button'}>{'<'}</div>
                        <div className={"gen_counter"}>{resolution / 10}</div>
                        <div onClick={addResolution} className={(generate) ? 'disable_toggle_button' : 'toggle_button'}>{'>'}</div>
                    </div>
                    <div className={'drawlife_start_stop'}>
                        <button onClick={clear} className={!generate ? 'drawlife_button' : 'disable_drawlife_button'}>Clear</button>
                        <button onClick={loadGrid.saved ? load : randomGrid} className={!generate ? 'drawlife_button' : 'disable_drawlife_button'}>{props.loadGrid.saved ? 'Load' : 'Rand'}</button>
                    </div>
                </div>
            </Draggable>
            {/* <Draggable> */}
            <canvas
                ref={canvasRef}
                onClick={handleClick}
                className={'drawlife_grid'}
            />
            {/* </Draggable> */}
        </div>
    )
}


export default DrawLife