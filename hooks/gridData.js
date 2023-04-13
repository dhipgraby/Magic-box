import axios from 'axios';
// Get the target URL from environment variable
const targetURL = process.env.REACT_APP_TARGET_URL;

export const sendGridState = async (gridState) => {
    const data = JSON.stringify({
        grid: gridState,
    });

    try {
        await axios.post(targetURL, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error sending grid state:', error);
    }
};
