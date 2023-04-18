import { createServer, STATUS_CODES } from 'http';
import data from './data.js';
import { getList } from './list.js';
import { deleteAddress } from './delete.js';

// wir legen nur noch eine body variable an, initialisieren sie aber nicht
let body;

const server = createServer((req, res) => {
    // wir parsen die aufgerufene URL und teilen sie in die Bestandteile auf
    const parts = req.url.split('/');

    if (parts[1] === 'delete') {
        data.addresses = deleteAddress(data.addresses, parts[2]);
        redirect(res, '/');
    } else {
        res.writeHead(200, {'content-type': 'text/html'});
        body = getList(data.addresses);
        res.end(body);
    }
});

server.listen(8888, () => {
    console.log('Adressbuch erreichbar unter http://localhost:8888');
})

function redirect(res, to) {
    res.writeHead(302, {
        location: to,
        'content-type': 'text/plain'
    });
    res.end(`302 Redirecting to ${to}`);
}

// Die wichtigsten Status Codes:
// -----------------------------
// 100-199: Informationen zur Anfrage
// 200-299: Rückmeldung über den Erfolg einer Anfrage
// 300-399: der Client muss weitere Aktionen unternehmen; Umleitung
// 400-499: Es ist ein clientseitiger Fehler aufgetreten
// 500-599: Es ist ein Serverseitiger Fehler aufgetreten
//
// über das Objekt STATUS_CODES aus dem http Modul von Node.js
// können Sie sich alle standardisierten Codes anzeigen lassen
console.log(STATUS_CODES)