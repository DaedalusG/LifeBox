import React, { useEffect } from 'react';
import { render } from 'react-dom';

const RandomLifeBox = () => {

    useEffect(() => {

    })

    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')

    const resolution = 10;
    canvas.width = 800;
    canvas.height = 800;

    const COLS = canvas.width / resolution;
    const ROWS = canvas.height / resolution;

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
                ctx.fillStyle = cell ? 'black' : 'white';
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
        requestAnimationFrame(update);
    }


    //execute functions to produce and render game of life
    let grid = buildGrid();
    requestAnimationFrame(update);

    return (
        <>
            <div>This a canvas plz</div>
            <canvas ></canvas>
        </>
    )
}

export default RandomLifeBox