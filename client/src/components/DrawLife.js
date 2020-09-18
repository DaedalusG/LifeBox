import React, { useEffect, useState, useRef, useMemo } from 'react'

const DrawLife = () => {

    const canvasRef = useRef(null);
    const ctx = useRef(null)


    const resolution = 55;
    const [grid, setGrid] = useState(null)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const cols = useMemo(() => Math.ceil(width / resolution), [width])
    const rows = useMemo(() => Math.ceil(height / resolution), [height])
    const colWidth = useMemo(() => Math.ceil(width / cols), [width])
    const rowHeight = useMemo(() => Math.ceil(height / rows), [height])
    const [isReady, setIsReady] = useState(false)

    function handleClick(e) {
        const newGrid = grid.map((row) => row.slice())
        // console.log(e, e.nativeEvent.offsetX, e.nativeEvent.offsetY)
        const columnClicked = Math.floor(e.nativeEvent.offsetX / colWidth)
        const rowClicked = Math.floor(e.nativeEvent.offsetY / rowHeight)
        console.log('col= ', columnClicked)
        console.log('row= ', rowClicked)

        newGrid[columnClicked][rowClicked] = 1

        setGrid(newGrid)
    }


    // makes randomly populated grid
    function buildGrid() {
        setWidth(canvasRef.current.width)
        setHeight(canvasRef.current.height)
        const cols = Math.ceil(canvasRef.current.width / resolution);
        const rows = Math.ceil(canvasRef.current.height / resolution);

        return new Array(cols).fill(null)
            .map(() => new Array(rows).fill(null))
    }

    // //renders lifebox to canvas
    function makeLifeBox() {
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
        console.log('Gen')

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
        // canvas.addEventListener('click', handleClick);
        ctx.current = canvas.getContext('2d')
        let newGrid = buildGrid()
        setGrid(newGrid)
        setIsReady(true)
    }, [])

    useEffect(() => {
        if (!isReady) return
        setTimeout(() => {
            setGrid(nextGen())
        }, 8000)
        ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        makeLifeBox();
    }, [grid, isReady])



    return (
        <div className={'drawlife_container'}>
            <div className={'drawlife_controller'}>
                <button className={'drawlife_button'}>Start</button>
                <button className={'drawlife_button'}>Stop</button>
            </div>
            <canvas
                ref={canvasRef}
                onClick={handleClick}
                className={'drawlife_grid'}
            />
        </div>
    )
}


export default DrawLife