import { createServer } from 'http';

const server = createServer((req, res) => {
    res.writeHead(200, { // Senden eines gültigen HTTP Headers
        'content-type': 'text/html; charset=utf-8;', // content als html deklarieren
    });
    // eine html Seite definieren
    const body = `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Node.js Demo</title>
        </head>
        <body>
            <h1 style="color: red">Willkommen!</h1>
        </body>
    </html>`

    res.end(body); // dem Client das HTML direkt senden
});

server.listen(8080, "127.0.0.1", () => {
    console.log(`Server is listening on http://${server.address().address}:${server.address().port}.`);
});