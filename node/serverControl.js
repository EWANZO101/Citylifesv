const express = require('express');
const { exec } = require('child_process');

const app = express();
let serverStatus = 'Stopped'; // Default status

// Middleware to log IP addresses
app.use((req, res, next) => {
    console.log(`Request from: ${req.ip}`);
    next();
});

app.get('/startServer', (req, res) => {
    // Execute code to start your FiveM server here
    // Example:
    exec('start_command_for_fivem_server', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error starting the FiveM server: ${error.message}`);
            serverStatus = 'Error'; // Update status on error
            return res.status(500).send('Error starting the FiveM server');
        }
        console.log(`FiveM Server started: ${stdout}`);
        serverStatus = 'Running'; // Update status when started
        res.status(200).send('FiveM Server started');
    });
});

app.get('/stopServer', (req, res) => {
    // Execute code to stop your FiveM server here
    // Example:
    exec('stop_command_for_fivem_server', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error stopping the FiveM server: ${error.message}`);
            serverStatus = 'Error'; // Update status on error
            return res.status(500).send('Error stopping the FiveM server');
        }
        console.log(`FiveM Server stopped: ${stdout}`);
        serverStatus = 'Stopped'; // Update status when stopped
        res.status(200).send('FiveM Server stopped');
    });
});

app.get('/serverStatus', (req, res) => {
    // Implement logic to check the status of your FiveM server
    // Update serverStatus accordingly based on the status
    // Example:
    serverStatus = 'Running'; // Update status as needed
    res.status(200).json({ status: serverStatus });
});

const IP_ADDRESS = '81.79.251.249';
const PORT = 30158;

app.listen(PORT, IP_ADDRESS, () => {
    console.log(`Server running at http://${IP_ADDRESS}:${PORT}`);
});
