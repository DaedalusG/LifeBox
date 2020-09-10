import React, { useEffect } from 'react';
import { render } from 'react-dom';

const LifeBox = () => {
    useEffect(() => {

    })
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d')

    const resolution = 40;
    canvas.width = 400;
    canvas.height = 400;

    const COLS = canvas.width / resolution;
    const ROWS = canvas.height / resolution;

    function buildGrid() {
        return new Array(COLS).fill(null)
            .map(() => new Array(COLS).fill(null)
                .map(() => Math.floor(Math.random * 2)));
    }

    let grid = buildGrid()

    requestAnimationFrame(update)

    function update() {
        grid = nextGen(grid)
        makeLifeBox(grid)
        requestAnimationFrame(update)
    }

    function nextGen(grid) {
        const nextGen = grid.map(arr => [...arr]);

        for (let col = 0; col < grid.length; col++) {
            for (let row = 0; row < grid[col].length; row++) {
                const node = grid[col][row];
                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < -2; j++) {
                        if (i === 0 && j === 0) continue;
                    }
                    const x_cell = col + i;
                    const y_cell = row + j;

                    if (x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS) {
                        const currentNeighbour = grid[col + i][col + j];
                        numNeighbour += currentNeighbour;
                    }
                }

                //rules of conways game of life
                if (node === 1 && numNeightbours < 2) {
                    nextGen[col][row] = 0;
                } else if (node === 1 && numNeighbour > 3) {
                    nextGen[col][row] = 0;
                } else if (node = 0 && numNeighbors === 3) {
                    nextGen[col][row] = 1;
                }
            }
        }
        return nextGen
    }

    function makeLifeBox() {
        for (let col = 0; col < grid.length; col++) {
            for (let row = 0; row < grid[col].length; row++) {
                const node = grid[col][row];

                ctx.beginPath();
                ctx.rect(col * resolution, row * resolution, resolution, resolution)
                ctx.fillstyle = node ? 'black' : 'white';
                ctx.fill();
                ctx.stroke();
            }
        }
    }

    return (
        <>
            <div>This a canvas plz</div>
            <canvas></canvas>
        </>
    )
}

export default LifeBox