import React, { useState, useEffect, useCallback } from 'react';

export default function Grid({ gridSize }) {

    const [grid, setGrid] = useState([]);

    // Initialize the grid
    useEffect(() => {
        const newGrid = [];
        for (let i = 0; i < gridSize; i++) {
            newGrid.push(Array(gridSize).fill(false));
        }
        setGrid(newGrid);
    }, [gridSize]);

    // Render the grid
    return (
        <div className="Grid">
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="Grid-row">
                    {row.map((cell, colIndex) => {
                        return (
                            <div
                                key={colIndex}
                                className={`Grid-cell`}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};