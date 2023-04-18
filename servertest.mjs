import { createServer } from 'http';

const server = createServer((req, res) => {
    res.writeHead(200, { // Senden eines gültigen HTTP Headers
        'content-type': 'text/html; charset=utf-8;', // content als html deklarieren
    });
    // eine neue URL generieren mit der WHATWG URL API: --> URL(route, base)
    const url = new URL(req.url, 'http://127.0.0.1:8080'); // der erste Parameter ist die Route des Requests!
    console.log(`requested URL: ${req.url}`);
    // eine html Seite definieren
    // language=HTML
    const body = `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Node.js Demo</title>
        </head>
        <body>
            <h1 style="color: red">Willkommen ${url.searchParams.get('name') || 'Besucher'}!</h1>
        </body>
    </html>`
    res.end(body); // dem Client das HTML direkt senden
    // So sieht der Inhalt von url.searchParams aus:
    console.log("SearchParams: ")
    for (let entry of url.searchParams.entries()) {
        console.log(entry);
    }
});

server.listen(8080, "127.0.0.1", () => {
    console.log(`Server is listening on http://${server.address().address}:${server.address().port}.`);
});