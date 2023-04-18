import { createServer } from 'http';
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