import React, { useEffect, useState, useRef, useMemo } from 'react'

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
        const button = document.getElementById('gen_button')
        if (!generate) {
            button.innerHTML = 'Stop';
            setGenerate(true)
        } else {
            button.innerHTML = 'Start';
            setGenerate(false)
        }
    }

    // adds a true value to a cell in the grid
    function handleClick(e) {
        const newGrid = grid.map(arr => [...arr])
        // console.log(e, e.nativeEvent.offsetX, e.nativeEvent.offsetY)
        const columnClicked = Math.floor(e.nativeEvent.offsetX / colWidth)
        const rowClicked = Math.floor(e.nativeEvent.offsetY / rowHeight)
        // console.log('col= ', columnClicked)
        // console.log('row= ', rowClicked)
        if (newGrid[columnClicked][rowClicked] === 1) {
            newGrid[columnClicked][rowClicked] = 0;
        } else {
            newGrid[columnClicked][rowClicked] = 1;
        }

        console.log('handleClick---> setGrid')
        setGrid(newGrid)
        renderLifeBox(grid)
        console.log(grid)
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
        // console.log('----> renderLifeBox')
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
        // console.log('-----> nextGen')
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
        // console.log('useEffect-----> generate initial grid')
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
            console.log('useEffect-update-------> setGrid')
            setGrid(nextGen(grid))
            setGenCount(genCount + 1)
        }, genFreq)
        ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        console.log(grid)
        renderLifeBox();
    })



    return (
        <div className={'drawlife_container'}>
            <div className={'drawlife_hud'}>
                <div className={'drawlife_genStart'}>
                    <button onClick={genStart} id={'gen_button'} className={'drawlife_button'}>Start</button>
                    <div className={'gen_counter'}>{genCount}</div>
                </div>
                <div>
                    <input
                        type={"range"}
                        defaultValue={genFreq}
                        onChange={() => setGenFreq(genFreq)}
                        min={"100"}
                        max={"1000"}
                    />
                </div>
                <div>
                    <input
                        type={"range"}
                        defaultValue={resolution}
                        onChange={() => setResolution(resolution)}
                        min={"0"}
                        max={"11"}
                    />
                </div>
                {/* <div className={'drawlife_start_stop'}>
                    <button onClick={start} className={'drawlife_button'}>Start</button>
                    <button onClick={stop} className={'drawlife_button'}>Stop</button>
                </div> */}
            </div>
            <canvas
                ref={canvasRef}
                onMouseDown={handleClick}
                className={'drawlife_grid'}
            />
        </div>
    )
}


export default DrawLife