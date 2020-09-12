import React, { useEffect } from 'react';


const RandomLifeBox = () => {
    const canvasRef = React.useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')


        const resolution = 50;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const COLS = Math.round(canvas.width / resolution)
        const ROWS = Math.round(canvas.height / resolution)

        // makes randomly populated grid
        function buildGrid() {
            return new Array(COLS).fill(null)
                .map(() => new Array(COLS).fill(null)
                    .map(() => Math.floor(Math.random() * 2)));
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

        function nextGen(gird) {
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
                            const y_cell = col + j;

                            if (x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS) {
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

        //renders grid on every generation
        function update() {
            grid = nextGen(grid);
            makeLifeBox(grid);
            setTimeout(() => requestAnimationFrame(update), 1000);
        }


        //execute functions to produce and render game of life
        let grid = buildGrid();
        requestAnimationFrame(update);
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

export default RandomLifeBox