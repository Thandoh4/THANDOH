const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Serve index.html for root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Server configuration
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Listen on all network interfaces

const server = app.listen(PORT, HOST, () => {
    console.log('\n========================================');
    console.log('MEC Police Security Portal Started');
    console.log('========================================');
    console.log(`Server running at: http://localhost:${PORT}`);
    console.log(`Network access: http://<YOUR_IP_ADDRESS>:${PORT}`);
    console.log(`\nTo find your IP address (Windows):`);
    console.log('Open Command Prompt and type: ipconfig');
    console.log('Look for IPv4 Address (usually 192.168.x.x or 10.x.x.x)');
    console.log('========================================\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('Server shutting down...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
