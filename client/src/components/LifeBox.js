import React, { useEffect } from 'react';

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
            .map(() => new Array(COLS).fill(0));
    }

    function makeLifeBox() {
        for (let col = 0; col < grid.length; col++) {
            for (let row = 0; row < grid[col].length; row++) {
                const node = grid[col][row];
                ctx.beginPath();
                ctx.react(col * resolution, row * resolution, resolution, resolution)
                ctx.stroke();
            }
        }
    }

    const grid = buildGrid();
    console.log(grid)
    return (
        <>
            <div>This a canvas plz</div>
            <canvas></canvas>
        </>
    )
}

export default LifeBox