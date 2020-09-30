import React, { useEffect, useState, useRef, useMemo } from 'react'
import Draggable from 'react-draggable';

const DrawLife = (props) => {

    const canvasRef = useRef(null);
    const ctx = useRef(null)
    const genCount = useRef(0)

    //sets up a state containing information about the current grids array and values, 
    const [genFreq, setGenFreq] = useState(500)
    const width = useMemo(() => window.innerWidth, [window.innerWidth])
    const height = useMemo(() => window.innerHeight, [window.innerHeight])
    const cols = useMemo(() => Math.ceil(width / props.resolution), [width, props.resolution])
    const rows = useMemo(() => Math.ceil(height / props.resolution), [height, props.resolution])
    const colWidth = useMemo(() => Math.ceil(width / cols), [width, cols])
    const rowHeight = useMemo(() => Math.ceil(height / rows), [height, rows])
    const [init, setInit] = useState(false)
    const [generate, setGenerate] = useState(false)
    const { setGrid } = props
    const { setResolution } = props


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

    // renders grid after init
    useEffect(() => {
        if (!init) return
        ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        renderLifeBox();
    })

    // // If grid is saved sets grid to have value of saved grid
    // useEffect(() => {
    //     reset()
    // }, [props.loadGrid])

    //generates new grid when grid props.resolution is set
    useEffect(() => {
        if (!init) return
        const canvas = canvasRef.current;
        canvas.width = width;
        canvas.height = height;
        ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        let newGrid = buildGrid()

        let colDiff = Math.round((newGrid.length - props.grid.length) / 2)
        let rowDiff = Math.round((newGrid[0].length - props.grid[0].length) / 2)

        if (newGrid.length > props.grid.length) {
            for (let col = 0; col < props.grid.length; col++) {
                for (let row = 0; row < props.grid[col].length; row++) {
                    newGrid[col + colDiff][row + rowDiff] = props.grid[col][row];
                }
            }
            setGrid(newGrid)
            renderLifeBox()
        } else {
            setGrid(props.grid)
            renderLifeBox()
        }

    }, [props.resolution])


    // generates iterations of the lifebox
    useEffect(() => {
        if (!generate) return
        setTimeout(() => {
            genCount.current++
            setGrid(nextGen(props.grid))
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

    //props.resolution
    function addResolution() {
        if (generate) return
        if (props.resolution >= 100) return
        setResolution(props.resolution + 10);
    }

    function reduceResolution() {
        if (generate) return
        if (props.resolution <= 10) return
        setResolution(props.resolution - 10);
    }


    //function to clear the grid and reinitialize count
    function clear() {
        if (generate) return
        const freshGrid = buildGrid()
        setGrid(freshGrid)
        genCount.current = 0
    }

    //reset grid to saved initial condition
    function reset() {
        if (generate) return

        const canvas = canvasRef.current;
        canvas.width = width;
        canvas.height = height;
        ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        let resGrid = buildGrid()

        let colDiff = Math.round((resGrid.length - props.loadGrid.grid.length) / 2)
        let rowDiff = Math.round((resGrid[0].length - props.loadGrid.grid[0].length) / 2)

        if (resGrid.length > props.loadGrid.grid.length) {
            for (let col = 0; col < props.loadGrid.grid.length; col++) {
                for (let row = 0; row < props.loadGrid.grid[col].length; row++) {
                    resGrid[col + colDiff][row + rowDiff] = props.loadGrid.grid[col][row]
                }
            }
            setGrid(resGrid)
        } else {
            setGrid(props.loadGrid.grid)
        }
        // props.setLoadGrid({ "name": props.loadGrid.name, "grid": props.loadGrid.grid, "saved": false })
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
        const newGrid = props.grid.map(arr => [...arr])
        const columnClicked = Math.floor(e.nativeEvent.offsetX / colWidth)
        const rowClicked = Math.floor(e.nativeEvent.offsetY / rowHeight)
        if (newGrid[columnClicked][rowClicked] === 1) {
            newGrid[columnClicked][rowClicked] = 0;
        } else {
            newGrid[columnClicked][rowClicked] = 1;
        }
        setGrid(newGrid)
        renderLifeBox(props.grid)
    }


    // makes grid
    function buildGrid() {
        const cols = Math.ceil(canvasRef.current.width / props.resolution);
        const rows = Math.ceil(canvasRef.current.height / props.resolution);

        return new Array(cols).fill(0)
            .map(() => new Array(rows).fill(0))
    }

    //renders lifebox to canvas
    function renderLifeBox() {
        for (let col = 0; col < props.grid.length; col++) {
            for (let row = 0; row < props.grid[col].length; row++) {
                const cell = props.grid[col][row];
                ctx.current.beginPath();
                ctx.current.rect(col * props.resolution, row * props.resolution, props.resolution, props.resolution)
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
        if (!props.grid) return
        const nextGen = props.grid.map(arr => [...arr]);
        for (let col = 0; col < props.grid.length; col++) {
            for (let row = 0; row < props.grid[col].length; row++) {
                const cell = props.grid[col][row];
                let numNeighbours = 0;

                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        if (i === 0 && j === 0) {
                            continue;
                        }
                        const x_cell = col + i;
                        const y_cell = row + j;

                        if (x_cell >= 0 && y_cell >= 0 && x_cell < cols && y_cell < rows) {
                            const currentNeighbour = props.grid[col + i][row + j]
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
                        <div className={"gen_counter"}>{props.resolution / 10}</div>
                        <div onClick={addResolution} className={(generate) ? 'disable_toggle_button' : 'toggle_button'}>{'>'}</div>
                    </div>
                    <div className={'drawlife_start_stop'}>
                        <button onClick={clear} className={!generate ? 'drawlife_button' : 'disable_drawlife_button'}>Clear</button>
                        <button onClick={props.loadGrid.saved ? reset : randomGrid} className={!generate ? 'drawlife_button' : 'disable_drawlife_button'}>{props.loadGrid.saved ? 'Reset' : 'Rand'}</button>
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