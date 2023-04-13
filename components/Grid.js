import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { sendGridState } from 'hooks/gridData';
import { debounce } from 'lodash';

export default function Grid({ gridSize }) {

    const [grid, setGrid] = useState([]);
    const [mouseDown, setMouseDown] = useState(false);
    const mouseDownRef = useRef(mouseDown);
    const [longPress, setLongPress] = useState(false);
    const [selectedCells, setSelectedCells] = useState([]);
    const [singleClickTimer, setSingleClickTimer] = useState(null);
    const [isDoubleClick, setIsDoubleClick] = useState(false);
    const [arrayColor, setArrayColor] = useState(false)

    const debouncedSendGridState = debounce(sendGridState, 2000); // 2000ms debounce time

    // Call this function every time the grid state changes
    const handleGridStateChange = (newGridState) => {
        debouncedSendGridState(newGridState);
    };

    // Call the debounced function when grid state changes
    useEffect(() => {
        handleGridStateChange(grid);
    }, [grid]);


    // Initialize the grid
    useEffect(() => {
        loadGrid()
    }, [gridSize]);

    const loadGrid = () => {
        const newGrid = [];
        for (let i = 0; i < gridSize; i++) {
            newGrid.push(Array(gridSize).fill(false));
        }
        setGrid(newGrid);
    }

    // Flip the color of the cell
    const flipColor = (row, col, targetColor = null) => {
        const toggleGrid = (targetColor != null) ? targetColor : !grid[row][col];
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

        const targetColor = grid[row][col]

        if (event.button === 0) {
            event.preventDefault()
            setMouseDown(true);

            const timer = setTimeout(() => {
                if (mouseDownRef.current) {
                    setLongPress(true);
                    setArrayColor(targetColor);
                }

            }, 1000); // Set to 1000ms (1 second) for long press

            return () => clearTimeout(timer); // Clear the timeout if the component is unmounted
        }
    };

    // Handle cell mouse up
    const handleCellMouseUp = (row, col) => {

        if (longPress) {
            selectedCells.forEach((cell) => {
                flipColor(cell.row, cell.col, arrayColor);
            });
        }
        mouseLeaveScreen()
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

    const mouseLeaveScreen = () => {
        setMouseDown(false);
        setLongPress(false);
        setSelectedCells([]);
    }

    // Render the grid
    return (
        <>
            <div
                className="Grid"
                onMouseLeave={() => mouseLeaveScreen()}
            >
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
            <div className='text-center'>
                <button className='btn btnPurple my-4' onClick={loadGrid}> Reset <FontAwesomeIcon icon={faSync} /> </button>
            </div>
        </>


    );
};
