const http = require('http');
const app  = require('../../app');

const server = http.createServer(app);

let port = process.env.PORT || 3000;
app.set('port', port);

server.listen(port);

server.on('listening', () => {
    let address = server.address();
    console.log(`----------------------------------`);
    console.log(`Listening on port: ${address.port}`);
    console.log(`----------------------------------`);
});

server.on('error', err => {
    console.log(`Error occurred: ${err}`)
});