# Magic Box App

This is a React-based app that creates an interactive grid with adjustable size. Users can manipulate the grid by clicking, double-clicking, or long-pressing individual cells.

## Approach

The app is built using React and makes use of functional components and hooks for state management. The main component, `Grid`, is responsible for managing the grid's state and user interactions. It also renders the grid by mapping over the grid array and creating rows and cells.

## Basic Design Choices

1. The state of the grid is stored as a 2D array, with each cell represented by a boolean value. The `gridSize` prop determines the dimensions of the grid.
2. The grid is created by populating the 2D array with `false` values initially, which represent the inactive state of a cell.
3. Event handlers are used to handle various user interactions like single-click, double-click, and long-press on grid cells. These event handlers update the grid state accordingly.
4. The updated state is used to render the grid with appropriate CSS classes to visually represent the active/inactive state of each cell.

## Documentation

### Components

- `Grid`: The main component that handles the grid's state and user interactions.
- `GridRow` (refactored): A component that represents a single row in the grid.
- `GridCell` (refactored): A component that represents an individual cell in the grid.

### Custom Functions

- `loadGrid`: Initializes the grid with the specified `gridSize`.
- `flipColor`: Flips the color of a cell based on the row and column passed as arguments.
- `handleCellMouseDown`: Handles the mouse down event on a cell.
- `handleCellMouseUp`: Handles the mouse up event on a cell.
- `handleCellMouseEnter`: Handles the mouse enter event on a cell.
- `handleCellDoubleClick`: Handles the double-click event on a cell.
- `flipColorSingleClick`: Flips the color of a cell for a single click event.
- `handleCellClick`: Handles the single click event on a cell.
- `mouseLeaveScreen`: Resets the necessary states when the mouse leaves the screen.

### State Variables

- `grid`: The 2D array representing the grid's state.
- `mouseDown`: A boolean indicating whether the mouse is pressed down.
- `longPress`: A boolean indicating whether a long press event is detected.
- `selectedCells`: An array containing the currently selected cells during a long press event.
- `singleClickTimer`: A timer used to differentiate between single and double-click events.
- `isDoubleClick`: A boolean indicating whether a double-click event is detected.
- `arrayColor`: A boolean representing the target color during a long press event.

### Event Handlers

The following event handlers are used to manipulate the grid based on user interactions:

- Single click: Flips the color of the clicked cell.
- Double-click: Flips the color of the clicked cell and sets the same color for all other cells in the same column.
- Long press: Allows the user to drag the mouse over multiple cells, flipping their colors to a target color.

## Usage

1. Clone the repository
2. Install dependencies using `npm install` or `yarn install`
3. Create .env file and add REACT_APP_TARGET_URL to send latest state of the application
3. Run the development server using `npm run dev` or `yarn dev`
4. Open the app in your browser at `http://localhost:3000`
