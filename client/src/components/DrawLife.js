import React, { useEffect } from 'react'

const DrawLife = () => {

    const canvasRef = React.useRef(null);
    let canvas;
    let ctx;

    // canvas.addEventListener('click', handleClick);
    function handleClick(e) {
        ctx.fillStyle = "lightgreen";

        ctx.fillRect(Math.floor(e.offsetX / 40) * 40,
            Math.floor(e.offsetY / 40) * 40,
            40, 40);
    }

    useEffect(() => {
        if (!canvas) {
            canvas = canvasRef.current;
            canvas.addEventListener('click', handleClick);
        }

        if (!ctx) {
            ctx = canvas.getContext('2d')
        }
        const resolution = 55;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // makes randomly populated grid
        function buildGrid() {
            const cols = Math.ceil(canvas.width / resolution);
            const rows = Math.ceil(canvas.height / resolution);

            return new Array(cols).fill(null)
                .map(() => new Array(rows).fill(null))
        }

        //renders lifebox to canvas
        function makeLifeBox(grid) {
            for (let col = 0; col < grid.length; col++) {
                for (let row = 0; row < grid[col].length; row++) {
                    const cell = grid[col][row];

                    ctx.beginPath();
                    ctx.rect(col * resolution, row * resolution, resolution, resolution)
                    ctx.fillStyle = cell ? 'lightgreen' : '#271D45';
                    ctx.shadowColor = 'green'
                    ctx.shadowBlur = 15;
                    ctx.fill();
                    ctx.stroke();
                }
            }
        }

        //make next interation based of rules of conways game of life

        function nextGen(grid) {
            const nextGen = grid.map(arr => [...arr]);
            const cols = Math.ceil(canvas.width / resolution);
            const rows = Math.ceil(canvas.height / resolution);

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

        //stops and restarts game on change of viewport
        function handleResize() {
            window.location.reload()
        }

        //execute functions to produce and render game of life
        let grid = buildGrid();
        let stopUpdate = requestAnimationFrame(update);

        //renders grid on every generation
        function update() {
            grid = nextGen(grid);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            makeLifeBox(grid);
            setTimeout(() => requestAnimationFrame(update), 1000);
        }



        //restarts on change of viewport
        window.addEventListener("resize", handleResize)

    }, [])

    return (
        <>
            <canvas
                ref={canvasRef}
                className={'login_background'}
            />
        </>
    )
}


export default DrawLife