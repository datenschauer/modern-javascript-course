import { createServer } from 'http';

const server = createServer((req, res) => {
    res.writeHead(200, {
        'content-type': 'text/plain; charset=utf-8;',
    });
    res.write('Hallo Besucher! Willkommen!');
    res.end('');
});

server.listen(8080, "127.0.0.1", () => {
    console.log(`Server is listening on http://${server.address().address}:${server.address().port}.`);
});