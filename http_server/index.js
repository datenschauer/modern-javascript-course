import { createServer } from 'http';
import data from './data.js';
import { getList } from './list.js';

const body = getList(data.addresses);

// wir erstellen einen Server, dem eine Funktion mit zwei Objekten für Request u. Response übergeben wird
const server = createServer((req, res) => {
    // schauen wir uns an, was alles in unserem Request Objekt enthalten ist:
    if (req.url === "/") {
        console.log("Request Methode (GET, POST, etc.):\n", req.method);
        console.log("Request url:\n", req.url);
        console.log("Request Header Informationen:\n", req.headers);
        console.log("verwendete HTTP-Version:\n", req.httpVersion);
        // console.log("Sogar ein Socket Objekt kann ausgelesen werden:\n", req.connection);
    }
    // bei eingehendem Request setzen wir den Header auf Code 200 und teilen die Art des Dokuments mit,
    // das wir bereitstellen
    res.writeHead(200, {'content-type': 'text/html'});

    // der .end Methode können wir unsere HTML Seite mitgeben
    res.end(body);
});

// zuletzt subskribieren wir ein Event, das den Server nach eingehenden Verbindungen auf Port 8888 horchen lässt
server.listen(8888, () => {
    console.log('Adressbuch erreichbar unter http://localhost:8888');
})
