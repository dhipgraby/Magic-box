import React, { useState, useEffect, useRef } from 'react';

export default function Grid({ gridSize }) {

    const [grid, setGrid] = useState([]);
    const [mouseDown, setMouseDown] = useState(false);
    const mouseDownRef = useRef(mouseDown);
    const [longPress, setLongPress] = useState(false);
    const [selectedCells, setSelectedCells] = useState([]);
    const [singleClickTimer, setSingleClickTimer] = useState(null);
    const [isDoubleClick, setIsDoubleClick] = useState(false);

    // Initialize the grid
    useEffect(() => {
        const newGrid = [];
        for (let i = 0; i < gridSize; i++) {
            newGrid.push(Array(gridSize).fill(false));
        }
        setGrid(newGrid);
    }, [gridSize]);

    // Flip the color of the cell
    const flipColor = (row, col) => {
        const toggleGrid = !grid[row][col]
        setGrid((prevGrid) => {
            let newGrid = [...prevGrid];
            newGrid[row][col] = toggleGrid;
            return newGrid;
        });
    };

    useEffect(() => {
        mouseDownRef.current = mouseDown;
    }, [mouseDown]);

    // Handle cell mouse down
    const handleCellMouseDown = (event, row, col) => {
        if (event.button === 0) {
            event.preventDefault()
            setMouseDown(true);

            const timer = setTimeout(() => {
                if (mouseDownRef.current) {
                    setLongPress(true);
                    flipColor(row, col)
                }

            }, 1000); // Set to 1000ms (1 second) for long press

            return () => clearTimeout(timer); // Clear the timeout if the component is unmounted
        }
    };

    // Handle cell mouse up
    const handleCellMouseUp = () => {
        if (longPress) {
            selectedCells.forEach((cell) => {
                flipColor(cell.row, cell.col);
            });
        }
        setMouseDown(false);
        setLongPress(false);
        setSelectedCells([]);
    };

    // Handle cell mouse over
    const handleCellMouseEnter = (row, col) => {
        if (longPress) {
            setSelectedCells((prevSelectedCells) => {
                const cellExists = prevSelectedCells.some((cell) => cell.row === row && cell.col === col);

                if (!cellExists) {
                    return [...prevSelectedCells, { row, col }];
                }
                return prevSelectedCells;
            });
        }
    };

    const handleCellDoubleClick = (row, col) => {

        const newGrid = [...grid];
        const targetColor = newGrid[row][col];

        for (let i = 0; i < gridSize; i++) {
            newGrid[i][col] = targetColor;
        }

        newGrid[row][col] = !targetColor
        setGrid(newGrid);
    };

    const flipColorSingleClick = (row, col) => {
        if (!isDoubleClick) {
            flipColor(row, col);
        }
        setIsDoubleClick(false);
    };

    const handleCellClick = (row, col) => {

        if (singleClickTimer) {
            clearTimeout(singleClickTimer);
        }
        setSingleClickTimer(setTimeout(() => flipColorSingleClick(row, col), 200));
    };

    // Render the grid
    return (
        <div className="Grid">
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="Grid-row">
                    {row.map((cell, colIndex) => {
                        const isSelected = selectedCells.some((selectedCell) => selectedCell.row === rowIndex && selectedCell.col === colIndex);
                        return (
                            <div
                                key={colIndex}
                                className={`Grid-cell ${cell ? 'Grid-cell--active' : ''} ${isSelected ? 'Grid-cell--selected' : ''}`}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                                onDoubleClick={() => {
                                    setIsDoubleClick(true);
                                    handleCellDoubleClick(rowIndex, colIndex);
                                }}
                                onMouseDown={(event) => handleCellMouseDown(event, rowIndex, colIndex)}
                                onMouseUp={() => handleCellMouseUp(rowIndex, colIndex)}
                                onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};
