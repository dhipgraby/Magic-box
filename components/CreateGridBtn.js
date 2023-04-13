import Form from 'react-bootstrap/Form';

export default function CreateGridBtn({
    handleGridSizeChange,
    gridSize
}) {
    return (
        <div className="m-auto">
            <div className="btnDiv">
                <p className="m-2">Grid Size: {gridSize}</p>
                <input
                    type="range" class="form-range" min="1" max="10"
                    value={gridSize}
                    onChange={handleGridSizeChange}                    
                />
                
            </div>

        </div>
    );
}